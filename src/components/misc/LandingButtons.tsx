'use client'

import {Button} from "@/components/ui/button";
import { useRouter } from 'next/navigation'


export default function LandingButtons() {

    const router = useRouter()

    return (
        <nav className="flex w-full flex-row justify-around gap-5">
            <Button onClick={() => router.push('/auth/login')} >Login</Button>
            <Button onClick={() => router.push('/auth/register')}>Register</Button>
        </nav>
    )
}