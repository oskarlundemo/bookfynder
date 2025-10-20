import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import { startOfWeek, endOfWeek, format } from 'date-fns'
import {prisma} from "@/lib/prisma";
import {ChartPieDonutText} from "../../components/statistics/BookCategoryPieChart";
import {PagesBarChart} from "../../components/statistics/PagesBarChart";
import {ChartBarLabelCustom} from "../../components/statistics/BookReadChart";
import {ChartAreaInteractive} from "../../components/statistics/AreaChartPages";


export default async function StatisticsPag () {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const readBookData = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READ"
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    })

    const categoryCounts = readBookData
        .flatMap(book => book.BookCategory.map(bc => bc.category.name))
        .reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);


    const allCategories = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value,
        color: 'var(--chart-1)'
    }));


    const now = new Date()
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }) // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 })     // Sunday

    const pagesReadThisWeek = await prisma.bookProgressEntry.findMany({
        where: {
            userId: data?.user?.id,
            createdAt: {
                gte: weekStart,
                lte: weekEnd,
            },
        },
    })


    const booksRead = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READ"
        }
    })

    console.log(booksRead)

    return (
        <main className="flex w-full flex-col p-5 gap-5 h-full ">

            <PagesBarChart
                data={PagesReadDayAWeek(pagesReadThisWeek)}
            />

            <ChartPieDonutText
                title={'Books'}
                numberOfBooks={allCategories.length || 0}
                bookData={allCategories || []}
                explanation={"Your reading genres"}
            />

            <ChartBarLabelCustom
                data={BooksReadPerMonth(booksRead)}
            />

        </main>
    )
}



export function PagesReadDayAWeek (data: any[]) {

    const result = data.reduce((acc, entry) => {
        const date = new Date(entry.createdAt)
        const dayName = format(date, 'EEEE')
        acc[dayName] = (acc[dayName] || 0) + entry.pagesRead
        return acc
    }, {} as Record<string, number>)


    const allDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]

    const fullWeek = allDays.map(day => ({
        day,
        pages: result[day] || 0,
    }))

    return fullWeek
}

export function BooksReadPerMonth(data: any[]) {

    // Group by month name and count how many books were read
    const result = data.reduce((acc, entry) => {
        const date = new Date(entry.createdAt)
        const monthName = format(date, 'MMMM') // e.g. "October"

        if (entry.status === 'READ') {
            acc[monthName] = (acc[monthName] || 0) + 1
        }

        return acc
    }, {} as Record<string, number>)

    const allMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const fullMonths = allMonths.map(month => ({
        month,
        books: result[month] || 0,
    }))

    return fullMonths
}