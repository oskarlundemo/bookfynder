import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "react-hot-toast"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/misc/App-Sidebar"
import { createClient } from "@/lib/supabase/server";


export const metadata: Metadata = {
    title: "Bookfynder",
    description: "This is my book finding app.",
    authors: [{ name: "Oskar Lundemo", url: "https://oskarlundemo.com" }],
    icons: {
        icon: "fav.svg",
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    // auth check
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <html lang="en">
            <body className="w-full h-full">
                    <SidebarProvider>
                          {data?.user ? (
                              <>
                                  <AppSidebar username={data.user.email ?? "Email missing"} />
                                  <div className="flex h-screen w-screen">
                                      <SidebarTrigger />
                                      {children}
                                   </div>
                                </>
                         ) : (
                               <div className="flex h-screen w-screen">
                                   {children}
                               </div>
                            )}
                   </SidebarProvider>

                    <Toaster position="top-right" />
            </body>
        </html>
    );
}
