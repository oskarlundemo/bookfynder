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

import { Progress } from "@/components/ui/progress"



type props = {
    books: Books[];
}


export default function BookCards ({books} :props) {

    const router = useRouter();

    return (
        <section className="flex flex-col px-2 gap-2">
            {books.map((book, index) => (
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
                                <Button key={index}>{category.category.name}</Button>
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
            ))}
        </section>
    )
}