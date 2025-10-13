import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {prisma} from "@/lib/prisma";
import {BookTabs} from "@/components/books/BookTabs";

export const revalidate = 10; // re-fetch every 10 seconds

export default async function BooksPage() {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/auth/login')
    }

    const readBooks = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READ"
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    })

    const queuedBooks = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "QUEUED"
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    })

    const readingBooks = await prisma.book.findMany({
        where: {
            userId: data?.user?.id,
            status: "READING"
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    })

    return (
        <main
            style={{ backgroundColor: 'var(--background)' }}
            className="flex flex-col mt-5"
        >
            <BookTabs
                queuedBooks={queuedBooks}
                readingBooks={readingBooks}
                readBooks={readBooks}
            />

        </main>
    );
}