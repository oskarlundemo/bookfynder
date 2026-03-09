"use client"

import {useRouter} from "next/navigation";

export function AuthorDetails () {

    const router = useRouter();

    return (
        <footer className="text-center py-20 my-10">
            <p className="text-black/90 hover:underline cursor-pointer text-2xl mt-1">
               <span  onClick={() => router.push('http://www.oskarlundemo.com')}>LUNDEMO © 2026</span>
            </p>
        </footer>
    );
}