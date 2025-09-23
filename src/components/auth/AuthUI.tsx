import * as React from "react";



interface Props {
    children: React.ReactNode;
}

export const AuthUI = ({children}:Props) => {

    const sectionStyles = "w-1/2 flex justify-center items-center h-screen";

    return (
        <main className="flex flex-row">
            <section style={{
                background: "var(--secondary)" }}
                     className={sectionStyles}>
                <h1>Left container</h1>
            </section>

            <section style={{ background: "var(--primary)" }} className={sectionStyles}>
                {children}
            </section>
        </main>
    )
}