"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = () => {

    const pathname = usePathname();

    return (
        <nav className={'navigation-bar h-full my-5 gap-5 items-start flex w-full flex-col px-5 flex-grow'}>

            <Link className={'w-1/2'} href="/books">
                <div className={`flex justify-start gap-2 flex-row items-center flex-col ${pathname === '/books' ? 'underline!' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-160v-80h800v80H80Zm80-160v-320h80v320h-80Zm160 0v-480h80v480h-80Zm160 0v-480h80v480h-80Zm280 0L600-600l70-40 160 280-70 40Z"/></svg>
                    <span>Books</span>
                </div>
            </Link>

            <Link className={'w-1/2'} href="/books/add">
                <div className={`flex justify-start gap-2 flex-row items-center flex-col ${pathname === '/books/add' ? 'underline!' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    <span>Add book</span>
                </div>
            </Link>

            <Link className={'w-1/2'} href="/explore">
                <div className={`flex justify-start gap-2 flex-row items-center flex-col ${pathname === '/explore' ? 'underline' : ''}`}>
                    <svg className={'rotate-180'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m608-368 46-166-142-98-46 166 142 98ZM160-207l-33-16q-31-13-42-44.5t3-62.5l72-156v279Zm160 87q-33 0-56.5-24T240-201v-239l107 294q3 7 5 13.5t7 12.5h-39Zm206-5q-31 11-62-3t-42-45L245-662q-11-31 3-61.5t45-41.5l301-110q31-11 61.5 3t41.5 45l178 489q11 31-3 61.5T827-235L526-125Zm-28-75 302-110-179-490-301 110 178 490Zm62-300Z"/></svg>                    <span>Explore</span>
                </div>
            </Link>

            <Link className={'w-1/2'} href="/statistics">
                <div className={`flex justify-start gap-2 flex-row items-center flex-col ${pathname === '/statistics' ? 'underline!' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z"/></svg>
                    <span>Statistics</span>
                </div>
            </Link>

        </nav>
    )
}