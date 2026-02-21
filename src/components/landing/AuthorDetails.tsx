"use client"

import {useRouter} from "next/navigation";

export function AuthorDetails () {

    const router = useRouter();

    return (
        <footer className="text-center my-10">
            <p className="text-gray-500 text-sm mt-1">
                This alpha build is only for testing and deployment verification | <span onClick={() => router.push('http://www.oskarlundemo.com')}>Lundemo 2025</span>
            </p>
        </footer>
    );
}