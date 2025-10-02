"use client"

import "@/styles/Book.css"
import {SearchAPI} from "@/components/books/SearchAPI";
import {useState} from "react";
import BookForm from "@/components/books/BookForm";
import { addBook } from "@/app/books/add/actions";
import toast from "react-hot-toast";

export default function AddBookPage () {

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);
    const [read, setRead] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);

    const [categories] = useState<string[]>([
        "Fiction",          // Includes Romance, Thriller, Fantasy, Mystery, Classics, Crime, Historical Fiction
        "Science Fiction & Fantasy", // SF & Fantasy separate focus
        "Mystery / Thriller",        // For crime, suspense, detective stories
        "Romance",          // Popular standalone genre
        "Biography / Memoir", // Real-life stories
        "Self-Help / Personal Development",
        "History / Politics", // Broad nonfiction category
        "Children / YA",     // All books for kids/teens
        "Poetry / Drama",    // Literary works
        "Religion / Spiritual", // Spiritual texts
        "Other"             // Catch-all for anything outside these
    ]);


    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();

        const response = await addBook({
            title,
            author,
            pages,

            read,
            rating,
            priority,
        });

        setTitle("");
        setAuthor("");
        setPages(0);

        response.success ? toast.success(response.message) : toast.error(response.message);
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">

            <div className="flex book-add-wrapper flex-col w-full justify-start">

                <h1 className="text-xl font-bold mb-4">Add a new book</h1>

                <SearchAPI
                    setTitle={setTitle}
                    setAuthorName={setAuthor}
                />

                <BookForm
                    title={title}
                    setTitle={setTitle}

                    author={author}
                    setAuthor={setAuthor}

                    pages={pages}
                    setPage={setPages}

                    read={read}
                    setRead={setRead}

                    setRating={setRating}
                    rating={rating}

                    priority={priority}
                    setPriority={setPriority}

                    handleSubmit={handleSubmit}
                    categories={categories}
                />

            </div>

        </main>
    );
}


