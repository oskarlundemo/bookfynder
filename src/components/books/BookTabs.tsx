"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {BookCard} from "@/components/books/BookCard"
import EmptyBookFolder from  "@/components/books/EmptyBookFolder"
import BookTable from  "@/components/books/BookTable"

interface Books {
    readBooks?: Books[];
    readingBooks?: Books[];
    queuedBooks?: Books[];
}

export const BookTabs = ({ readBooks, readingBooks, queuedBooks}: BooksProps) => {

    return (
        <Tabs style={{maxWidth: 'var(--max-width)'}} defaultValue="reading" className="w-full mx-auto">

            <TabsList>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="queue">Queue</TabsTrigger>

            </TabsList>
            <TabsContent value="read">

                {readBooks && readBooks.length > 0 ? (
                    <BookTable
                        books={readBooks}
                    />
                ) : (
                    <EmptyBookFolder
                        title={'No read books'}
                        description={"You have not yet added any books that you have already read"}
                    />
                )}

            </TabsContent>
            <TabsContent value="reading">

                {readingBooks && readingBooks.length > 0 ? (
                    <BookTable
                        books={readingBooks}
                    />
                ) : (
                    <EmptyBookFolder
                        title={'No current reads'}
                        description={"You have not yet added any books that you are currently reading"}
                    />
                )}

            </TabsContent>
            <TabsContent value="queue">

                {queuedBooks && queuedBooks.length > 0 ? (
                    <BookTable
                        books={queuedBooks}
                    />
                ) : (
                    <EmptyBookFolder
                        title={'No queued books'}
                        description={"You have not yet added any books to your want to read in the future"}
                    />
                )}

            </TabsContent>

        </Tabs>

    )
}