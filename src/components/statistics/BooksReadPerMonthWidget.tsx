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
import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";

const mockData = [
    { month: "January", books: 1 },
    { month: "February", books: 2 },
    { month: "March", books: 3 },
    { month: "April", books: 1 },
    { month: "May", books: 0 },
    { month: "June", books: 2 },
    { month: "July", books: 4 },
    { month: "August", books: 3 },
    { month: "September", books: 2 },
    { month: "October", books: 1 },
    { month: "November", books: 2 },
    { month: "December", books: 5 }
];

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
        color: "var(--chart-6)",
    },
} satisfies ChartConfig


export function BooksReadPerMonthWidget() {

    const year = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number>(year);
    const [loading, setLoading] = useState<boolean>(false);
    const [barData, setBarData] = useState<any>([]);
    const [description, setDescription] = useState<string>("");

    const [error, setError] = useState<boolean>(false);

    const handleDataFetch = async () => {

        setLoading(true);
        setError(false);

        try {
            const res = await fetch(`api/stats/books-read?year=${selectedYear}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            } )

            if (!res.ok) {
                setLoading(false);
                setError(true);
                return;
            }

            const data = await res.json();
            setBarData(data.dataPoints);
            setDescription(data.description);

        } catch (eror) {
            setError(true);
            console.error("An error occured when loading the data" + eror);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleDataFetch()
    }, [selectedYear]);

    return (
        <Card className="relative w-1/2 md:w-full">

            {error && (
                <div className="absolute flex flex-col gap-4 items-center mr-10 justify-center bg-gray-100/80 z-20 top-0 bottom-0 h-full w-full">
                    <p>An error occurred! Please try again or contact support</p>
                    <Button className={'cursor-pointer'} onClick={() => handleDataFetch()} type={"button"}>Try again</Button>
                </div>
            )}

            {loading && (
                <div className="absolute flex flex-col gap-4 items-center mr-10 justify-center bg-gray-100/80 z-20 top-0 bottom-0 h-full w-full">
                    <Spinner className={'size-20'} stroke={"black"}/>
                </div>
            )}

            <CardHeader className="flex flex-row items-center justify-between">

                <div className="flex flex-col">
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ) : (
                        <>
                        <CardTitle>Books read</CardTitle>
                        <CardDescription>January - December {selectedYear}</CardDescription>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4 bg-black rounded-2xl p-2 text-white">

                    <Button variant="ghost" size="icon"
                            onClick={() => setSelectedYear(y => y - 1)}>
                        <ChevronLeft />
                    </Button>

                    <span className="px-2">{selectedYear}</span>

                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={selectedYear >= year}
                        onClick={() => setSelectedYear(y => y + 1)}
                    >
                        <ChevronRight />
                    </Button>

                </div>

            </CardHeader>
            <CardContent className="relative overflow-hidden">

                <ChartContainer config={chartConfig}>
                    <BarChart
                        layout="vertical"
                        data={barData}
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
                            fill={"var(--chart-2)"}
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

