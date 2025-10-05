"use server"
import {createClient} from "@/lib/supabase/server";


export async function resetPassword (formData: FormData) {
    const supabase = await createClient()

    const data = {
        password: formData.get('password') as string,
    }

    if (!data.password) {
        return { success: false, message: 'Missing password.' }
    }

    const { error } = await supabase.auth.updateUser({password: data.password})

    if (error) {
        console.error('Reset error:', error.message)
        return { success: false, message: error.message }
    }

    return { success: true, message: 'Password updated.' }
}
