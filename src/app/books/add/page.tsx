"use server"

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import "@/styles/Book.css"
import AddBookClient from "@/components/books/AddBookClient"

export default async function AddBookPage () {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return <AddBookClient user={data.user} />;
}


