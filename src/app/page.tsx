import { createClient } from '@/lib/supabase/server'
import {redirect} from "next/navigation";
import {LandingHeader} from "@/components/landing/LandingHeader"
import MockDeck from '@/components/landing/MockDeck';
import {AuthorDetails} from "@/components/landing/AuthorDetails";


export default async function Home ({}) {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
        redirect('/books')
    }

    return (
        <main className="flex flex-col m-auto items-center w-full h-full justify-center text-center px-4">

            <LandingHeader/>

            <AuthorDetails />

            <div className="flex flex-col h-full w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

                <div className="relative flex flex-col mb-6">
                    <h1 className="relative text-8xl  select-none">Bookfynder <span className={'text-secondary-foreground'}>(alpha)</span></h1>
                </div>

                <div className="relative flex flex-col gap-5">
                    <h2 className={'text-3xl'}>Books that match your <strong>vibe</strong></h2>
                </div>

            </div>
        </main>
    );
}