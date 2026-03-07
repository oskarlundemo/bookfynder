"use server"

import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/lib/supabase/server";
import {endOfYear, format, addDays, startOfYear} from "date-fns";
import {prisma} from "../../../../../../prisma/prisma";

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
    const firstDayOfYear = addDays(startOfYear(currentDate),1);
    const lastDayOfYear = endOfYear(currentDate);

    const readingData = await prisma.bookProgressEntry.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: firstDayOfYear,
                lte: lastDayOfYear,
            }
        }
    })

    const formattedReading = formatPagesByYear(readingData);

    return NextResponse.json({
        message: 'End point pages read this week.',
        success: true,
        dataPoints: formattedReading,
        dateStart: firstDayOfYear.toISOString().split("T")[0],
        dateEnd: lastDayOfYear.toISOString().split("T")[0],
        description: "Pages read this year",
    });
}


function formatPagesByYear(readingData: any[]) {

    const monthlyTotals = readingData.reduce<Record<number, number>>((acc, entry) => {
        const date = new Date(entry.createdAt);
        const month = date.getMonth(); // 0 = Jan, 11 = Dec

        acc[month] = (acc[month] || 0) + entry.pagesRead;
        return acc;
    }, {});

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const formatted = monthNames.map((name, index) => ({
        label: name,
        pages: monthlyTotals[index] || 0,
    }));

    return formatted;
}