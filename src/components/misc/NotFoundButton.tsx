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
                className="
                    flex flex-row gap-2 p-5 cursor-pointer
                    transform transition-transform duration-200 ease-in-out
                     hover:scale-105"
            >
                <House />
                <p>Take me home</p>
            </Button>
        </div>
    );
}
