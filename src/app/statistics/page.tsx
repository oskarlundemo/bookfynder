import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {BentoGrid} from "@/components/statistics/BentoGrid";
import {prisma} from "@/lib/prisma";

export default async function StatisticsPag () {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const pieChartData = await prisma.readBook.findMany({
        where: {
            userId: data?.user?.id
        },
        include: {
            book: {
                include: {
                    BookCategory: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    })


    return (
        <main style={{backgroundColor: 'var(--secondary)'}} className="flex flex-col h-full ">

            <header className="w-full flex p-5 flex-row justify-between">

                <h1 className={'text-3xl font-bold'}>Stats</h1>

            </header>

            <BentoGrid
                pieChartData={pieChartData}
            />

        </main>
    )
}
