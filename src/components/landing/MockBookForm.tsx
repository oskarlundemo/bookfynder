"use client"
import "@/styles/BookForm.css"
import {InputField} from "@/components/misc/InputField";
import {useState, useRef, useEffect} from "react";
import {BookStatus} from "@/components/books/BookStatus"

export default function MockBookForm  () {


    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [pages, setPages] = useState<number>(0);
    const [bookStatus, setBookStatus] = useState<string>('READING');

    const timeouts = useRef<NodeJS.Timeout[]>([]);
    const intervals = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {

        const mockTitle = "East of eden";
        const mockAuthor = "John Steinbeck";
        const mockPages = 640;

        mockTitle.split("").forEach((char, i) => {
            const t = setTimeout(() => setTitle((prev) => prev + char), 100 * i);
            timeouts.current.push(t);
        });

        const authorStartTime = mockTitle.length * 100 + 400;
        mockAuthor.split("").forEach((char, i) => {
            const t = setTimeout(
                () => setAuthor((prev) => prev + char),
                authorStartTime + 100 * i
            );
            timeouts.current.push(t);
        });

        const pagesStartTime = authorStartTime + mockAuthor.length * 100 + 400;
        const t = setTimeout(() => {
            let current = 0;
            const interval = setInterval(() => {
                current += 10;
                setPages(current);
                if (current >= mockPages) clearInterval(interval);
            }, 40);
            intervals.current.push(interval);
        }, pagesStartTime);
        timeouts.current.push(t);

        return () => {
            timeouts.current.forEach(clearTimeout);
            intervals.current.forEach(clearInterval);
        };
    }, []);

    return (

        <form className={'gap-5 flex-grow w-full flex-wrap flex flex-col'}>

            <div className="flex flex-col flex-grow h-full w-full items-center my-auto gap-5">

                <div className="flex w-full flex-col gap-4">

                    <InputField
                        setValue={setTitle}
                        value={title}
                        type="text"
                        name="Title"
                        disabled={true}
                        className={'w-full'}
                    />

                    <InputField
                        setValue={setAuthor}
                        value={author}
                        type="text"
                        name="Author"
                        disabled={true}
                    />

                    <div className="flex items-end gap-5 flex-row">
                        <InputField
                            setValue={setPages}
                            value={pages}
                            type="number"
                            name="Pages"
                            disabled={true}
                        />
                    </div>
                </div>

                <BookStatus
                    disabled={true}
                    bookStatus={bookStatus}
                    setBookStatus={setBookStatus}
                />


            </div>

        </form>
    )
}