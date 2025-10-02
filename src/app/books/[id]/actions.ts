"use server"

import {prisma} from "@/lib/prisma";
import {createClient} from "@/lib/supabase/server";

export async function updateBook(bookData: {
    title: string;
    bookId: string;
    author: string;
    pages: number;
}) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    await prisma.book.update({
        where: {
            id: bookData.bookId,
            userId: data.user?.id
        },
        data: {
            title: bookData.title,
            author: bookData.author,
            pages: bookData.pages,
        }
    })

    return {
        success: true,
        message: `Book ${bookData.title} updated successfully.`,
    }
}

export async function deleteBook(bookId: string) {
    console.log('I delete book');

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
            categories: true,
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

    let formatedRespons = {
        ...book,
        rating: hasRead?.rating,
        priority: readingList?.priority,
    }


    return {
        book: formatedRespons,
        message: `Book ${bookId} retrieved successfully.`,
        sucess: true,
    }

}