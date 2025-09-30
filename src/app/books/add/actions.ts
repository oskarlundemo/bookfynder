"use server"
import {prisma} from "@/lib/prisma"

export async function addBook(data: {
    title: string;
    author: string;
    pages: number;
    userId: string | null;
}) {

    console.log(data);

    if (!data) {
        return {
            success: false,
            message: "An error occurred while adding the book",
        }
    }


    await prisma.book.create({ data });

    return {
        success: true,
        message: `Book ${data.title} added successfully.`,
    }
}