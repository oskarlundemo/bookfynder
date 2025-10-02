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

                <button className={'custom-button'} onClick={logout}>Log out</button>

            </header>

        </main>
    )
}
