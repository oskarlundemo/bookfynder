"use client";
import { useRouter } from "next/navigation";

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

import {Button} from "@/components/ui/button"

type Props = {
    title: string;
    description: string;
}

export default function EmptyBookFolder ({ title, description }: Props) {

    const router = useRouter();

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    📚
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={() => router.push("/books/add")}>Add book</Button>
            </EmptyContent>
        </Empty>
    )
}