"use server"

import {logout} from "@/app/auth/login/actions";
import {BooksSection} from "@/components/books/BooksSection";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function ProfilePage() {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (

        <main style={{backgroundColor: 'var(--secondary)'}} className="flex flex-col justify-start items-center h-full ">

            <header style={{maxWidth: 'var(--max-form)'}} className="w-full flex p-5 gap-5 flex-col justify-start">

                <button className={'custom-button py-5!'} onClick={logout}>Log out</button>
                <button className={'custom-button py-5!'} onClick={logout}>Delete account</button>

            </header>

        </main>
    )
}