import axios from "axios";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {debounce} from "perfect-debounce";
import {ResultCard} from "@/components/books/ResultCard";
import "@/styles/Book.css"
import {InputField} from "@/components/misc/InputField";


export type Book = {
    title: string;
    author_name?: string[];
    number_of_pages_median?: number;
    subject?: string[];
};

type Props = {
    setTitle: (title: string) => void;
    setAuthorName: (author_name: string) => void;
}

export const SearchAPI = ({setTitle, setAuthorName}:Props) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<Book[]>([]);
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    const handleSearch = async (query: string) => {

        if (!query) return;
        try {
            const res = await axios.get(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );
            setResults(res.data.docs.slice(0, 10));
        } catch (err) {
            console.error("Error searching books:", err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            handleSearch(query);
        }, 500),
        []
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setLoading(true);
        debouncedSearch(value);
    };

    const setBook = (title:string, author:string) => {
        setTitle(title);
        setAuthorName(author);
        setSearchFocused(false)
    }

    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <section className="flex items-center w-full justify-center">

            <div className="w-full">

                <div className="relative">

                    <InputField
                        type="text"
                        value={searchQuery}
                        setValue={setSearchQuery}
                        placholder={'Search for a title or author'}
                        name={'Search'}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                        }
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />

                    {searchFocused && searchQuery.length > 0 && (
                        <ul
                            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
                            onMouseDown={(e) => e.preventDefault()}
                        >

                            {loading && (
                                <p className={'p-2'}>Loading...</p>
                            )}

                            {results.length > 0 && !loading && (
                                (results.map((book, index) => (
                                        <ResultCard
                                            title={book.title}
                                            author={book.author_name?.[0] || "Unknown"}
                                            setBook={setBook}
                                            key={index}
                                        />
                                    )))
                            )}

                            {results.length === 0 && !loading && (
                                <p className={'p-2'}>No books found</p>
                            )}

                        </ul>
                    )}

                </div>

            </div>
        </section>
    )

}