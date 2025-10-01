"use client"
import {Book} from "@prisma/client"
import { useRouter } from "next/navigation";

interface BookCardProps {
    book: Book;
}

export const BookCard = ({book}:BookCardProps) => {

    const router = useRouter();

    return (
        <article onClick={() => router.push(`/books/${book.id}`)} className="flex w-full shadow p-10 flex-col h-full">

            <h2 className={'font-bold text-2xl'}>{book.title}</h2>
            <h3 className={'font-base text-gray-500 italic text-xl'}>{book.author}</h3>

        </article>
    )
}