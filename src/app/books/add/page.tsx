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

    const [bookStatus, setBookStatus] = useState<string>("READ");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

        console.log(bookStatus);

        const response = await addBook({
            title,
            author,
            pages,
            bookStatus,
            currentPage,
            rating,
            selectedCategories
        });

        response.success ? toast.success(response.message) : toast.error(response.message);
    }


    useEffect(() => {
        if (currentPage > pages) setCurrentPage(pages);
    }, [pages]);


    if (loading) {
        return <LoadingSpinner bgColor={'var(--secondary)'}/>
    }

    return (
        <main className="flex items-start h-full justify-center">

            <div style={{maxWidth: 'var(--max-form)'}} className="flex my-10 rounded-2xl flex-col w-full">

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

                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}

                    handleSubmit={handleSubmit}

                    categories={categories}

                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}

                    disabledBtn={false}
                    buttonText={"Add"}
                />

            </div>

        </main>
    );
}


