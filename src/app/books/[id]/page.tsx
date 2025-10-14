"use client"

import "@/styles/Book.css"
import {useEffect, useState} from "react";
import BookForm from "@/components/books/BookForm";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {updateBook, getBook} from "@/app/books/[id]/actions";
import {Category} from "@prisma/client";
import { useRouter } from "next/navigation"
import {ShadSpinner} from "@/components/misc/ShadSpinner";

export default function AddBookPage () {

    const params = useParams<{ id: string }>();
    const bookId = params.id;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);

    const [rating, setRating] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const [bookStatus, setBookStatus] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [error, setError] = useState<Error>();

    const router = useRouter();

    useEffect(() => {

        if (!bookId) return;

        setLoading(true);

        const fetchBook = async () => {
            try {

                const {book} = await getBook(bookId);
                setTitle(book.title)
                setAuthor(book.author)
                setPages(book.pages)
                setSelectedCategories(book.bookCategories)
                setCategories(book.categories)
                setRating(book.rating)
                setBookStatus(book.status);
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
            currentPage,
            bookStatus,
            rating,
            selectedCategories
        });

        response.success ? toast.success(response.message) : toast.error(response.message);
    }

    if (loading) {
        return <ShadSpinner/>
    }

    if (error) {
        return <h1 className={'text-3xl flex h-full text-center w-full items-center justify-center my-auto font-bold'}>An error occurred while loading book</h1>
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">

            <div style={{maxWidth: 'var(--max-form)'}} className="flex book-add-wrapper flex-col w-full justify-start">

                <BookForm
                    title={title}
                    setTitle={setTitle}

                    author={author}
                    setAuthor={setAuthor}

                    pages={pages}
                    setPage={setPages}

                    bookStatus={bookStatus}
                    setBookStatus={setBookStatus}

                    setRating={setRating}
                    rating={rating}

                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                    handleSubmit={handleSubmit}

                    categories={categories}

                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}

                    disabledBtn={false}
                    buttonText={"Update"}
                />

            </div>

        </main>
    );
}


