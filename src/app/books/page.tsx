import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {prisma} from "@/lib/prisma";
import {BooksSection} from "@/components/books/BooksSection";
import {FilterSection} from "@/components/books/FilterSection";

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
        },
        include: {
            readBooks: true,
            readingList: true,
            BookCategory: {
                include: {
                    category: true,
                }
            },
        },
    })

    const categories = await prisma.category.findMany()

    console.log(books)

    return (
        <main style={{backgroundColor: 'var(--secondary)'}} className="flex overflow-y-scroll h-full flex-col ">

            <header className="w-full flex p-5 flex-row justify-between">

                <h1 className={'text-3xl font-bold'}>Your bookshelf</h1>

            </header>

            <BooksSection categories={categories} data={books}/>

        </main>
    );
}