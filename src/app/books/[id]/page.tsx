"use client"

import "@/styles/Book.css"
import {SearchAPI} from "@/components/books/SearchAPI";
import {useEffect, useState} from "react";
import BookForm from "@/components/books/BookForm";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {updateBook, getBook, deleteBook} from "@/app/books/[id]/actions";
import {Book} from "@prisma/client";
import { useRouter } from "next/navigation"
import {LoadingSpinner} from "@/components/misc/LoadingSpinner";



export default function AddBookPage () {

    const params = useParams<{ id: string }>();
    const bookId = params.id;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);
    const [read, setRead] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [bookData, setBookData] = useState<Book | null>(null);


    const router = useRouter();

    useEffect(() => {

        if (!bookId) return;

        setLoading(true);

        const fetchBook = async () => {
            try {

                const data = await getBook(bookId);

                setBookData(data.book)
                setTitle(data.book.title)
                setAuthor(data.book.author)
                setPages(data.book.pages)
                setRead(data.book.hasRead)
                setPriority(data.book.priority)
                setRating(data.book.rating)
                setRead(data.book.rating)

            } catch (error) {
                setError(true);
                console.error("Error fetching book:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();

    }, [bookId]);


    const [categories, setCategories] = useState<string[]>([
        "Romance",
        "Thriller",
        "Classics",
        "Crime",
        "Fantasy"
    ]);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();

        const response = await updateBook({
            title,
            bookId,
            author,
            pages,
        })

        response.success ? toast.success(response.message) : toast.error(response.message);
    }


    async function handleDelete(e: React.FormEvent) {

        e.preventDefault();

        const response = await deleteBook(bookId);
        router.refresh();

        response.success ? toast.success(response.message) : toast.error(response.message);

        router.push("/books");
    }

    if (loading) {
        return <LoadingSpinner bgColor={'var(--secondary)'} />;
    }

    if (error) {
        return <h1 className={'text-3xl flex h-full text-center w-full items-center justify-center my-auto font-bold'}>An error occurred while loading book</h1>
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">

            <div className="flex book-add-wrapper flex-col w-full justify-start">

                <h1 className="text-xl font-bold mb-4">{title}</h1>

                <BookForm
                    title={title}
                    setTitle={setTitle}

                    author={author}
                    setAuthor={setAuthor}

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
                    buttonText={'Update'}
                />

                <button
                    className={'custom-button self-center w-fit mb-30'}
                    onClick={handleDelete}
                >
                    Delete book
                </button>

            </div>

        </main>
    );
}


