"use server"

import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../prisma/prisma";
import {createClient} from "@/lib/supabase/server";

export async function POST (req: NextRequest) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id

    const {book} = await req.json();

    console.log(book);

    if (!userId || !book) {
        return NextResponse.json({
            message: 'Insufficient parameters, please try again.',
            success: false,
        });
    }

    if (error) {
        return NextResponse.json({
            message: 'An error occurred when authorising',
            success: false,
        })
    }

    await prisma.$transaction(async (trx) => {
        const newBook = await trx.book.create({
            data: {
                userId,
                title: book.title,
                author: book.author,
                pages: book.pages || 0,
                status: "QUEUED",
            },
        });

        const categories = book.categories.map((category) => ({
            categoryId: category.id,
            bookId: newBook.id
        }))

        await trx.bookCategory.createMany({
            data: categories,
            skipDuplicates: true, 
        });
    });

    return NextResponse.json({
        message: 'Book created successfully.',
        success: true,
    });
}