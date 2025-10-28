"use client";

import "@/styles/Book.css";
import { useEffect, useState } from "react";
import BookForm from "@/components/books/BookForm";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { ShadSpinner } from "@/components/misc/ShadSpinner";
import { getBook, updateBook } from "@/app/books/[id]/actions";
import {deleteBook} from "@/app/books/[id]/actions";
import { useRouter } from "next/navigation";


export default function UpdateBookClient({ bookId }: { bookId: string }) {

    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);

    const [rating, setRating] = useState<number>(1);
    const [categories, setCategories] = useState<Category[]>([]);

    const [bookStatus, setBookStatus] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!bookId) return;
        setLoading(true);

        const fetchBook = async () => {
            try {
                const { book } = await getBook(bookId);
                setTitle(book.title);
                setAuthor(book.author);
                setPages(book.pages);
                setCurrentPage(book.pagesRead);
                setSelectedCategories(book.bookCategories);
                setCategories(book.categories);
                setRating(book.rating || 1);
                setBookStatus(book.status);
            } catch (err) {
                console.error("Error fetching book:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!bookId) return;

        const response = await updateBook({
            bookId,
            title,
            author,
            pages,
            currentPage,
            bookStatus,
            rating,
            selectedCategories,
        });

        response.success
            ? toast.success(response.message)
            : toast.error(response.message);
    }


    async function handleDelete(e: React.FormEvent, bookId: string) {

        if (!bookId)
            return;

        e.preventDefault();

        const response = await deleteBook(bookId);
        router.refresh();

        if (response.success) {
            toast.success(response.message);
            router.push("/books");
        } else {
            toast.error(response.message);
        }
    }


    if (loading) return <ShadSpinner />;

    if (error) {
        return (
            <h1 className="text-3xl flex h-full text-center w-full items-center justify-center my-auto font-bold">
                An error occurred while loading book
            </h1>
        );
    }

    return (
        <main className="flex items-end justify-center h-full w-full">
            <div
                style={{ maxWidth: "var(--max-form)" }}
                className="flex book-add-wrapper m-5 flex-col w-full justify-start"
            >
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

                    handleDelete={handleDelete}
                    bookId={bookId}
                    disabledBtn={disabledBtn}
                    buttonText="Update"
                />
            </div>
        </main>
    );
}



