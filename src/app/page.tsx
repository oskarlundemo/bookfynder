import { createClient } from '@/lib/supabase/server'
import {redirect} from "next/navigation";
import {LandingHeader} from "@/components/landing/LandingHeader"
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

            <div className="flex flex-col h-full w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

                <div className="relative flex flex-row items-center gap-5 mb-6">

                    <svg
                        className="drop-shadow-2xl"
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                    >
                        <rect width="64" height="64" rx="12" fill="#0F172A" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                            fontSize="28"
                            fontWeight="600"
                            fill="#F9FAFB"
                        >
                            bf.
                        </text>
                    </svg>

                    <h1 className="relative text-8xl select-none text-gray-300">Bookfynder</h1>
                    <h1 className="text-8xl absolute select-none left-29">Bookfynder</h1>

                    <span className={'absolute right-1 top-0'}>1.0 alpha</span>

                </div>

                <div className="relative flex flex-col gap-5">
                    <h2 className={'text-3xl'}>Books that match your <strong>vibe</strong></h2>
                </div>

            </div>

            <AuthorDetails />

        </main>
    );
}