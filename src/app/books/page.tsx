import { prisma } from "@/lib/prisma";

export default async function BooksPage() {

    const books = await prisma.book.findMany();
    console.log("📚 Books fetched:", books);

    return (
        <main>
            <h1>Welcome to your bookshelf</h1>

            <ul>
                {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>{book.title}</li>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </ul>
        </main>
    );
}