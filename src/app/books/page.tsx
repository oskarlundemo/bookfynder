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

    console.log(books)


    return (
        <main className="flex flex-col h-full ">

            <h1>Welcome to your bookshelf</h1>


            {books.length > 0 ? (
                <BooksSection data={books} />
            ) : (
                <h2>No books yet</h2>
            )}


            <button onClick={logout}>Log out</button>
        </main>
    );
}