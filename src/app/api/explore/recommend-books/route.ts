"use server"
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "../../../../../prisma/prisma";
import {createClient} from "@/lib/supabase/server";



const openai = new OpenAI({
    apiKey: process.env.NEXT_OPEN_AI_KEY,
});


export async function POST (req: NextRequest) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id

    const books = await prisma.book.findMany({
        where: {
            userId,
            OR: [
                { status: "READ" },
                { status: "READING" },
            ],
        },
        orderBy: {
            rating: "desc",
        },
        take: 5,

        include: {
            BookCategory: {
                include: {
                    Category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    const favoriteBooks = JSON.stringify(
        books.map(book => ({
            title: book.title,
            author: book.author,
            categories: book.BookCategory.map(bookCategory => ({
                categoryId: bookCategory.Category.id,
                categoryName: bookCategory.Category.name,
            }))
        })),
        null,
        2
    );

    const prompt = `
    You are an intelligent book recommendation assistant that helps users discover new books based on their reading preferences.

    You will receive:
    1. A list of books the user has liked and saved.
    2. A list of valid book categories that you can assign.

    Your task:
    - Recommend **10 books** that best match the user’s taste.
    - Each recommendation must include details about the book, why it’s a good match, and information about the author.
    - Only use the categories provided in the input list.
    - Respond **strictly in JSON format**, without any extra text, markdown, or explanations.

    Input:
    User’s liked books: ${favoriteBooks}

    Your response must be a valid JSON object in this format:

    {
      "recommendations": [
        {
          "id": "uuid",
          "title": "string",
          "year": number,
          "author": "string",
          "about": "A short 1–2 sentence summary of what the book is about.",
          "pages": number,
          "ratingGoodReads": number,
          "categories": [
            { "id": "uuid", "name": "string" }
          ],
          "whyRead": "Explain in a few sentences why this book is worth reading.",
          "aboutAuthor": "Briefly describe the author and their writing style or background.",
          "whyRecommended": "Explain why this book fits the user’s previous reading preferences."
        }
      ]
    }`;


    const completion = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            { role: "system", content: "You are a book recommendation assistant. Return JSON only." },
            { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0].message?.content || "[]";
    let recommendations = JSON.parse(responseText);

    return NextResponse.json({
        success: true,
        message: "Recommendations fetched successfully",
        recommendations: recommendations,
    });
}