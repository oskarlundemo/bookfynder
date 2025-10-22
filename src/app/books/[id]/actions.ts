"use server"

import {prisma} from "@/lib/prisma";
import {createClient} from "@/lib/supabase/server";
import {Category} from "@prisma/client";
import { redirect } from 'next/navigation'


export async function updateBook(bookData: {
    bookId: string;
    title: string;

    author: string;
    pages: number;

    bookStatus: string;
    currentPage: number;

    rating: number;
    categories: Category[];
}) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error('Update error:', error.message)
        redirect('/error')
    }

    const userId = data.user?.id

    // Starta en transaction
    await prisma.$transaction(async (tx) => {


        if (bookData.bookStatus === 'READING') {

            const previousReadingSession = await tx.bookProgressEntry.findFirst({
                where: {
                    bookId: bookData.bookId,
                    userId: userId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            if (previousReadingSession && previousReadingSession.endPage > bookData.currentPage)
            {
                await tx.bookProgressEntry.deleteMany({
                    where: {
                        bookId: bookData.bookId,
                        userId: userId,
                        endPage: {gt: bookData.currentPage}
                    },
                });
            }

            let updatedLatestSession = await tx.bookProgressEntry.findFirst({
                where: {
                    bookId: bookData.bookId,
                    userId: userId,
                }
            });

            const newEntry = await tx.bookProgressEntry.create({
                data: {
                    startPage:  updatedLatestSession?.endPage || 0,
                    endPage: bookData.currentPage,
                    pagesRead: bookData.currentPage - (updatedLatestSession?.endPage ?? 0),
                    userId: userId,
                    bookId: bookData.bookId,
                },
            });
        }

        const updatedBook = await prisma.book.update({
            where: {
                id: bookData.bookId,
                userId: userId,
            },
            data: {
                title: bookData.title,
                author: bookData.author,
                pages: bookData.pages,
                status: bookData.currentPage >= bookData.pages ? "READ" :  bookData.bookStatus,
                rating: bookData.rating,
                pagesRead: bookData.currentPage,
            },
        })


        // Radera de gamla
        await tx.bookCategory.deleteMany({
            where: {
                bookId: bookData.bookId,
            }
        })

        // Lägg till de nya kategorierna
        await tx.bookCategory.createMany({
            // @ts-ignore
            data: bookData.selectedCategories.map(c => ({
                bookId: bookData.bookId,
                categoryId: c.id,
            })),
        });
    })

    return {
        success: true,
        message: `Book ${bookData.title} updated successfully.`,
    }
}

export async function deleteBook (bookId: string) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error('Delete error:', error.message)
        redirect('/error')
    }

    try {
        let deletedBook = await prisma.book.delete({
            where: {
                id: bookId,
                userId: data.user?.id
            }
        })
    } catch (err) {
        console.error('Delete error:', err)
    }


    return {
        message: `Book deleted successfully.`,
        success: true,
    }
}


export async function getBook (bookId: string) {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id;

    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
            userId: userId,
        },
        include: {
            BookCategory: {
                include: {
                    category: true
                }
            }
        }
    });

    const categories = await prisma.category.findMany()
    const bookCategories = book.BookCategory.map(bc => bc.category);

    const formatedRespons = {
        author: book.author,
        title: book.title,
        rating: book.rating,
        pagesRead: book.pagesRead,
        pages: book.pages,
        bookCategories: bookCategories,
        categories: categories,
        status: book.status,
    }

    return {
        book: formatedRespons,
        message: `Book ${bookId} retrieved successfully.`,
        sucess: true,
    }
}