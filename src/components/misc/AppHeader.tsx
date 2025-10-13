"use client"

import {ShadNav} from "@/components/misc/ShadNav";
import { usePathname } from "next/navigation";
import {useEffect, useState} from "react";


export default function AppHeader() {

    const pathname = usePathname();
    const [title, setTitle] = useState<string>("")

    useEffect(() => {

        if (pathname === "/books") {
            setTitle("Books")
        } else if (pathname === "/statistics") {
            setTitle("Statistics")
        } else if (pathname === "/explore") {
            setTitle("Explore")
        } else
            setTitle("Default")

    }, [pathname]);

    return (
        <header
            style={{maxWidth: 'var(--max-width)'}}
            className="flex z-5 flex-row justify-between mx-auto w-full  items-center sticky top-0 p-5
               bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm"
        >
            <h1 className="text-3xl font-bold">{title}</h1>
            <ShadNav />
        </header>
    )
}