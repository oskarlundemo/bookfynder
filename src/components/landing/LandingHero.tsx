"use client"

import Logo from "@/components/landing/Logo";
import {useEffect, useState} from "react";
import Image from "next/image";
import startImage from "../../../public/start.png";
import statsImage from "../../../public/stats.png";
import swipeImage from "../../../public/bookexplore.png";
import {AnimatePresence, motion} from "framer-motion";

export default function LandingHero() {

    const [mobile, setMobile] = useState<boolean>(false);
    const [removePictures, setRemovePictures] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 1000);
            setRemovePictures(window.innerWidth < 1200);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="flex realtive flex-col justify-between items-center bg-muted min-h-screen h-screen w-screen">

            <Logo/>

            {!mobile && (
                <div className="relative">

                    {/* Background blobs */}
                    <div className="absolute top-10 z-10-left-80 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[140px]" />
                    <div className="absolute top-4 z-10 translate-y-20 -right-60 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[140px]" />

                    <section className={'flex flex-row z-10 relative'}>

                        <AnimatePresence>
                            {!removePictures && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="translate-x-[400px] translate-y-10 z-10 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px]"
                                >
                                    <Image
                                        src={startImage}
                                        alt="Homescreen"
                                        placeholder="blur"
                                        width={1000}
                                        height={600}
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={`w-[1000px] z-20 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px]`}>
                            <Image
                                src={swipeImage}
                                alt="Homescreen"
                                placeholder="blur"
                                width={1000}
                                height={1000}
                                className={`object-cover z-20`}
                            />
                        </div>


                        <AnimatePresence>
                            {!removePictures && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="-translate-x-[400px] translate-y-10 z-10 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px]"
                                >
                                    <Image
                                        src={statsImage}
                                        alt="Homescreen"
                                        placeholder="blur"
                                        width={1000}
                                        height={600}
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </section>
                    {/* Card */}
                </div>
            )}

        </section>
    )
}