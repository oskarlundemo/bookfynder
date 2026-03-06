"use server"

import {prisma} from "../../../../prisma/prisma";
import {createClient} from "@/lib/supabase/server";
import { redirect } from 'next/navigation'
import { bookSchema } from "@/lib/validation/bookSchema";

export async function updateBook (rawBookData: unknown) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    console.log(rawBookData)

    if (error) {
        console.error('Update error:', error.message)
        redirect('/error')
    }

    const parsed = bookSchema.safeParse(rawBookData);

    if (!parsed.success) {
        let errorMessage = "";
        for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            errorMessage += `${fieldName}: ${issue.message}\n`;
        }

        return {
            success: false,
            message: "Validation failed \n " + errorMessage,
            errors: parsed.error.issues,
        };
    }


    const bookData = parsed.data;
    console.log(bookData)
    const userId = data.user?.id

    await prisma.$transaction(async (tx) => {

        switch (bookData.bookStatus) {

            case "READING":
                const previousReadingSession = await tx.bookProgressEntry.findFirst({
                    where: {
                        bookId: bookData.bookId,
                        userId: userId,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });

                if (previousReadingSession && previousReadingSession.endPage > bookData.currentPage) {
                    await tx.bookProgressEntry.deleteMany({
                        where: {
                            bookId: bookData.bookId,
                            userId: userId,
                            endPage: { gt: bookData.currentPage },
                        },
                    });
                }

                const updatedLatestSession = await tx.bookProgressEntry.findFirst({
                    where: {
                        bookId: bookData.bookId,
                        userId: userId,
                    },
                });

                await tx.bookProgressEntry.create({
                    data: {
                        startPage: updatedLatestSession?.endPage || 0,
                        endPage: bookData.currentPage,
                        pagesRead: bookData.currentPage - (updatedLatestSession?.endPage ?? 0),
                        userId: userId,
                        bookId: bookData.bookId,
                    },
                });
                break;

            case "QUEUED":
                await tx.book.update({
                    where: {
                        id: bookData.bookId,
                    },
                    data: {
                        title: bookData.title,
                        author: bookData.author,
                        userId: userId,
                        pages: bookData.pages,
                        pagesRead: bookData.pages,
                        rating: bookData.rating ?? 0,
                        status: "QUEUED",
                    },
                });
                break;

            case "READ":
                await tx.book.update({
                    where: {
                        id: bookData.bookId,
                    },
                    data: {
                        title: bookData.title,
                        author: bookData.author,
                        userId: userId,
                        pages: bookData.pages,
                        pagesRead: bookData.pages,
                        rating: bookData.rating ?? 0,
                        status: "READ",
                    },
                });
                break;

            default:
                console.warn(`Unknown bookStatus: ${bookData.bookStatus}`);
                break;
        }

        // Update book and categories (your existing code)
        const updatedBook = await tx.book.update({
            where: { id: bookData.bookId, userId: userId },
            data: {
                title: bookData.title,
                author: bookData.author,
                pages: bookData.pages,
                status: bookData.currentPage >= bookData.pages ? "READ" : bookData.bookStatus,
                rating: bookData.rating,
                pagesRead: bookData.currentPage,
            },
        });

        await tx.bookCategory.deleteMany({ where: { bookId: bookData.bookId } });
        await tx.bookCategory.createMany({
            data: bookData.categories.map(c => ({
                bookId: bookData.bookId,
                categoryId: c.id,
            })),
        });
    });

    return {
        success: true,
        message: `Book "${bookData.title}" updated successfully.`,
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
                    Category: true
                }
            }
        }
    });

    const categories = await prisma.category.findMany()
    const bookCategories = book.BookCategory.map(bc => bc.Category);

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