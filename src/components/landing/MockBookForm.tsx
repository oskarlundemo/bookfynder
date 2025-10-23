
import "@/styles/BookForm.css"
import {InputField} from "@/components/misc/InputField";
import {useState, useEffect} from "react";


export default function MockBookForm  () {


    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [pages, setPages] = useState<number>(0);


    useEffect(() => {

        const mockTitle = "East of eden"
        const mockAuthor = "John Steinbeck"
        const mockPages = 640

        mockTitle.split("").forEach((char, i) => {
            setTimeout(() => {
                setTitle((prev) => prev + char)
            }, 100 * i)
        })


        setTimeout(() => {
            mockAuthor.split("").forEach((char, i) => {
                setTimeout(() => {
                    setAuthor((prev) => prev + char)
                }, 100 * i)
            })
        }, mockTitle.length * 100 + 400)

        setTimeout(() => {
            let current = 0
            const interval = setInterval(() => {
                current += 10
                setPages(current)
                if (current >= mockPages) clearInterval(interval)
            }, 40)
        }, mockTitle.length * 100 + mockAuthor.length * 100 + 800)
    }, [])

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

            </div>

        </form>
    )
}