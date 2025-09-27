
type Props = {
    author: string;
    title: string;
    pages: number;
    setPage: (page: number) => void;
    read: boolean;
    setRead: (value: boolean) => void;
    setRating: (value: number) => void;
    rating: number;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    categories: string[];
}

export const BookForm = ({author, rating, setRating, title, setPage, read, handleSubmit, categories, setRead, pages}:Props) => {

    return (
        <form onSubmit={handleSubmit} className={'book-form flex-grow flex mt-5 flex-col'}>

            <div className="flex items-center mb-4">
                <label htmlFor="title" className="w-24 font-medium">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    name="title"
                    className="flex-1 p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="flex items-center mb-4">
                <label htmlFor="author" className="w-24 font-medium">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    name="author"
                    className="flex-1 p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="flex items-center mb-4">
                <label htmlFor="pages" className="w-24 font-medium">
                    Pages
                </label>
                <input
                    type="number"
                    id="pages"
                    value={pages}
                    name="pages"
                    onChange={(e) => {
                        setPage(Number(e.target.value))
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded"
                />
            </div>

            {categories.length > 0 && (
                <div className="flex flex-col mb-4">
                    <p className="mb-2 font-semibold">Categories</p>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category: string, index: number) => (
                            <button
                                key={index}
                                type="button"
                                className="custom-button"
                                onClick={() => console.log(`Selected category: ${category}`)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <p className="mb-2 font-semibold">Status</p>

            <div className="flex items-center mb-4">

                <button
                    className={`custom-button w-1/2 ${read ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => setRead(true)}
                    type="button"
                    style={{
                        transition: '200ms ease-in-out',
                    }}
                >
                    Read
                </button>

                <button
                    className={`custom-button w-1/2 ${!read ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => setRead(false)}
                    type="button"
                    style={{
                        transition: '200ms ease-in-out',
                    }}
                >
                    Want to read
                </button>
            </div>


            {read && (
                <>
                    <p className="mb-2 font-semibold">Rating</p>

                    <div className="flex my-5 px-10 justify-between items-center mb-4">

                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                onClick={() => setRating(i + 1)}
                                key={i}
                                className={i < rating ? "fill-yellow-400" : "fill-gray-300"}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z"/></svg>
                        ))}

                    </div>
                </>
            )}

            <button
                className="custom-button self-center mt-auto w-fit items-center mb-4"
                type="submit"
            >
                Save
            </button>


        </form>
    )

}