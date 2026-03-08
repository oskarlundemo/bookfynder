import {NextResponse, NextRequest} from "next/server";
import {createClient} from "@/lib/supabase/server";
import {prisma} from "../../../../../prisma/prisma";


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

    return NextResponse.json({
        message: 'Book categories',
        success: true,
        description: "All your read books grouped in genres",
        subTitle: `January - December`,
        dataPoints: allCategories,
        numberOfBooks: allCategories.length
    });
}