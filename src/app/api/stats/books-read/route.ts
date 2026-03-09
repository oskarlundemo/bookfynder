"use server"

import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server";
import {prisma} from "../../../../../prisma/prisma";
import {format, getYear, startOfYear, endOfYear} from "date-fns";

export async function GET (req: NextRequest) {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    const userId = data.user?.id

    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    const parsedYear = yearParam ? parseInt(yearParam) : getYear(new Date());

    const start = startOfYear(new Date(parsedYear, 0, 1));
    const end = endOfYear(new Date(parsedYear, 0, 1));

    if (!userId) {
        return NextResponse.json({
            message: 'Insufficient parameters, please try again.',
            success: false,
        });
    }

    if (error) {
        return NextResponse.json({
            message: 'An error occurred when authorising',
            success: false,
        })
    }

    const booksRead = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READ",
            createdAt: {
                gte: start,
                lte: end
            }
        }
    })

    const readBooksIds = booksRead.map(book => book.id)

    const finalReadingSessions = await prisma.bookProgressEntry.findMany({
        where: {
            userId,
            bookId: {
                in: readBooksIds
            },
            createdAt: {
                gte: start,
                lte: end
            }
        },
        include: {
            Book: true
        },
        orderBy: {
            createdAt: "desc"
        },
        distinct: ["bookId"]
    });

    return NextResponse.json({
        message: 'End point pages read this year',
        success: true,
        description: "Books read ",
        subTitle: `January - December ${parsedYear}`,
        dataPoints: BooksReadPerMonth(finalReadingSessions),
    });
}

function BooksReadPerMonth(data: any[]) {

    const result = data.reduce((acc, entry) => {
        const monthName = format(new Date(entry.createdAt), "MMMM")

        acc[monthName] = (acc[monthName] || 0) + 1

        return acc
    }, {} as Record<string, number>)

    const allMonths = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ]

    return allMonths.map(month => ({
        month,
        books: result[month] || 0
    }))
}