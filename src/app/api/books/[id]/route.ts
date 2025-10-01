

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    const bookId = params.id;

    try {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) return NextResponse.json({ success: false, message: "Book not found" }, { status: 404 });

        return NextResponse.json({ success: true, book });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch book" });
    }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const bookId = params.id;
    const body = await req.json();

    try {
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: {
                title: body.title,
                author: body.author,
                pages: body.pages,
            },
        });

        return NextResponse.json({ success: true, book: updatedBook });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update book" });
    }
}