import NotFoundButton from "@/components/misc/NotFoundButton"
import { createClient } from '@/lib/supabase/server'

type Props = {
    errorMessage?: string
}

export default async function NotFound({errorMessage}: Props) {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    return (
        <main className="flex flex-col m-auto items-center w-full h-full justify-center text-center px-4">

            <div className="flex flex-col h-full w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

                <div className="relative flex flex-col mb-6">
                    <h1 className="relative text-8xl  select-none">404</h1>
                    <h1 className="absolute text-8xl left-3  opacity-50 select-none">404</h1>
                </div>

                <h2 className="text-xl font-semibold mb-2">This page wandered off… </h2>

                <p className="text-gray-400 mb-6">
                    {errorMessage || "This page doesn’t exist — maybe it wandered off into a secret library."}
                </p>

                <NotFoundButton isLoggedIn={!!data?.user}/>

            </div>
        </main>
    );
}
