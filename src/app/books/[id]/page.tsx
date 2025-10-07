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
import {Overlay} from "@/components/misc/Overlay";
import {PopUpModule} from "@/components/misc/PopUpModule";


export default function AddBookPage () {

    const params = useParams<{ id: string }>();
    const bookId = params.id;

    const [showOverlay, setShowOverlay] = useState<boolean>(false);
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

            <div className="flex book-add-wrapper flex-col w-full mb-35 justify-start">

                <h1 className="text-2xl text-center font-bold m-5 ">Edit book</h1>

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
                    className={'custom-button self-center w-fit'}
                    onClick={() => setShowOverlay(true)}
                >
                    Delete book
                </button>

            </div>

            <Overlay
                show={showOverlay}
                setShow={setShowOverlay}
            />

            <PopUpModule
                children={
                    <div className={'delete-container flex-grow justify-center gap-5 flex h-full flex-col'}>

                        <h4 className={'text-xl text-center font-bold'}>Are you sure you want to delete this book?</h4>
                        <h5 className={'text-center'}>This action <u>can not </u> be undone</h5>


                        <div className={'flex gap-2 flex-row'}>
                            <button
                                className={'button-cancel w-1/2'}
                                type="button"
                                onClick={() => {
                                    setShowOverlay(false);
                                }}
                            >Cancel</button>

                            <button
                                className={'button-delete w-1/2'}
                                type="button"
                                onClick={(e) => {
                                    setShowOverlay(false);
                                    handleDelete(e);
                                }}
                            >Delete
                            </button>

                        </div>

                    </div>
                }
                show={showOverlay}
                setShow={setShowOverlay}
            />

        </main>
    );
}


