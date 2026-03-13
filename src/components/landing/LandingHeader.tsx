"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export function LandingHeader () {

    const router = useRouter();

    return (
        <header className="fixed top-0 h-[60px] mr-[10px]! z-50 w-full rounded-b-2xl flex items-center bg-white/30 backdrop-blur-md border-b border-white/20">

            <nav style={{maxWidth: 'var(--max-width)'}} className={'flex flex-row justify-between rounded-b-2xl w-full mx-auto max-w-[1200px]'}>

                <div className="flex items-center">
                    <Image className={'aspect-square my-auto mx-5'} width={20} height={20} src={'/icon.png'} alt={'logo'}/>
                    <h1 className={'font-semibold'}>Bookfynder</h1>
                </div>

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