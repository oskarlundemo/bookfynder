"use client"

import {Book, Category} from "@prisma/client"
import {BookCard} from "@/components/books/BookCard";
import {FilterSection} from "@/components/books/FilterSection";
import {useState} from "react";

interface Books {
    data: Book[];
    categories: Category[];
}

export const BooksSection = ({data, categories}:Books) => {

    const [filteredBooks, setFilteredBooks] = useState<Book[]>(data);

    return (

        <div className="flex flex-col mb-35">

            <FilterSection
                books={data}
                setFilteredBooks={setFilteredBooks}
                categories={categories}
            />

            <section className="flex gap-2 p-5 flex-col">

                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <BookCard book={book} key={index} />
                    ))
                ) : (
                    <h2 style={{ color: 'var(--text-subtle)' }} className="text-center text-3xl">
                        No books found
                    </h2>
                )}

                {data.length === 0 && (
                    <h2 style={{ color: 'var(--text-subtle)' }} className="text-center text-3xl">
                        No books yet
                    </h2>
                )}


            </section>

        </div>
    )
}