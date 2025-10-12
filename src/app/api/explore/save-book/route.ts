"use server"

import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
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
            },
        });

        await trx.readingList.create({
            data: {
                userId,
                bookId: newBook.id,
            },
        });

        await trx.bookCategory.create({
            data: {
                bookId: newBook.id,
                categoryId: "ef5c02a8-4365-434e-85c2-eed8e745d112"
            },
        });

    });

    return NextResponse.json({
        message: 'Book created successfully.',
        success: true,
    });
}