"use client";

import { Search } from "lucide-react"
import * as React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    ColumnDef,
    FilterFn,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Book = {
    id: string;
    title: string;
    author: string;
    pages: number;
    pagesRead?: number;
    rating?: number;
    BookCategory?: { category: { name: string } }[];
};

type Props = {
    books: Book[];
    subTitle?: string;
    bookStatus?: string;
};

export default function BookTable({ books, subTitle, bookStatus }: Props) {

    const router = useRouter();
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [globalFilter, setGlobalFilter] = React.useState("");


    const globalFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
        const search = String(filterValue.toLowerCase());
        const title = row.original.title?.toLowerCase()
        const author = row.original.author?.toLowerCase();
        return title.includes(search) || author.includes(search)
    }

    const columns: ColumnDef<Book>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "author",
            header: "Author",
            cell: (info) => info.getValue(),
        },
        {
            id: "categories",
            header: "Categories",
            cell: ({ row }) =>
                row.original.BookCategory?.map((c) => c.category?.name).join(", ") ||
                "—",
        },
        {
            accessorKey: "pages",
            header: "Pages",
            cell: (info) => info.getValue(),
        },
        {
            id: "statusColumn",
            header:
                bookStatus === "READ"
                    ? "Rating"
                    : bookStatus === "QUEUED"
                        ? "Priority"
                        : "Current Page",
            cell: ({ row }) => {
                const book = row.original;
                return bookStatus === "READ" || bookStatus === "QUEUED"
                    ? book.rating ?? "—"
                    : book.pagesRead ?? 0;
            },
        },
        {
            id: "actions",
            header: "Configure",
            cell: ({ row }) => (
                <Button onClick={() => router.push(`/books/${row.original.id}`)}>
                    Edit
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: books,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        // @ts-ignore
        onSortingChange: setSorting,
        // @ts-ignore
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-5">
                <Search className="w-4 h-4 aspect-square" />
                <Input
                    placeholder="Filter by title or author..."
                    value={searchTerm}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSearchTerm(val);
                        setGlobalFilter(val)
                    }}
                    className="max-w-sm"
                />
            </div>

            <Table>
                <TableCaption>{subTitle}</TableCaption>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No results matching "{searchTerm}"
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
