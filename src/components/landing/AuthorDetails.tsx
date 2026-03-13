"use client"

import {useRouter} from "next/navigation";

export function AuthorDetails () {

    const router = useRouter();

    return (
        <footer className="text-center py-20 my-10">
            <p className="text-white text-2xl mt-1 underline decoration-wavy decoration-white underline-offset-4 hover:decoration-indigo-500 cursor-pointer">            <span onClick={() => router.push('http://www.oskarlundemo.com')}>
            LUNDEMO  2026
            </span>
            </p>
        </footer>
    );
}