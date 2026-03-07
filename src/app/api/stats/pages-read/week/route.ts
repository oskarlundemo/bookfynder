

"use server"

import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../../prisma/prisma";
import {startOfWeek, format, endOfWeek } from "date-fns";
import {createClient} from "@/lib/supabase/server";


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

    const currentDate = new Date();
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });

    const readingData = await prisma.bookProgressEntry.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: start,
                lte: end,
            }
        }
    })

    const formattedReading = formatPagesByDay(readingData);

    return NextResponse.json({
        message: 'End point pages read this week.',
        success: true,
        dataPoints: formattedReading,
        dateStart: start.toISOString().split("T")[0],
        dateEnd: end.toISOString().split("T")[0],
        description: "Pages read this week",
    });
}


function formatPagesByDay(readingData: any) {

    // @ts-ignore
    const dailyTotals = readingData.reduce<Record<string, number>>((acc, entry) => {
        const dayName = format(new Date(entry.createdAt), "EEEE"); // full day name
        acc[dayName] = (acc[dayName] || 0) + entry.pagesRead;
        return acc;
    }, {});

    const allDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    const formatted = allDays.map(day => ({
        label: day.substring(0, 3),
        pages: dailyTotals[day] || 0
    }));

    return formatted;
}