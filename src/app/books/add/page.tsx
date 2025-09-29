"use client"

import "@/styles/Book.css"
import {SearchInput} from "@/components/books/SearchInput";
import {useEffect, useState} from "react";
import {BookForm} from "@/components/books/BookForm";


export default function AddBookPage () {

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);
    const [read, setRead] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);

    const [categories, setCategories] = useState<string[]>([
        "Romance",
        "Thriller",
        "Classics",
        "Crime",
        "Fantasy"
    ]);

    useEffect(() => {
        console.log(rating);
    }, [rating])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Sending book')
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">

            <div className="flex book-add-wrapper flex-col w-full justify-start">

                <h1 className="text-xl font-bold mb-4">Add a new book</h1>

                <SearchInput
                    setTitle={setTitle}
                    setAuthorName={setAuthor}
                />

                <BookForm
                    title={title}
                    author={author}
                    pages={pages}
                    setPage={setPages}
                    read={read}
                    setRead={setRead}
                    handleSubmit={handleSubmit}
                    categories={categories}
                    setRating={setRating}
                    rating={rating}
                    priority={priority}
                    setPriority={setPriority}
                />

            </div>

        </main>
    );
}


