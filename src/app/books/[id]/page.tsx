"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import UpdateBookClient from "@/components/books/UpdateBookClient";

export default async function UpdateBookPage({params,}: { params: { id: string }; }) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/auth/login");
    }

    const bookId = params.id;

    return <UpdateBookClient bookId={bookId} />;
}


