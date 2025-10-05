'use server'

import {createClient} from "@/lib/supabase/server";

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    if (!data.email || !data.password) {
        return { success: false, message: 'Missing email or password.' }
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        console.error('Register error:', error.message)
        return { success: false, message: error.message }
    }

    return { success: true, message: 'Register successful.' }
}
