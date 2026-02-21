"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import LandingText from "@/components/misc/LandingText";

const chartData = [
    { genre: "Fiction", count: 12, fill: "var(--chart-1)" },
    { genre: "Fantasy", count: 8, fill: "var(--chart-2)" },
    { genre: "Mystery", count: 5, fill: "var(--chart-3)" },
    { genre: "Non-Fiction", count: 7, fill: "var(--chart-4)" },
    { genre: "Romance", count: 4, fill: "var(--chart-5)" },
    { genre: "Sci-Fi", count: 6, fill: "var(--chart-6)" },
]

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

export function MockChart ({}) {

    return (
            <div className="flex w-full h-[500px] flex-col-reverse md:flex-row">

                <LandingText
                    title={"Watch your reading come to life with charts"}
                    breadText={
                        <>
                            <p className="text-left text-lg leading-relaxed">
                                Watch your progress come to life with the help of different charts! The UI is built using the beautiful UI-library {' '}
                                <a
                                    className="border-b-4 border-black"
                                    href="https://ui.shadcn.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    shadCn
                                </a>
                                .
                            </p>
                        </>
                    }
                    number={3}
                />

                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="genre"
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
                                                    42
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Books
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
    )
}

