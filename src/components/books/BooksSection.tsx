"use client"

import {Book, Category} from "@prisma/client";
import {BookTabs} from "@/components/books/BookTabs";

interface BooksProps {
    data: Book[];
    categories: Category[];
}

export const BooksSection = ({data}:BooksProps) => {

    return (

        <div className="flex flex-col w-full">

            <BookTabs
                data={data}
            />

        </div>
    )
}