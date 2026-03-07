import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import { format } from 'date-fns'
import {prisma} from "../../../prisma/prisma";
import {ChartPieDonutText} from "../../components/statistics/BookCategoryPieChart";
import {PagesBarChart} from "../../components/statistics/PagesBarChart";
import {BooksReadPerMonthWidget} from "../../components/statistics/BooksReadPerMonthWidget";


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
                    Category: true
                }
            }
        }
    })

    const categoryCounts = readBookData
        .flatMap(book => book.BookCategory.map(bc => bc.Category.name))
        .reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    const allCategories = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value,
        color: 'var(--chart-1)'
    }));

    const booksRead = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READ"
        }
    })

    return (
        <main style={{maxWidth: 'var(--max-width)'}} className="flex mx-auto w-full flex-col p-5 gap-5 h-full ">

            <PagesBarChart/>

            <section className={'flex flex-row! gap-10'}>
                <BooksReadPerMonthWidget
                    data={BooksReadPerMonth(booksRead)}
                />

                <ChartPieDonutText
                    title={'Books'}
                    numberOfBooks={allCategories.length || 0}
                    bookData={allCategories || []}
                    explanation={"Your reading genres"}
                />
            </section>
        </main>
    )
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