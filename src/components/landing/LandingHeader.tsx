"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export function LandingHeader () {

    const router = useRouter();

    return (
        <header className="fixed top-0 z-20 w-full rounded-b-2xl flex items-center bg-white/30 backdrop-blur-md border-b border-white/20">

            <nav style={{maxWidth: 'var(--max-width)'}} className={' rounded-b-2xl   w-full mx-auto max-w-[1200px]'}>

                <ul className={'flex flex-row justify-end gap-5 m-5'}>

                    <Button
                        className={'bg-transparent hover:bg-transparent text-black cursor-pointer'}
                        onClick={() => {
                            router.push('/auth/login')
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        className={'cursor-pointer'}
                        onClick={() => {
                            router.push('/auth/register')
                        }}
                    >
                        Register
                    </Button>
                </ul>
            </nav>
        </header>
    )
}