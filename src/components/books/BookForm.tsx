import "@/styles/BookForm.css"
import {InputField} from "@/components/misc/InputField";
import {SelectCategories} from "@/components/misc/SelectCategories";
import {Category} from "@prisma/client";
import {BookStatus} from "@/components/books/BookStatus";
import {BookScore} from "@/components/books/BookScore";
import CurrentPageSlider from "@/components/books/CurrentPageSlider";
import DeleteBookDialog from "@/components/books/DeleteBookDialog";

import {
    Button
} from "@/components/ui/button"

interface BookProps {
    author: string;
    setAuthor?: (author: string) => void;

    title: string;
    setTitle: (title: string) => void;

    currentPage: number;
    setCurrentPage: (currentPage: number) => void;

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
    handleDelete?: (bookId: string, e:Event) => void;
    bookId?: string;
}

export default function BookForm  ({disabledBtn, setAuthor, setTitle, currentPage, setCurrentPage, handleDelete,
                                       buttonText = 'Save', author, rating, selectedCategories, bookId,
                                       title, setPage, setRating, categories, setSelectedCategories,
                                       handleSubmit, pages, bookStatus, setBookStatus}:BookProps) {

    return (

        <form onSubmit={handleSubmit} className={'gap-5 flex-wrap flex mt-10 flex-col'}>

            <div className="grid w-full items-center my-auto gap-5 grid-cols-1 sm:grid-cols-2">

                <div className="flex flex-col order-1 sm:order-2 gap-4">
                    <InputField
                        setValue={setTitle}
                        value={title}
                        type="text"
                        placeholder="Dorian Grey"
                        name="Title *"
                        maxLength={100}
                    />

                    <InputField
                        setValue={setAuthor}
                        value={author}
                        type="text"
                        placeholder="Oscar Wilde"
                        name="Author *"
                        maxLength={100}
                    />

                    <div className="flex items-end gap-5 flex-row">
                        <InputField
                            setValue={setPage}
                            value={pages}
                            type="number"
                            placeholder={0}
                            name="Pages *"
                            maxNumber={10000}
                        />

                        {(bookStatus === "READ" || bookStatus === "QUEUED") && (
                            <BookScore
                                rating={rating}
                                setRating={setRating}
                                read={bookStatus === "READ"}
                            />
                        )}
                    </div>


                    <div className="flex flex-col gap-2 flex-row">
                        <p className={'text-sm text-gray-500 items enter'}>Mandatory fields are marked with</p>
                        <svg className={'fill-gray-500'} xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="#e3e3e3"><path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z"/></svg>
                    </div>


                </div>


                <div className="flex justify-around flex-col order-2 sm:order-1">
                    <BookStatus
                        bookStatus={bookStatus}
                        setBookStatus={setBookStatus}
                    />
                </div>
            </div>


            <div className="flex flex-row justify-between w-full gap-2 flex-wrap">
                <h2>Categories *</h2>
                <div className="flex flex-col w-full">

                    <div
                        className={`flex flex-wrap ${selectedCategories.length > 0 ? 'bg-gray-100 p-2 gap-2 rounded-2xl' : ''}   mb-3 transition-all duration-200 min-h-[40px]`}
                    >
                        {selectedCategories.length > 0 ? (
                            selectedCategories.map((category, index) => (
                                <Button type="button" key={index}>
                                    {category.name || category.value}
                                </Button>
                            ))
                        ) : (
                            <div className="h-8 opacity-0 w-full" />
                        )}
                    </div>

                    <div className="flex flex-row justify-between flex-wrap">
                        <SelectCategories
                            categories={categories}
                            setSelectedCategories={setSelectedCategories}
                            selectedCategories={selectedCategories}
                        />
                    </div>
                </div>
            </div>


            {bookStatus === "READING" && (
                <CurrentPageSlider
                    noOfPages={pages}
                    value={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}

            <div className="flex justify-around flex-row w-full gap-2">

                {handleDelete && (
                    <DeleteBookDialog handleDelete={(e) => handleDelete(e, bookId)}/>
                )}

                <Button className={'w-1/3 cursor-pointer w-1/2'} disabled={disabledBtn}>{buttonText}</Button>
            </div>

        </form>
    )
}