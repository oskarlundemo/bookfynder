"use client"

import {logout} from "@/app/auth/login/actions";

import { GalleryHorizontalEnd, Library, ChartPie, Plus } from "lucide-react"
import {UserAvatar} from "@/components/misc/UserAvatar"
import { User } from "lucide-react"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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


type Props = {
    username: string
}

export function AppSidebar ({username}:Props) {

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Bookfynder</SidebarGroupLabel>
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

                                    <TooltipContent side="right">
                                        <p>{item.tooltip}</p>
                                    </TooltipContent>

                                </Tooltip>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User className="w-4 h-4 aspect-square" />
                                    <p>{username}</p>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem onClick={logout}>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}