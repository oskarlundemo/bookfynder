import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_OPEN_AI_KEY,
});

export async function POST (req: NextRequest) {

    console.log('Skickar en post');

    const { books } = await req.json();

    // Prepare the book JSON as a string for the prompt
    const booksString = JSON.stringify(books);

    const prompt = `
    You are a book recommendation assistant.
    From the list of books below, recommend 10 books that match the user's taste. Respond in JSON format with id, title, year, author, about and genres.
    Respond strictly in JSON. Do not include explanations, markdown, or backticks.

    User has liked and saved these books list: ${booksString}
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

    return NextResponse.json({ recommendations });
}