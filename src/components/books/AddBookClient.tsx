"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addBook, fetchCategories } from "@/app/books/add/actions";
import {SearchAPI} from "@/components/books/SearchAPI";
import BookForm from "@/components/books/BookForm";
import {ShadSpinner} from "@/components/misc/ShadSpinner"

export default function AddBookClient({ user }: { user: any }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [pages, setPages] = useState(0);
    const [rating, setRating] = useState(0);
    const [categories, setCategories] = useState([]);
    const [bookStatus, setBookStatus] = useState("READ");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

    useEffect(() => {
        const isAllowed =
            title.trim().length > 0 &&
            author.trim().length > 0 &&
            pages > 0 &&
            rating > 0

        setAllowSubmit(isAllowed)
    }, [title, author, pages, rating])

    useEffect(() => {
        async function loadCategories() {
            const response = await fetchCategories();
            setCategories(response?.categories);
            setLoading(false);
        }
        loadCategories();
    }, []);

    useEffect(() => {
        if (currentPage > pages) setCurrentPage(pages);
    }, [pages]);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        const response = await addBook({
            title,
            author,
            pages,
            bookStatus,
            currentPage,
            rating,
            selectedCategories,
            userId: user.id,
        });

        if (response.success) {
            toast.success(response.message);

            setTitle('');
            setAuthor('');
            setPages(0);
            setBookStatus('READ');
            setSelectedCategories([]);

        } else {
            toast.error(response.message);
        }

    }

    if (loading) return <ShadSpinner/>;

    return (
        <main className="flex items-start justify-center h-full w-full">
            <div style={{ maxWidth: "var(--max-form)" }} className="flex m-5 rounded-2xl flex-col w-full">
                <SearchAPI setTitle={setTitle} setAuthorName={setAuthor} />
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
                    disabledBtn={!allowSubmit}
                    buttonText="Add"
                />
            </div>
        </main>
    );
}



