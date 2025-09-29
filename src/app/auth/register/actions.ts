'use server'

import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const formValues = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (!formValues.email || !formValues.password) {
        throw new Error(
            'Fields missing'
        )
    }

    const {error, data} = await supabase.auth.signUp(formValues)

    if (error) {
        console.error(error)
        redirect('/error')
    }

    const { data: insertData, error: InsertError } = await supabase
        .from('User')
        .insert([{ id: data?.user?.id, email: data?.user?.user_metadata?.email }])
        .select()

    if (InsertError) {
        console.error(error)
    }

    revalidatePath('/', 'layout')
    redirect('/books')
}
