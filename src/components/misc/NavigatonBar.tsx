"use client"
import Link from "next/link";
import "@/styles/NavigationBar.css"
import {useEffect, useState} from "react";
import { usePathname } from "next/navigation";


export const NavigationBar = () => {

    const pathname = usePathname();

    const [currentPage, setCurrentPage] = useState<string>('');

    useEffect(() => {
        console.log(pathname);


    }, [pathname]);


    return (
        <nav className={'navigation-bar flex w-full flex-row fixed bottom-0 py-10 px-5 flex-grow'}>

            <Link className={'w-1/2'} href="/books">
                <div className={`flex items-center flex-col ${pathname === '/books' ? 'active-page' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-160v-80h800v80H80Zm80-160v-320h80v320h-80Zm160 0v-480h80v480h-80Zm160 0v-480h80v480h-80Zm280 0L600-600l70-40 160 280-70 40Z"/></svg>
                    <span>Books</span>
                </div>
            </Link>

            <Link className={'w-1/2'} href="/books/add">
                <div className={`flex items-center flex-col ${pathname === '/books/add' ? 'active-page' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    <span>Add book</span>
                </div>
            </Link>

            <Link className={'w-1/2'} href="/statistics">
                <div className={`flex items-center flex-col ${pathname === '/statistics' ? 'active-page' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z"/></svg>
                    <span>Statistics</span>
                </div>
            </Link>

        </nav>
    )
}