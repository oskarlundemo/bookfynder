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
    const [read, setRead] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [categories, setCategories] = useState<any>([]);
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setDisabledBtn(
            !(
                title.trim().length > 0 && title.trim().length < 200 &&
                author.trim().length > 0 && author.trim().length < 200 &&
                selectedCategories.length > 0 && selectedCategories.length <= 5 &&
                pages > 0 && pages < 10000
            )
        );
    }, [title, author, pages, selectedCategories]);

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

        const response = await addBook({
            title,
            author,
            pages,

            read,
            rating,
            priority,
            selectedCategories,
        });

        setTitle("");
        setAuthor("");
        setPages(0);

        response.success ? toast.success(response.message) : toast.error(response.message);
    }

    if (loading) {
        return <LoadingSpinner bgColor={'var(--secondary)'}/>
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">

            <div className="flex book-add-wrapper flex-col w-full justify-start">

                <div className="flex flex-row justify-between">
                    <h1 className="text-xl font-bold mb-4">Add a new book</h1>
                    <p style={{color: 'var(--text-subtle)'}} className={'text-right'}>* Mandatory</p>
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
                />

            </div>

        </main>
    );
}


