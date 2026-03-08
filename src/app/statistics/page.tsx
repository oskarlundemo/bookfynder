import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import { format } from 'date-fns'
import {prisma} from "../../../prisma/prisma";
import {BookCategoryWidget} from "../../components/statistics/BookCategoryWidget";
import {PagesBarChart} from "../../components/statistics/PagesBarChart";
import {BooksReadPerMonthWidget} from "../../components/statistics/BooksReadPerMonthWidget";


export default async function StatisticsPag () {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (
        <main style={{maxWidth: 'var(--max-width)'}} className="flex mx-auto w-full flex-col p-5 gap-5 h-full ">

            <PagesBarChart/>

            <section className={'flex flex-row! gap-10'}>
                <BooksReadPerMonthWidget/>

                <BookCategoryWidget/>
            </section>
        </main>
    )
}