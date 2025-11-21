"use server"

import { prisma } from "../../../../prisma/prisma";
import { createClient } from "@/lib/supabase/server";
import { bookSchema } from "@/lib/validation/bookSchema";
import { ReadingStatus } from "@prisma/client";
import * as z from "zod";



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

        let errorMessage = "";

        for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

            errorMessage += `${fieldName}: ${issue.message}\n`;
        }

        return {
            success: false,
            message: "Validation failed: \n " + errorMessage,
            errors: parsed.error.issues,
        };
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
                        startPage: 0,
                        endPage: bookData.currentPage,
                        pagesRead: bookData.currentPage,
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