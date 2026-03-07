"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
import {Spinner} from "@/components/ui/spinner";
import {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

export const description = "A bar chart with a custom label"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-2)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig


type Props = {
    data: any[];
}

export function BooksReadPerMonthWidget({data}:Props) {

    const year = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number>(year);
    const [loading, setLoading] = useState<boolean>(false);


    const handleDataFetch = () => {




    }


    return (
        <Card  className="relative w-1/2 md:w-full">

            <CardHeader className="flex flex-row items-center justify-between">

                <div className="flex flex-col">
                    <CardTitle>Books read</CardTitle>
                    <CardDescription>January - December {selectedYear}</CardDescription>
                </div>

                <div className="flex flex-row gap-4 items-center justify-center bg-black rounded-2xl p-3 text-white">
                    <ChevronLeft className={'cursor-pointer hover:scale-110 transition-all duration-200'}/>
                    <span>{selectedYear}</span>
                    <ChevronRight className={'cursor-pointer hover:scale-110 transition-all duration-200'}/>
                </div>

            </CardHeader>
            <CardContent className="relative">

                {loading && (
                    <div className="absolute flex flex-col gap-4 items-center justify-center bg-gray-100/80 z-20 top-0 bottom-0 h-full w-full">
                        <Spinner className={'size-20'} stroke={"black"}/>
                    </div>
                )}

                <ChartContainer config={chartConfig}>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ right: 16 }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0,3)}
                        />

                        <XAxis type="number" hide={true} />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />

                        <Bar
                            dataKey="books"
                            fill="black"
                            radius={4}
                        >
                            <LabelList
                                dataKey="books"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => (value === 0 ? "" : value)}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
            </CardFooter>
        </Card>
    )
}

