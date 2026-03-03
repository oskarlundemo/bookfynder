'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {prisma} from "../../../../prisma/prisma";

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
        console.error('Login error:', error)
        
        if (
            error.name === 'AuthUnknownError' ||
            error.message?.includes('Unexpected token')
        ) {
            return {
                success: false,
                message:
                    'The authentication service is temporarily unavailable. Please try again in a few moments.',
            }
        } else {
            return {
                success: false,
                message:
                    error.message || 'Unable to sign in right now. Please try again later.',
            }
        }
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

export async function deleteAccount() {

    const supabase = await createClient();
    // const { error } = await supabase.auth.signOut()

    const {data: { user },} = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase.auth.admin.deleteUser(user.id)

    if (error) {
        console.error('Delete user failed:', error)
        throw new Error("Failed to delete account")
    }

    await prisma.user.delete({
        where: {
            id: user.id,
        }
    })

    redirect('/')
}