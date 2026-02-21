"use client"

import { useEffect } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ResetForm } from "@/components/auth/ResetForm";
import { GalleryVerticalEnd } from "lucide-react";

export default function ResetPassword() {

    const supabase = createClient();
    const params = useSearchParams();
    const code = params.get("code");

    useEffect(() => {
        if (code) {
            supabase.auth.exchangeCodeForSession(code);
        }
    }, [code]);

    if (!code) {
        redirect("/auth/login");
    }

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
                        <ResetForm />
                    </div>
                </div>
            </div>

            <div className="bg-muted relative hidden lg:block" />
        </div>
    );
}
