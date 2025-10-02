"use client"
import {Book} from "@prisma/client"
import { useRouter } from "next/navigation";

interface BookCardProps {
    book: Book;
}

export const BookCard = ({book}:BookCardProps) => {

    const router = useRouter();

    return (
        <article
            style={{ backgroundColor: 'var(--primary)' }}
            onClick={() => router.push(`/books/${book.id}`)}
            className="rounded-2xl shadow-lg flex w-full p-10 flex-col h-full cursor-pointer"
        >

            <h2 className={'font-bold text-2xl'}>{book.title}</h2>
            <h3 className={'font-base text-gray-500 italic text-xl'}>{book.author}</h3>

        </article>
    )
}