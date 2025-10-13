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
    console.log(books);

    return (
        <section className="flex flex-col gap-2">
            {books.map((book, index) => (
                <Card onClick={() => router.push(`/books/${book.id}`)} key={index}>
                    <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {book.status === 'READING' && (
                            <div className="flex gap-1 flex-col w-full">
                                <p>Completion 33 %</p>
                                <Progress value={33} />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-wrap flex-row gap-2">
                            {book.BookCategory.map((category, index) => (
                                <Button key={index}>{category.category.name}</Button>
                            ))}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </section>
    )
}