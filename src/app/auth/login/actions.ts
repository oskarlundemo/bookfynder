'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login (formData: FormData) {

    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (!data.email || !data.password) {
        throw new Error(
            'Fields missing'
        )
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/books')
}


export async function logout() {

    const supabase = await createClient()

    // Supabase sign out
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Logout error:', error.message)
        redirect('/error')
    }

    // Redirect to login page after logout
    redirect('/auth/login')
}