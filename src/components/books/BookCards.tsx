import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress"
import {useState, useEffect} from "react";

type props = {
    books: Books[];
}

export default function BookCards ({books} :props) {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredBooks, setFilteredBooks] = useState<Books>(books)

    console.log(books)

    useEffect(() => {

        if (!books.length)
            return;

        setFilteredBooks(
            books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

    }, [searchTerm, books]);

    return (
        <section className="flex flex-col px-2 gap-2">

            <div className="flex items-center gap-5">
                <Search className="w-4 h-4 aspect-square" />
                <Input
                    placeholder="Filter by title or author..."
                    value={searchTerm}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSearchTerm(val);
                    }}
                    className="max-w-sm"
                />
            </div>

            {filteredBooks.length > 0 ? (
                (filteredBooks.map((book, index) => (
                        <Card onClick={() => router.push(`/books/${book.id}`)} key={index}>
                            <CardHeader>
                                <CardTitle>{book.title}</CardTitle>
                                <CardDescription>{book.author}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {book.status === 'READING' && (
                                    <div className="flex gap-1 flex-col w-full">
                                        <p>Read {Math.ceil(book.pagesRead / book.pages * 100, 1)} %</p>
                                        <Progress value={book.pagesRead / book.pages * 100} />
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter>
                                <div className="flex flex-wrap flex-row gap-2">
                                    {book.BookCategory.map((category, index) => (
                                        <Button key={index}>{category.Category?.name ? category.Category?.name : "Nope"}</Button>
                                    ))}
                                </div>

                                {(book.status === 'READ' || book.status === 'QUEUED') && book.rating && (
                                    <div className={'flex flex-row ml-auto gap-2 items-center'}>
                                        <p>{book.status === 'READ' ? 'Rating' : 'Priority'}</p>
                                        <p>{book.rating} / 5</p>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    )))
            ) : (
                <p className={'my-2 text-muted-foreground text-center'}>No results matched "{searchTerm}"</p>
            )}
        </section>
    )
}