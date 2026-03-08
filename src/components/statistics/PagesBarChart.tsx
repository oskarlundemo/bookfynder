"use client"

import {useEffect, useState} from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "black",
    },
} satisfies ChartConfig


type PeriodProps = {
    period: string;
    onClick?: () => void;
    selectedPeriod?: string;
}

export function PeriodSelector ({period, selectedPeriod, onClick}: PeriodProps) {
    return (
        <span
            className={`${period === selectedPeriod ? 'bg-gray-200 text-black' : 'bg-black text-white'} 
            cursor-pointer font-semibold  p-4 h-full w-full transition-colors duration-200`}
            onClick={onClick}>
            {period}
        </span>
    )
}

export function PagesBarChart ({}) {

    const [firstDate, setFirstDate] = useState<string>("")
    const [secondDate, setSecondDate] = useState<string>("")

    const [period, setPeriod] = useState<string>("7d");
    const [loading, setLoading] = useState<boolean>(true)
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const periods = [
        {
            period: "1y",
            apiEndPoint: "api/stats/pages-read/year"
        },
        {
            period: "1m",
            apiEndPoint: "api/stats/pages-read/month"
        },
        {
            period: "7d",
            apiEndPoint: "api/stats/pages-read/week"
        }
    ]

    useEffect(() => {
        fetchData("/api/stats/pages-read/week", period)
    }, []);

    const fetchData = async (apiUrl:string, clickedPeriod:string, init?: boolean) => {

        if (!apiUrl)
            return;

        setLoading(true);

        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        setLoading(false);
        const data = await res.json();
        setChartData(data.dataPoints);
        setFirstDate(data.dateStart);
        setSecondDate(data.dateEnd);
        setDescription(data.description || "No description");
    }

    return (
        <Card className={'relative'} >

            {loading && (
                <div className="absolute flex flex-col gap-4 items-center justify-center bg-gray-100/80 z-20 top-0 bottom-0 h-full w-full">
                    <Spinner className={'size-20'} stroke={"black"}/>
                </div>
            )}

            <CardHeader className="flex items-center flex-row justify-between">
                <div className={'flex flex-col'}>
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-5 w-40 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ) : (
                        <>
                            <CardTitle>{description}</CardTitle>
                            <CardDescription>
                                {firstDate} / {secondDate}
                            </CardDescription>
                        </>
                    )}
                </div>

                <div className={'flex h-full overflow-hidden rounded-2xl flex-row items-center justify-center'}>
                    {periods.map((p, index) => (
                        <PeriodSelector
                            key={index}
                            period={p.period}
                            selectedPeriod={period}
                            onClick={() => {
                                setPeriod(p.period);
                                fetchData(p.apiEndPoint, p.period);
                            }}
                        />
                    ))}
                </div>

            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Bar dataKey="pages" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => (value === 0 ? "" : value)}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* */}
            </CardFooter>
        </Card>
    )
}





