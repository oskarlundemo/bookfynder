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
}

export default function BookTable({books}: Props) {

    const router = useRouter();

    return (
        <Table>
            <TableCaption>A list of your read books.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Author</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead className={'text-right'}></TableHead>
                    <TableHead className={'text-right'}></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {books.map((book: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{book.author}</TableCell>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell className="font-medium">{book.pages}</TableCell>

                        <TableCell className="text-right m-2">
                            <Button
                                onClick={() => router.push(`/books/${book.id}`)}
                                className="cursor-pointer mx-2">Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}