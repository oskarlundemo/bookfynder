import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type Props = {
    books: any;
    title?: string;
    rating?: boolean;
    bookStatus?: string;
    subTitle?:string;
}

export default function BookTable({books, subTitle, bookStatus}: Props) {

    const router = useRouter();

    return (
        <Table>
            <TableCaption>{subTitle}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Pages</TableHead>

                    {(bookStatus === 'READ' || bookStatus === 'QUEUED') ? (
                        (bookStatus === 'READ' ? (
                            <TableHead>Rating</TableHead>
                        ) : (
                                <TableHead>Priority</TableHead>
                        ))
                    ) : (
                        <TableHead>Current page</TableHead>
                    )}
                    <TableHead className={'text-right'}>Configure</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {books.map((book: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                            {book.BookCategory
                                .map((category: any) => category.category?.name || 'No categories')
                                .join(', ')}
                        </TableCell>
                        <TableCell>{book.pages}</TableCell>


                        {bookStatus === 'READ' || bookStatus === 'QUEUED' ? (
                            <TableCell>{book.rating ?? '—'}</TableCell>
                        ) : (
                            <TableCell>{book.pagesRead ?? '0'}</TableCell>
                        )}


                        <TableCell className="text-right">
                            <Button onClick={() => router.push(`/books/${book.id}`)}>
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}