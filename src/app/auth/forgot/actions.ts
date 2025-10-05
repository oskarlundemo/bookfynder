'use server'
import { createClient } from '@/lib/supabase/server'

export async function forgot(formData: FormData) {

    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
    }

    if (!data.email) {
        return { success: false, message: 'Missing email.' }
    }

    const {error} = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: 'http://localhost:3000/auth/reset-password',
    })

    if (error) {
        console.error('Forgot error:', error.message)
        return { success: false, message: error.message }
    }

    return { success: true, message: 'Reset link has been sent.' }
}