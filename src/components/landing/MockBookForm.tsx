"use client"
import "@/styles/BookForm.css"
import {InputField} from "@/components/misc/InputField";
import {useState, useRef, useEffect} from "react";
import {BookStatus} from "@/components/books/BookStatus"
import LandingText from "@/components/misc/LandingText";

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
        <section className="
            flex w-full
            flex-col md:flex-row
            rounded-2xl p-10
            items-start
            gap-10

           ">
            <LandingText
                title={"Start by adding your favorite reads"}
                breadText={
                    <>
                        <p className={'text-left text-lg leading-relaxed'}>
                            Start by adding some of the books you have already read. Be sure to rate them as well,
                            so the algorithm can make better predictions. Most books can be found using the{' '}
                            <a
                                className="border-b-4 border-black"
                                href="https://openlibrary.org/developers/api"
                            >
                                OpenLibrary API
                            </a>
                            {' '} otherwise, you can add them manually.
                        </p>
                    </>
                }
                number={1}
            />

            <div className="flex flex-col md:w-1/2 w-full items-center gap-5">

                <div className="flex mx-auto w-full flex-col gap-4">

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

                <BookStatus mock={true} disabled={true} bookStatus={"READ"}/>

            </div>

        </section>
    )
}