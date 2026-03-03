"use client"

import { useEffect } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { ResetForm } from "@/components/auth/ResetForm";
import { GalleryVerticalEnd } from "lucide-react";
import {router} from "next/client";

export default function ResetPassword() {

    const searchParams = useSearchParams();
    const accessToken = searchParams.get("access_token") || "";
    const router = useRouter();

    useEffect(() => {
        if (!accessToken) {
            router.push("/auth/login");
        }
    }, [accessToken, router]);

    return (
        <div className="grid w-full lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <a href="/" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Bookfynder
                </a>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <ResetForm/>
                    </div>
                </div>
            </div>

            <div className="bg-muted relative hidden lg:block" />
        </div>
    );
}
