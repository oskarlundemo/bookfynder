import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/login/actions'

export default async function BooksPage() {

    // auth check
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    if (data?.user) {
        console.log('user', data?.user)
    }

    return (
        <main className="flex flex-col h-full ">
            <h1>Welcome to your bookshelf</h1>
            <button onClick={logout}>Log out</button>
        </main>
    );
}