"use client"
import {Book}  from "@prisma/client"
import {BookCard} from "@/components/books/BookCard";

interface Books {
    data: Book[];
}



export const BooksSection = ({data}:Books) => {


    return (
        <section className="flex gap-2 p-5 flex-col">
            {data.length > 0 && (
                data.map((book, index) => {
                    return (
                        <BookCard book={book} key={index}/>
                    )
                })
            )}
        </section>
    )
}