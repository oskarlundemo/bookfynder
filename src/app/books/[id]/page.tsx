"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdateBookClient from "@/components/books/UpdateBookClient";
import {prisma} from "@/lib/prisma";
import ErrorPage from "@/components/misc/ErrorPage"

export default async function UpdateBookPage({params,}: { params: { id: string }; }) {

    const supabase = await createClient();
    const bookId = params.id;
    const { data, error } = await supabase.auth.getUser();

    // Check if user is authenticated
    if (error || !data?.user) {
        redirect("/auth/login");
    }

    const isUsersBook = await prisma.book.findUnique({
        where: {
            userId: data.user.id,
            id: bookId
        }
    })

    if (!isUsersBook) {
        return <ErrorPage
            title={'Unauthorized'}
            details={'The book data you are trying to access does not belong to you'}
        />
    }

    return <UpdateBookClient bookId={bookId} />;
}


