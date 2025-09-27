import axios from "axios";
import {ChangeEvent, useCallback, useState} from "react";
import {debounce} from "perfect-debounce";
import {ResultCard} from "@/components/books/ResultCard";
import "@/styles/Book.css"

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

export const SearchInput = ({setTitle, setAuthorName}:Props) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<Book[]>([]);
    const [searchFocused, setSearchFocused] = useState<boolean>(false);

    const handleSearch = async (query: string) => {

        if (!query) return;

        try {
            const res = await axios.get(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );
            setResults(res.data.docs.slice(0, 10));
            console.log("Search results:", res.data.docs);
        } catch (err) {
            console.error("Error searching books:", err);
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
        debouncedSearch(value);
    };

    const setBook = (title:string, author:string) => {
        setTitle(title);
        setAuthorName(author);
        setSearchFocused(false)
    }

    return (
        <section className="flex items-center w-full justify-center">

            <div className="w-full">

                <div className="relative">
                    <input
                        className="w-full search-book p-2 bg-gray-100 border border-gray-300 rounded"
                        type="text"
                        value={searchQuery}
                        onChange={onChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        placeholder="Search books..."
                    />

                    {searchFocused && results.length > 0 && (
                        <ul
                            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {results.map((book, index) => (
                                <ResultCard
                                    title={book.title}
                                    author={book.author_name?.[0] || "Unknown"}
                                    setBook={setBook}
                                    key={index}
                                />
                            ))}
                        </ul>
                    )}
                </div>


            </div>
        </section>
    )

}