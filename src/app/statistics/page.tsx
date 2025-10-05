import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {logout} from "@/app/auth/login/actions";
import {BooksSection} from "@/components/books/BooksSection";


export default async function StatisticsPag () {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (
        <main style={{backgroundColor: 'var(--secondary)'}} className="flex flex-col h-full ">

            <header className="w-full flex p-5 flex-row justify-between">

                <h1 className={'text-3xl font-bold'}>Stats</h1>

                <h2 className="text-center text-4xl text-[var(--text-subtle)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    In development 👨‍💻
                </h2>

            </header>

        </main>
    )
}
