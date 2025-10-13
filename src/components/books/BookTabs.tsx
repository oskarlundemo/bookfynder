"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookCards from "@/components/books/BookCards"
import EmptyBookFolder from  "@/components/books/EmptyBookFolder"
import BookTable from  "@/components/books/BookTable"
import {useEffect, useState} from "react";

interface Books {
    readBooks?: Books[];
    readingBooks?: Books[];
    queuedBooks?: Books[];
}

export const BookTabs = ({ readBooks, readingBooks, queuedBooks}: Books) => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    useEffect(() => {
        handleResize();
    }, []);

    return (
        <Tabs style={{maxWidth: 'var(--max-width)'}} defaultValue="reading" className="w-full flex-grow mx-auto">

            <TabsList>
                <TabsTrigger value="reading">Reading</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="queue">Queue</TabsTrigger>

            </TabsList>
            <TabsContent value="read">

                {readBooks && readBooks.length > 0 ? (
                        (isMobile ? (
                            <BookCards
                                books={readBooks}
                            />
                        ) : (
                            <BookTable
                                books={readBooks}
                            />
                        ))
                ) : (
                    <EmptyBookFolder
                        title={'No read books'}
                        description={"You have not yet added any books that you have already read"}
                    />
                )}

            </TabsContent>
            <TabsContent value="reading">

                {readingBooks && readingBooks.length > 0 ? (
                    (isMobile ? (
                        <BookCards
                            books={readingBooks}
                        />
                    ) : (
                        <BookTable
                            books={readingBooks}
                        />
                    ))
                ) : (
                    <EmptyBookFolder
                        title={'No read books'}
                        description={"You have not yet added any books that you have already read"}
                    />
                )}

            </TabsContent>
            <TabsContent value="queue">

                {queuedBooks && queuedBooks.length > 0 ? (
                    (isMobile ? (
                        <BookCards
                            books={queuedBooks}
                        />
                    ) : (
                        <BookTable
                            books={queuedBooks}
                        />
                    ))
                ) : (
                    <EmptyBookFolder
                        title={'No read books'}
                        description={"You have not yet added any books that you have already read"}
                    />
                )}

            </TabsContent>

        </Tabs>

    )
}