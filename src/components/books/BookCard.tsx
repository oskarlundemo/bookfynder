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


            <div className="flex flex-row-reverse justify-between items-end">
                {book.readBooks.length > 0 && (
                    <div className={'flex items-end flex-end flex-col'}>

                        <div className={'flex flex-row-reverse items-center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>
                            <p>Read</p>
                        </div>


                        <p>Score: {book.readBooks[0]?.rating || 0} / 5</p>
                    </div>
                )}

                {book.readingList.length > 0 && (
                    <div className={'flex items-end flex-end flex-col'}>

                        <div className={'flex flex-row-reverse items-center'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
                            <p>Read</p>
                        </div>

                        <p>Priority: {book.readingList[0]?.priority || 0} / 5</p>
                    </div>
                )}

                {book.BookCategory.length > 0 && (
                    <div className={'flex flex-wrap flex-row gap-2'}>
                        {book.BookCategory.map((bookCategory, index: number) => (
                            <p className={'bg-black rounded-xl p-2 font-semibold text-white'} key={index}>{bookCategory.category.name}</p>
                        ))}
                    </div>
                )}
            </div>

        </article>
    )
}