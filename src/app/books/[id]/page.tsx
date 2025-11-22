"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdateBookClient from "@/components/books/UpdateBookClient";
import {prisma} from "../../../../prisma/prisma";
import NotFound from "@/app/not-found"

export default async function UpdateBookPage({params,}: { params: { id: string }; }) {

    const supabase = await createClient();
    const bookId = params.id;
    const { data, error } = await supabase.auth.getUser();

    // Check if user is authenticated
    if (error || !data?.user) {
        redirect("/auth/login");
    }

    try {

        const isUsersBook = await prisma.book.findUnique({
            where: {
                userId: data.user.id,
                id: bookId
            }
        })

        if (!isUsersBook) {
            return (
                    <NotFound
                        errorMessage="It looks like this book isn’t part of your library."
                    />
                )
        }

        return <UpdateBookClient bookId={bookId} />;

    } catch (error) {
        return <NotFound errorMessage={'The book your are searching for does not exist'}/>
    }
}


