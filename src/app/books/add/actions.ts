"use server"

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { bookSchema } from "@/lib/validation/bookSchema";
import { ReadingStatus } from "@prisma/client";


export async function addBook (rawBookData: unknown) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        return {
            success: false,
            message: "Unauthorized or error retrieving user",
        };
    }


    const parsed = bookSchema.safeParse(rawBookData);

    if (!parsed.success) {
        console.log(parsed.error.format())
        return { success: false, message: "Validation failed, please control and reformat your input", errors: parsed.error.format() };
    }

    const bookData = parsed.data;

    try {
        const userId = data.user.id;

        const book = await prisma.$transaction(async (tx) => {

            // Create the book
            const createdBook = await tx.book.create({
                data: {
                    userId: userId,
                    title: bookData.title,
                    author: bookData.author,
                    pages: bookData.pages,
                    status: bookData.bookStatus as ReadingStatus,
                    pagesRead: bookData.currentPage,
                    rating: bookData.rating || 1
                },
            });

            if (bookData.bookStatus === "READING") {
                await tx.bookProgressEntry.create({
                    data: {
                        bookId: createdBook.id,
                        userId: userId,
                        startPage: 1,
                        endPage: bookData.currentPage,
                        pagesRead: bookData.currentPage - 1,
                    }
                })
            }

            await tx.bookCategory.createMany({
                data: bookData.categories.map(c => ({
                    bookId: createdBook.id,
                    categoryId: c.id,
                })),
            });

            return createdBook;

        });

        return {
            success: true,
            message: `Book ${book.title} added successfully.`,
            book,
        };

    } catch (err) {
        console.error("Transaction failed:", err);
        return {
            success: false,
            message: "An error occurred while adding the book",
        };
    }
}


export async function fetchCategories () {

    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return {
        success: true,
        message: 'Categories have been added successfully.',
        categories: categories,
    }
}