"use client"

import "@/styles/Book.css"
import {SearchAPI} from "@/components/books/SearchAPI";
import {useEffect, useState} from "react";
import BookForm from "@/components/books/BookForm";
import { addBook, fetchCategories } from "@/app/books/add/actions";
import toast from "react-hot-toast";
import {LoadingSpinner} from "@/components/misc/LoadingSpinner";
import {Category} from "@prisma/client";

export default function AddBookPage () {

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);

    const [rating, setRating] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);

    const [bookStatus, setBookStatus] = useState<string>("");

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log(rating);
        console.log(bookStatus);
    }, [rating, bookStatus]);


    useEffect(() => {
        setLoading(true);
        async function loadCategories() {
            const response = await fetchCategories();
            setCategories(response.categories);
            setLoading(false);
        }
        loadCategories();
    }, []);

    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();

        console.log("Adding book:\n", JSON.stringify({
            title,
            author,
            pages,
            bookStatus,
            rating,
            selectedCategories
        }, null, 2));

        /**
         *     const response = await addBook({
         *             title,
         *             author,
         *             pages,
         *
         *             status,
         *             rating,
         *             priority,
         *             selectedCategories
         *         });
         *
         */


        setTitle("");
        setAuthor("");
        setPages(0);

        response.success ? toast.success(response.message) : toast.error(response.message);
    }

    if (loading) {
        return <LoadingSpinner bgColor={'var(--secondary)'}/>
    }


    return (
        <main className="add-main flex items-end h-full justify-center">

            <div style={{maxWidth: 'var(--max-form)'}} className="flex book-add-wrapper h-fit! rounded-2xl my-auto flex-col w-full justify-start">

                <div className="flex flex-row justify-center">
                    <h1 className="text-2xl text-center font-bold m-5 ">Add book</h1>
                </div>

                <SearchAPI
                    setTitle={setTitle}
                    setAuthorName={setAuthor}
                />

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

                    handleSubmit={handleSubmit}

                    categories={categories}

                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}

                    disabledBtn={false}
                />

            </div>

        </main>
    );
}


