"use server"

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/auth/LoginForm"
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Login() {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
        redirect('/books')
    }

    return (
        <div className="grid w-full lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <svg
                                className="relative"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    height: "clamp(40px, 8vw, 64px)",
                                    width: "clamp(40px, 8vw, 64px)",
                                }}
                                viewBox="0 0 64 64"
                            >
                                <rect width="64" height="64" rx="12" fill="#0F172A" />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                                    fontSize="28"
                                    fontWeight="600"
                                    fill="#F9FAFB"
                                >
                                    bf.
                                </text>

                            </svg>
                        </div>
                        Bookfynder
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm/>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
            </div>
        </div>
    )
}

