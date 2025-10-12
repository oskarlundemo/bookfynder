import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SwipeCards from "@/components/explore/SwipeCards";
import {prisma} from "@/lib/prisma";


export default async function ExplorePage () {

    // auth check
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    if (error) {
        redirect('/error')
    }

    const usersBooks = await prisma.book.findMany({
        where: {
            userId: data?.user?.id
        },
        include: {
            BookCategory: {
                include: {
                    category: true,
                }
            },
        },
        take: 5,
    })

    console.log(usersBooks)

    return (
        <main
            style={{ }}
            className="flex flex-col"
        >

            <SwipeCards
                books={usersBooks}
            />

        </main>
    );
}