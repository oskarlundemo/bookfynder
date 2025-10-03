"use client"

import "@/styles/Book.css"
import {useEffect, useState} from "react";
import BookForm from "@/components/books/BookForm";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {updateBook, getBook, deleteBook} from "@/app/books/[id]/actions";
import {Category} from "@prisma/client";
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
    const [categories, setCategories] = useState<any>([]);
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<Error>();

    const router = useRouter();

    useEffect(() => {

        if (!bookId) return;

        setLoading(true);

        const fetchBook = async () => {
            try {

                const {book} = await getBook(bookId);
                console.log(book);
                setTitle(book.title)
                setAuthor(book.author)
                setPages(book.pages)
                setSelectedCategories(book.bookCategories)
                setCategories(book.categories)
                setRead(book.hasRead)
                !!book.hasRead ? setRating(book?.score) : setPriority(book?.score);

            } catch (error) {
                setError(true);
                console.error("Error fetching book:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();

    }, [bookId]);

    async function handleSubmit (e: React.FormEvent) {

        if (!bookId) return;

        e.preventDefault();

        const response = await updateBook({
             bookId,
            title,
            author,
            pages,

            read,
            rating,
            priority,
            selectedCategories,
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

                    setRating={setRating}
                    rating={rating}

                    priority={priority}
                    setPriority={setPriority}

                    handleSubmit={handleSubmit}

                    categories={categories}

                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}

                    disabledBtn={disabledBtn}
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


