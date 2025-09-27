import * as React from "react";
import "@/styles/Auth.css";
import "@/app/globals.css"

interface Props {
    children: React.ReactNode;
}

export const AuthUI = ({children}:Props) => {

    return (

        <main className="h-screen flex flex-row">
            <section
                className={'left-section'}>
            </section>

            <section
                className={'right-section'}>
                {children}
            </section>
        </main>
    )
}