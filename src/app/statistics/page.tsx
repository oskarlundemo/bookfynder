import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {BentoGrid} from "@/components/statistics/BentoGrid";
import {prisma} from "@/lib/prisma";

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

    /**
     *
     * name: Name value: 256
     *
     */

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

    console.log(allCategories);

    return (
        <main className="flex w-full flex-col h-full ">

            <BentoGrid
                readBookData={allCategories}
            />

        </main>
    )
}
