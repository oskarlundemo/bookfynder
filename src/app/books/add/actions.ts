"use server"

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function addBook(bookData: {
    title: string;
    author: string;
    pages: number;
    read: boolean;
    rating: number;
    priority: number;
}) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        return {
            success: false,
            message: "Unauthorized or error retrieving user",
        };
    }

    try {
        const userId = data.user.id;

        const book = await prisma.$transaction(async (tx) => {

            const createdBook = await tx.book.create({
                data: {
                    title: bookData.title,
                    author: bookData.author,
                    pages: bookData.pages,
                    userId,
                },
            });

            if (bookData.read) {
                await tx.readBook.create({
                    data: {
                        bookId: createdBook.id,
                        rating: bookData.rating,
                        userId,
                    },
                });
            } else {
                await tx.readingList.create({
                    data: {
                        bookId: createdBook.id,
                        priority: bookData.priority,
                        userId,
                    },
                });
            }

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
