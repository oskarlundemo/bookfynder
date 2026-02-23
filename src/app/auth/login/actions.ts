'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (!data.email || !data.password) {
        return { success: false, message: 'Missing email or password.' }
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error('Login error:', error.message)
        return { success: false, message: error.message }
    }

    return { success: true, message: 'Login successful.' }
}


export async function logout() {

    const supabase = await createClient();

    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error('Logout error:', error.message)
        redirect('/error')
    }

    // Redirect to login page after logout
    redirect('/auth/login')
}