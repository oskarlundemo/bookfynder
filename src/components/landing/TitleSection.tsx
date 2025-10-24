"use client"

import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation";
import RotatingWords from "@/components/landing/RotatingWords"

export default function TitleSection () {

    const router = useRouter();

    return (
        <section className="flex flex-col items-center p-20 w-full">

            <h1 className={'text-9xl text-shadow-stone-900 font-semibold'}>Librum</h1>
            <h2>alpha version 1.0</h2>

            <RotatingWords/>

            <div className="flex flex-row gap-5 my-4 items-center">

                <Button
                    onClick={() => router.push("/auth/login")}
                    className="bg-white cursor-pointer text-black border border-black hover:bg-gray-100 transform transition-transform duration-200 hover:scale-105"
                >
                    Sign In
                </Button>


                <Button
                    onClick={() => router.push("/auth/register")}
                    className="bg-blue-600 cursor-pointer text-white hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105"
                >
                    Sign Up
                </Button>
            </div>


        </section>
    )
}