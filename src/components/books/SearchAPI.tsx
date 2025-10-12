import axios from "axios";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {debounce} from "perfect-debounce";
import {ResultCard} from "@/components/books/ResultCard";
import "@/styles/Book.css"
import {InputField} from "@/components/misc/InputField";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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

        if (!query.trim()) {
            console.log('No query');
            return;
        }

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

    return (
        <section className="flex items-center justify-start">

                <div className="relative w-full">

                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="picture">{"Search for a book or author"}</Label>
                        <Input
                            type={'text'}
                            value={searchQuery}
                            placholder={'Search for a title or author'}
                            onChange={onChange}
                            name={'Search'}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />

                        {searchFocused && searchQuery.length > 0 && (
                            <ul
                                className="absolute max-w-sm w-full top-full left-0  mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
                                onMouseDown={(e) => e.preventDefault()}
                            >

                                {loading && (
                                    <p className={'p-2 w-full text-center'}>Loading...</p>
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