"use client"

import { GalleryHorizontalEnd, Library, ChartPie, Plus } from "lucide-react"
import {UserAvatar} from "@/components/misc/UserAvatar"


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    useSidebar
} from "@/components/ui/sidebar"



import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
    {
        title: "My books",
        url: "/books",
        icon: Library,
        tooltip: "View and manage your personal library",
    },
    {
        title: "Explore",
        url: "/explore",
        icon: GalleryHorizontalEnd,
        tooltip: "Discover new books and recommendations",
    },
    {
        title: "Add a new book",
        url: "/books/add",
        icon: Plus,
        tooltip: "Add a book to your collection",
    },
    {
        title: "Statistics",
        url: "/statistics",
        icon: ChartPie,
        tooltip: "Track your reading stats and progress",
    },
]


export function AppSidebar () {

    const {state} = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Librum</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </TooltipTrigger>

                                    {state === 'collapsed' && (
                                        <TooltipContent side="right">
                                            <p>{item.tooltip}</p>
                                        </TooltipContent>
                                    )}

                                </Tooltip>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={'overflow-hidden'}>
                <UserAvatar/>
            </SidebarFooter>
        </Sidebar>
    )
}