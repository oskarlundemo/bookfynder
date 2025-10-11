import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SwipeCards from "@/components/explore/SwipeCards";
import {prisma} from "@/lib/prisma";


export default async function ExplorePage() {

    // auth check
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const usersBooks = await prisma.book.findMany({
        where: {
            userId: data?.user?.id
        },
        include: {
            readBooks: true,
            BookCategory: {
                include: {
                    category: true,
                }
            },
        },
        take: 5,
    })

    return (
        <main
            style={{ backgroundColor: 'var(--secondary)' }}
            className="flex h-full flex-col overflow-y-auto"
        >

            <header className="w-full flex p-5 flex-row justify-between">

                <h1 className={'text-3xl font-bold'}>Explore</h1>

            </header>

            {usersBooks.length >= 5 ? (
                <SwipeCards
                    books={usersBooks}
                />
            ) : (
                <div className={'flex flex-grow self-center justify-center flex-col'}>

                    <h2 style={{color: 'var(--text-subtle)'}} className={'text-2xl font-bold text-center text-shadow whitespace-wrap'}>
                        You need to add at least 5 books to swipe new recommendations!
                    </h2>

                </div>
            )}

        </main>
    );
}