import "@/styles/BookForm.css"
import {InputField} from "@/components/misc/InputField";
import {SelectCategories} from "@/components/misc/SelectCategories";
import {Category} from "@prisma/client";
import {BookStatus} from "@/components/books/BookStatus";
import {BookScore} from "@/components/books/BookScore";
import {PageSlider} from "@/components/misc/PageSlider";


import {
    Button
} from "@/components/ui/button"

interface BookProps {
    author: string;
    setAuthor?: (author: string) => void;

    title: string;
    setTitle: (title: string) => void;

    bookStatus: string;
    setBookStatus: (status: string) => void;

    pages: number;
    setPage: (page: number) => void;

    setRating: (value: number) => void;
    rating: number;

    categories: Category[];

    selectedCategories: Category[];
    setSelectedCategories: (categories: Category[]) => void;

    buttonText?: string;
    disabledBtn: boolean;

    handleSubmit: (value: any) => void;
}

export default function BookForm  ({disabledBtn, setAuthor, setTitle,
                                       buttonText = 'Save', author, rating, selectedCategories,
                                       title, setPage, setRating, categories, setSelectedCategories,
                                       handleSubmit, pages, bookStatus, setBookStatus}:BookProps) {

    return (

        <form onSubmit={handleSubmit} className={'gap-5 flex mt-5 flex-col'}>

            <InputField
                setValue={setTitle}
                value={title}
                type={"text"}
                placeholder={'Dorian Grey'}
                name={'Title'}
            />

            <InputField
                setValue={setAuthor}
                value={author}
                type={"text"}
                placeholder={'Oscar Wilde'}
                name={'Author'}
            />

            <InputField
                setValue={setPage}
                value={pages}
                type={"number"}
                placeholder={0}
                name={'Pages'}
            />

            <div className={'flex flex-row justify-between gap-2 flex-wrap'}>

                <SelectCategories
                    categories={categories}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                />



                {(bookStatus === "READ" || bookStatus === "QUEUE") && (
                    <BookScore
                        rating={rating}
                        setRating={setRating}
                        read={bookStatus === "READ"}
                    />
                )}

            </div>

            <BookStatus
                bookStaus={bookStatus}
                setBookStatus={setBookStatus}
            />

            <Button className={'w-fit mx-auto'} disabled={disabledBtn}>{buttonText}</Button>

        </form>
    )
}