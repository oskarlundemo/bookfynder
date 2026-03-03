"use server"
import {createClient} from "@/lib/supabase/server";

export async function resetPassword (formData: FormData) {

    const supabase = await createClient()

    const data = {
        password: formData.get('password') as string,
        confirmed: formData.get('confirmPassword') as string,
        token: formData.get('token') as string,
    }

    if (data.password.length > 100 ||  data.confirmed.length > 100) {
        return { success: false, message: 'Passwords exceed the allowed length, no longer than 100 characters.' }
    }

    if (data.password !== data.confirmed) {
        return { success: false, message: 'Passwords do not match' }
    }

    if (!data.password || !data.confirmed) {
        return { success: false, message: 'Missing password.' }
    }

    if (data.password.length > 100 ||  data.confirmed.length > 100) {
        return { success: false, message: 'Passwords exceed the allowed length, no longer than 100 characters.' }
    }

    // @ts-ignore
    const { error } = await supabase.auth.updateUser({accessToken: data.token, password: data.password})

    if (error) {
        console.error('Reset error:', error.message)
        return { success: false, message: error.message }
    }

    await supabase.auth.signOut()

    return { success: true, message: 'Password updated.' }
}
