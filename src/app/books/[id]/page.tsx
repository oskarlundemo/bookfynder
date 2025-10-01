"use client"

import "@/styles/Book.css"
import {SearchInput} from "@/components/books/SearchInput";
import {useEffect, useState} from "react";
import BookForm from "@/components/books/BookForm";
import { addBook } from "@/app/books/add/actions";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {createClient} from "@/lib/supabase/component";

export default function AddBookPage () {

    const params = useParams();
    const bookId = params?.id; // this comes from [id] in the route

    console.log(bookId);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [pages, setPages] = useState<number>(0);
    const [read, setRead] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);

    const supabase = createClient()
    const [user, setUser] = useState<any>()

    useEffect (() => {
        supabase.auth.getUser().then((session) => {
            setUser(session.data.user)
        });
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user]);


    useEffect(() => {
        if (!bookId) return;

        setLoading(true);

        fetch(`/api/books/${bookId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTitle(data.book.title);
                    setAuthor(data.book.author);
                    setPages(data.book.pages);
                } else {
                    toast.error(data.message);
                }
                setLoading(false);
            });
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

        if (!user) return;

        const response = await addBook({
            title,
            author,
            pages,
            userId: user.id
        });

        setTitle("");
        setAuthor("");
        setPages(0);

        response.success ? toast.success(response.message) : toast.error(response.message);
    }

    if (loading) {
        return <h1 className={' text-3xl text-center m-auto font-bold'}>Loading...</h1>
    }

    return (
        <main className="flex book-add items-end justify-center h-full w-full">


            <div className="flex book-add-wrapper flex-col w-full justify-start">

                <h1 className="text-xl font-bold mb-4">Update book</h1>

                <SearchInput
                    setTitle={setTitle}
                    setAuthorName={setAuthor}
                />

                <BookForm
                    title={title}
                    author={author}
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

            </div>

        </main>
    );
}


