"use client"

import {useRouter} from "next/navigation";

export function LandingHeader () {

    const router = useRouter();

    return (
        <header className="fixed top-0 w-full">

            <nav style={{maxWidth: 'var(--max-width)'}} className={'ml-auto'}>

                <ul className={'flex flex-row justify-end gap-5 m-5'}>
                    <li onClick={() => router.push('/auth/login')} className={'flex text-2xl cursor-pointer'}>
                        Login
                    </li>

                    <li onClick={() => router.push('/auth/register')} className={'flex text-2xl cursor-pointer'}>
                        Register
                    </li>
                </ul>
            </nav>
        </header>
    )
}