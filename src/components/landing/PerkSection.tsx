"use client";

import { Search, ChartColumnIncreasing, HandCoins } from 'lucide-react';
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
            title: "Free",
            subTitle: "Track your reading without subscriptions or hidden fees.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-yellow-400">
                    <HandCoins className="w-6 h-6 text-yellow-400" />
                </div>
            )
        },
        {
            title: "Track",
            subTitle: "Visualize your progress and stay consistent every week.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-indigo-500">
                    <ChartColumnIncreasing className="w-6 h-6 text-indigo-500" />
                </div>
            )
        },
        {
            title: "Explore",
            subTitle: "Discover new books, authors, and reading trends personalized for you.",
            color: "white",
            icon: (
                <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-purple-500">
                    <Search className="w-6 h-6 text-purple-500" />
                </div>
            )
        }
    ];

    return (
        <section className="flex flex-col justify-center items-center w-full py-10">
            {isMobile ? (
                <div className="flex flex-col rounded-2xl  mx-5! gap-4">
                    {perks.map((perk, i) => (
                        <div key={i} className="flex flex-col items-start justify-center gap-4 p-4 border-b border-gray-200">

                            <div className={'flex flex-row-reverse gap-4 justify-start items-center'}>
                                <h3 className="font-semibold text-left text-lg">{perk.title}</h3>
                                {perk.icon}
                            </div>

                            <p className="text-gray-600 text-left text-sm">{perk.subTitle}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-3 items-center justify-center gap-6 w-full max-w-[800px]">
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
            className="rounded-xl m-auto aspect-square max-h-[200px] shadow-md p-5 flex flex-col gap-5 border-2 border-gray-200/20"
        >
            <div className="flex flex-row gap-4 items-center justify-start">
                {icon && icon}
                <h3 className="font-semibold" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
                    {title}
                </h3>
            </div>
            {subTitle && (
                <p className="text-gray-600 text-left" style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>
                    {subTitle}
                </p>
            )}
        </article>
    )
}