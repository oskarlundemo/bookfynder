"use client";

import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    isLoggedIn: boolean;
};

export default function NotFoundButton({ isLoggedIn }: Props) {

    const router = useRouter();

    return (
        <div className="flex flex-row">
            <Button
                onClick={() => router.push(isLoggedIn ? "/books" : "/")}
                className="flex cursor-pointer hover:scale-105 flex-row p-5 gap-2"
            >
                <House />
                <p>Take me home</p>
            </Button>
        </div>
    );
}
