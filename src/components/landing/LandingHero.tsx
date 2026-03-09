"use client"

import Logo from "@/components/landing/Logo";
import {useEffect, useState} from "react";
import Image from "next/image";
import startImage from "../../../public/start.png";


export default function LandingHero() {

    const [mobile, setMobile] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 1200);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="flex realtive flex-col mt-[60px] items-center bg-muted h-screen w-screen">

            <Logo/>

            {!mobile && (
                <div className="relative max-w-[1200px]">

                    {/* Background blobs */}
                    <div className="absolute top-10 z-10-left-80 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[140px]" />
                    <div className="absolute top-4 z-10 translate-y-20 -right-60 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[140px]" />

                    {/* Card */}
                    <div className="relative w-[1000px] z-20 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px] h-[570px]">
                        <Image
                            src={startImage}
                            alt="Homescreen"
                            placeholder="blur"
                            width={1000}
                            height={600}
                            className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
                            onLoadingComplete={() => setLoaded(true)}
                        />
                    </div>

                </div>
            )}

        </section>
    )
}