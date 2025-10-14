"use server"

import {prisma} from "@/lib/prisma";
import {createClient} from "@/lib/supabase/server";
import {Category} from "@prisma/client";

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

    const userId = data.user?.id

    // Starta en transaction
    await prisma.$transaction(async (tx) => {

        // Updatera fälten
        const updatedBook = await prisma.book.update({
            where: {
                id: bookData.bookId,
                userId: userId,
            },
            data: {
                title: bookData.title,
                author: bookData.author,
                pages: bookData.pages,
                status: bookData.bookStatus,
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


export async function getBook (bookId: string) {

    // auth check
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id;

    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
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
    }

    return {
        book: formatedRespons,
        message: `Book ${bookId} retrieved successfully.`,
        sucess: true,
    }
}