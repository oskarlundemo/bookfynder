"use client"

import {useRouter} from "next/navigation";

export function AuthorDetails () {

    const router = useRouter();

    return (
        <footer className="absolute left-0 bottom-0 m-5">
            <h3 onClick={() => router.push('http://oskarlundemo.com')} className={'text-gray-400 cursor-pointer hover:underline text-2xl'}>Lundemo @ 2025</h3>
        </footer>
    )
}