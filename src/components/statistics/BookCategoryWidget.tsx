"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {Spinner} from "@/components/ui/spinner";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig


const defaultColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
]

function getRandomColor() {

    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function BookCategoryWidget () {


    const [loading, setLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [bookData, setBookData] = useState<any>([]);
    const [numberOfBooks, setNumberOfBooks] = useState<number>(0);

    const coloredData = bookData?.map((item:any, index:number) => {
        const fillColor = defaultColors[index] || getRandomColor();
        return {
            ...item,
            fill: item.fill || fillColor,
        };
    }) || [];


    const fetchData = async () => {

        setLoading(true);

        const res = await fetch("api/stats/book-category", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!res.ok) {
            console.error("An error occured while fetching data")
            setLoading(false);
            return;
        }


        const data = await res.json();
        setBookData(data.dataPoints);
        setDescription(data.description);
        setNumberOfBooks(data.numberOfBooks);



        console.log(data);

        setLoading(false);
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Card className="relative flex w-1/2 md:w-full flex-col">

            {loading && (
                <div className="absolute flex flex-col gap-4 items-center mr-10 justify-center bg-gray-100/80 z-20 top-0 bottom-0 h-full w-full">
                    <Spinner className={'size-20'} stroke={"black"}/>
                </div>
            )}

            <CardHeader className="items-center pb-0">
                {loading ? (
                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ) : (
                    <>
                        <CardTitle>Books read</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={coloredData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {numberOfBooks}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {title}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

                {coloredData?.length > 0 && (
                    <CardFooter className="flex my-auto flex-wrap gap-4">
                        {coloredData?.map((item:any, index:number) => (
                            <div className={'flex text-sm flex-row gap-2 items-center justify-center'} key={index}>
                                <p>{item.name ? item.name : 'No category'} <span className={'text-gray-400'}>({item.value})</span></p>
                                <div style={{background: item.fill}} className={"rounded h-5 w-5"}/>
                            </div>
                        ))}
                    </CardFooter>
                )}

            </CardContent>
        </Card>
    )
}
