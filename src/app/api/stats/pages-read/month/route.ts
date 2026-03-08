


"use server"

import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server";
import {addDays, format} from "date-fns";
import {prisma} from "../../../../../../prisma/prisma";

import { startOfMonth, endOfMonth } from "date-fns";


export async function GET (req: NextRequest) {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    const userId = data.user?.id

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


    // Måste hämta reading när den blev klar, inte när den vart created

    const currentDate = new Date();
    const firstDayOfMonth = addDays(startOfMonth(currentDate), 1);
    const lastDayOfMonth = endOfMonth(currentDate);

    const readingData = await prisma.bookProgressEntry.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
            }
        }
    })

    const formattedReading = formatPagesByMonth(readingData);

    return NextResponse.json({
        message: 'End point pages read this week.',
        success: true,
        dataPoints: formattedReading,
        dateStart: firstDayOfMonth.toISOString().split("T")[0],
        dateEnd: lastDayOfMonth.toISOString().split("T")[0],
        description: "Pages read this month",
    });
}


function formatPagesByMonth(readingData: any[]) {

    const dailyTotals = readingData.reduce<Record<string, number>>((acc, entry) => {
        const date = new Date(entry.createdAt);
        const dayLabel = format(date, "d/M");
        acc[dayLabel] = (acc[dayLabel] || 0) + entry.pagesRead;
        return acc;
    }, {});

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatted = [];
    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
        const label = `${d}/${now.getMonth() + 1}`;
        formatted.push({
            label,
            pages: dailyTotals[label] || 0,
        });
    }

    return formatted;
}