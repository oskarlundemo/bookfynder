"use server"

import {prisma} from "@/lib/prisma";
import {createClient} from "@/lib/supabase/server";
import {Category} from "@prisma/client";

export async function updateBook(bookData: {
    bookId: string;
    title: string;
    author: string;
    pages: number;
    read: boolean;
    rating: number;
    priority: number;
    categories: Category[];
}) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id

    // Starta en transaction
    await prisma.$transaction(async (tx) => {

        // Updatera fälten
        const updatedBook = await prisma.book.update({
            where: {
                id: bookData.bookId,
                userId: data.user?.id
            },
            data: {
                title: bookData.title,
                author: bookData.author,
                pages: bookData.pages,
            },
            include: {
                readBooks: true,
                readingList: true
            }
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

        // Uppdatera om read eller inte
        if (updatedBook.readBooks && updatedBook.readBooks.length > 0) {
            await tx.readBook.deleteMany({
                where: { bookId: bookData.bookId }
            });
        } else if (updatedBook.readingList && updatedBook.readingList.length > 0) {
            await tx.readingList.deleteMany({
                where: { bookId: bookData.bookId }
            });
        }

        // Om de ändras till läst, uppdatera
        if (bookData.read) {
            await tx.readBook.create({
                data: {
                    bookId: bookData.bookId,
                    rating: bookData.rating,
                    userId: userId,
                }
            })
        } else {
            // Vill läsa, uppdatera här istället
            await tx.readingList.create({
                data: {
                    bookId: bookData.bookId,
                    priority:bookData.priority,
                    userId: userId,
                }
            })
        }
    })

    return {
        success: true,
        message: `Book ${bookData.title} updated successfully.`,
    }
}

export async function deleteBook(bookId: string) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    let deletedBook;

    try {
         deletedBook = await prisma.book.delete({
            where: {
                id: bookId,
                userId: data.user?.id
            }
        })
    } catch (error) {
        console.log(error)
    }

    return {
        message: `${deletedBook.title} was deleted successfully.`,
        success: true,
    }
}


export async function getBook(bookId: string) {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id;

    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
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
    });


    const hasRead = await prisma.readBook.findFirst({
        where: {
            bookId: book.id,
        }
    })

    const readingList = await prisma.readingList.findFirst({
        where: {
            bookId: book.id,
        }
    })

    const categories = await prisma.category.findMany()

    const bookCategories = book.BookCategory.map(bc => bc.category);

    const formatedRespons = {
        author: book.author,
        title: book.title,
        priority: readingList?.priority,
        pages: book.pages,
        bookCategories: bookCategories,
        categories: categories,
        hasRead: hasRead,
        score: hasRead?.rating || readingList?.priority
    }

    return {
        book: formatedRespons,
        message: `Book ${bookId} retrieved successfully.`,
        sucess: true,
    }

}