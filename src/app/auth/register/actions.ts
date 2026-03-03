'use server'

import {createClient} from "@/lib/supabase/server";

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (!data.email || !data.password) {
        return { success: false, message: 'Missing email or password.' }
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        console.error('Register error:', error)
        if (
            error.name === 'AuthUnknownError' ||
            error.message?.includes('Unexpected token')
        ) {
            return {
                success: false,
                message:
                    error.message || "Unable to create account right now. Please try again later.",
            }
        }
    }

    return { success: true, message: 'Register successful.' }
}
