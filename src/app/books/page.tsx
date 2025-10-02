import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/login/actions'
import {prisma} from "@/lib/prisma";
import {BooksSection} from "@/components/books/BooksSection";


export default async function BooksPage() {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const books = await prisma.book.findMany({
        where: {
            userId: data?.user?.id
        }
    })

    return (
        <main style={{backgroundColor: 'var(--secondary)'}} className="flex flex-col h-full ">

            <header className="w-full flex p-5 flex-row justify-between">

                <h1 className={'text-3xl font-bold'}>Welcome to your bookshelf</h1>

                <button className={'custom-button'} onClick={logout}>Log out</button>

            </header>

            {books.length > 0 ? (
                <BooksSection data={books} />
            ) : (
                <h2>No books yet</h2>
            )}
        </main>
    );
}