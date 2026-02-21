import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SwipeCards from "@/components/explore/SwipeCards";
import Help from "@/components/explore/Help";
import AIDisclaimer from "@/components/explore/AIDisclaimer";



export default async function ExplorePage () {

    // auth check
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/auth/login')
    }

    if (error) {
        redirect('/error')
    }

    return (
        <main className="relative flex flex-grow flex-col">

            <SwipeCards
                userId={data?.user.id}
            />

            <Help/>

            <AIDisclaimer/>

        </main>
    );
}