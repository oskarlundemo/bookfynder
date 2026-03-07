"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
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

type Props = {
    title: string;
    bookData?: any[];
    numberOfBooks?: number;
    explanation?: string;
}

function getRandomColor() {

    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function ChartPieDonutText ({title, bookData, numberOfBooks} :Props) {


    const coloredData = bookData?.map((item, index) => {

        const fillColor = defaultColors[index] || getRandomColor();
        return {
            ...item,
            fill: item.fill || fillColor,
        };
    }) || [];

    return (
        <Card className="flex w-1/2 md:w-full flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Books in genres</CardTitle>
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
                        {coloredData?.map((item, index) => (
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
