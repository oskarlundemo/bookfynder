"use server"

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import {Category} from "@prisma/client";

export async function addBook(bookData: {
    title: string;
    author: string;
    pages: number;
    bookStatus: string;
    currentPage: number;
    rating: number;
    categories: Category[];

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


            // Create the book
            const createdBook = await tx.book.create({
                data: {
                    userId: userId,
                    title: bookData.title,
                    author: bookData.author,
                    pages: bookData.pages,
                    status: bookData.bookStatus,
                    pagesRead: bookData.currentPage,
                },
            });

            // Append the categories
            await tx.bookCategory.createMany({
                data: bookData.selectedCategories.map(c => ({
                    bookId: createdBook.id,
                    categoryId: c.id,
                })),
            });

            // Set the status

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