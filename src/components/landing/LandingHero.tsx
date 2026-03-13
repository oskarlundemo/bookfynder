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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);

        const handleResize = () => {
            setMobile(window.innerWidth < 1000);
            setRemovePictures(window.innerWidth < 1200);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section
            className="flex realtive flex-col justify-between items-center bg-muted min-h-screen h-screen w-screen">

            <Logo/>

            {mounted && !mobile && (
                <div className="relative">
                    {/* Background blobs */}
                    <div
                        className="absolute top-10 z-10- left-80 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[140px]"/>
                    <div
                        className="absolute top-4 z-10 translate-y-20 right-80 w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[140px]"/>

                    <section className={'flex flex-row z-10 relative'}>

                        <AnimatePresence>
                            {!removePictures && (
                                <motion.div
                                    initial={{opacity: 1}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0}}
                                    className="translate-x-[400px] translate-y-10 z-10 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px]"
                                >
                                    <Image
                                        src={startImage}
                                        alt="Homescreen"
                                        placeholder="blur"
                                        width={1200}
                                        height={860}
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            <motion.div
                                initial={{opacity: 1}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.5}}
                                className={`${removePictures ? 'mx-10' : 'mx-0'} z-30 p-2 bg-white m-w-[1000px] shadow-2xl overflow-hidden rounded-t-[30px]`}
                            >
                                <Image
                                    src={swipeImage}
                                    alt="Homescreen"
                                    placeholder="blur"
                                    width={1280}
                                    height={860}
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>


                        <AnimatePresence>
                            {!removePictures && (
                                <motion.div
                                    initial={{opacity: 1}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0}}
                                    className="-translate-x-[400px] translate-y-10 z-10 p-2 bg-white shadow-2xl overflow-hidden rounded-t-[30px]"
                                >
                                    <Image
                                        src={statsImage}
                                        alt="Homescreen"
                                        placeholder="blur"
                                        width={1280}
                                        height={860}
                                        className="object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </section>
                    {/* Card */}
                </div>
            )}


            <div className="absolute bottom-0 right-0 w-full overflow-hidden rotate-180 z-20">
                <svg
                    className="w-full h-24 filter drop-shadow-lg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,160L60,149.3C120,139,240,117,360,133.3C480,149,600,203,720,218.7C840,235,960,213,1080,186.7C1200,160,1320,128,1380,112L1440,96L1440,0L0,0Z"
                    ></path>
                </svg>
            </div>


        </section>
    )
}