"use client"

import Logo from "@/components/landing/Logo";
import {useEffect, useState} from "react";
import Image from "next/image";
import startImage from "../../../public/start.png";

export default function LandingHero() {

    const [mobile, setMobile] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 1200);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="flex flex-col mt-[60px] items-center bg-muted h-screen w-screen">

            <Logo/>

            {!mobile && (
                <div className="bg-white max-w-[1200px] shadow-2xl overflow-hidden w-full rounded-t-[30px] h-[600px]">
                    <Image
                        placeholder={"blur"}
                        src={startImage}
                        alt="Homescreen"
                        className="object-cover"
                        width={1200}
                        height={600}
                    />
                </div>
            )}

        </section>
    )
}