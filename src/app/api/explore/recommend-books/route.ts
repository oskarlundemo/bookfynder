"use server"
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import {createClient} from "@/lib/supabase/server";

const openai = new OpenAI({
    apiKey: process.env.NEXT_OPEN_AI_KEY,
});


export async function POST (req: NextRequest) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    const userId = data.user?.id

    console.log('Skickar en request till Open AI');

    // Prepare the book JSON as a string for the prompt

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
    });

    const favoriteBooks = JSON.stringify(
        books.map(book => ({
            title: book.title,
            author: book.author,
        })),
        null,
        2
    );

    const categories = JSON.stringify(
        await prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        }),
        null,
        2
    );

    const prompt = `
    You are a book recommendation assistant.
    From the list of books below, recommend 10 books that match the user's taste. Respond in JSON format with id, title, year, author, about and genres.
    Respond strictly in JSON. Do not include explanations, markdown, or backticks.

    User has liked and saved these books list: ${favoriteBooks}
    
    The categories your are allowed to map to are these ${categories}.
    
    The json should look like this 
    
    Also include the books rating on GoodReads,
    
    recommendations : [
     {
      "id": "b1eafa49-fca4-4e25-abd6-822b8d42cf60",
      "title": "The Book Thief",
      "year": 2005,
      "author": "Markus Zusak",
      "about": "A story about a young girl living in Nazi Germany who finds solace by stealing books and sharing them with others.",
 
      "ratingGoodReads": 3.45
      "pages": 300
      "categories": [
        id: 7b7ba473-bc9d-47c6-b97d-65d1ab184ef5, name: Sci-Fi
      ]
    },
    ]
  `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });

    const responseText = completion.choices[0].message?.content || "[]";

    let recommendations = [];

    try {
        let cleaned = responseText.trim()
            .replace(/^```json\s*/, '')
            .replace(/```$/, '');
        recommendations = JSON.parse(cleaned);
    } catch (e) {
        console.error("Failed to parse GPT response:", responseText, e);
    }

    return NextResponse.json({
        success: true,
        message:
            "Recommendations fetched successfully",
        data:recommendations
    });
}