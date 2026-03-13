"use client";

import { Search, ChartColumnIncreasing, HandCoins, Hourglass } from 'lucide-react';
import { useEffect, useState } from "react";

export default function PerkSection() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 800);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const perks = [
        {
            title: "Save Time Finding Your Next Book",
            subTitle: "Skip endless searching. Get smart suggestions and quickly find your next great read based on your interests.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-green-400">
                    <Hourglass className="w-6 h-6 text-green-400" />
                </div>
            )
        },
        {
            title: "Completely Free to Use",
            subTitle: "Track your reading, organize your library, and explore new books without subscriptions or hidden fees.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-yellow-400">
                    <HandCoins className="w-6 h-6 text-yellow-400" />
                </div>
            )
        },
        {
            title: "Track Your Reading Progress",
            subTitle: "Monitor the books you’ve read, track your progress, and build consistent reading habits over time.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-indigo-500">
                    <ChartColumnIncreasing className="w-6 h-6 text-indigo-500" />
                </div>
            )
        },
        {
            title: "Discover Books You'll Love",
            subTitle: "Explore new titles, trending books, and authors tailored to your reading taste.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-purple-500">
                    <Search className="w-6 h-6 text-purple-500" />
                </div>
            )
        }
    ];

    return (
        <section className="flex flex-col justify-center items-center w-full py-20">
            {isMobile ? (
                <div className="flex flex-col rounded-2xl  mx-5! gap-10">
                    {perks.map((perk, i) => (
                        <div key={i} className="flex flex-col items-start justify-center gap-4 p-4 rounded-2xl shadow-sm">

                            <div className={'flex flex-col-reverse gap-4 justify-center w-full items-center'}>
                                <h3 className="font-semibold text-left text-lg">{perk.title}</h3>
                                {perk.icon}
                            </div>

                            <p className="text-gray-600 text-center text-sm">{perk.subTitle}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-4 items-center justify-center gap-10 w-full max-w-[1000px]">
                    {perks.map((perk, i) => (
                        <Perk
                            key={i}
                            title={perk.title}
                            subTitle={perk.subTitle}
                            color={perk.color}
                            icon={perk.icon}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

type PerkProps = {
    icon?: any,
    title?: string,
    subTitle?: string,
    color?: string,
}


function Perk({ title, icon, subTitle, color }: PerkProps) {
    return (
        <article
            style={{ backgroundColor: color }}
            className="m-auto flex justify-around aspect-square max-h-[200px] flex-col items-center rounded-xl border border-gray-200/20 p-5 text-center shadow-md"
        >
            <div className="flex flex-col items-center gap-3">
                {icon}

                <h3
                    className="font-semibold leading-tight"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                >
                    {title}
                </h3>
            </div>

            {subTitle && (
                <p
                    className="mt-2 mx-auto text-center text-gray-600 leading-snug"
                    style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)" }}
                >
                    {subTitle}
                </p>
            )}
        </article>
    );
}
