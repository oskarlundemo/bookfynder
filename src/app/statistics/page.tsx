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

    return (
        <main className="flex flex-col h-full ">

            <BentoGrid
                readBookData={readBookData}
            />

        </main>
    )
}
