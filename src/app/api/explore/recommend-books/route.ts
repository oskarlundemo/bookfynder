import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_OPEN_AI_KEY,
});

export async function POST (req: NextRequest) {

    console.log('Skickar en request till Opemn AI');

    const { books } = await req.json();

    // Prepare the book JSON as a string for the prompt
    const booksString = JSON.stringify(books);

    const prompt = `
    You are a book recommendation assistant.
    From the list of books below, recommend 10 books that match the user's taste. Respond in JSON format with id, title, year, author, about and genres.
    Respond strictly in JSON. Do not include explanations, markdown, or backticks.

    User has liked and saved these books list: ${booksString}
    
    The json should look like this 
    
    Also include the books rating on GoodReads,
    
    recommendations : [
     {
      "id": "b1eafa49-fca4-4e25-abd6-822b8d42cf60",
      "title": "The Book Thief",
      "year": 2005,
      "author": "Markus Zusak",
      "about": "A story about a young girl living in Nazi Germany who finds solace by stealing books and sharing them with others.",
      "genres": ["Historical Fiction", "Drama"],
      "ratingGoodReads": 3.45
      "pages": 300
    },
    ]
  `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
    });


    const responseText = completion.choices[0].message?.content || "[]";

    console.log(responseText);

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