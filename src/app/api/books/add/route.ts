import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET () {

    try {
        const categories = await prisma.category.findMany({
            where: {
                name: 'Thriller'
            }
        });
        
        return NextResponse.json({ success: true, categories: categories, message: 'Fetched categories' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to update book" });
    }
}