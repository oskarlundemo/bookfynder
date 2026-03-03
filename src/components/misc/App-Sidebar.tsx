"use client"

import {logout, deleteAccount} from "@/app/auth/login/actions";

import {GalleryHorizontalEnd, Library, ChartPie, Plus, LogOut, Settings, Trash} from "lucide-react"
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
} from "@/components/ui/sidebar"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

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

    const [usernameInput, setUsernameInput] = useState<string>("");
    const [usernameMatches, setUsernameMatches] = useState<boolean>(false);

    useEffect(() => {
        const matches = usernameInput.trim() === username;
        setUsernameMatches(matches);
    }, [usernameInput, username]);

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
                                    <LogOut/>
                                    <span>Sign out</span>
                                </DropdownMenuItem>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem
                                            onSelect={(e) => e.preventDefault()} // 🔥 IMPORTANT
                                            className="text-red-500"
                                        >
                                            <Trash className="h-4 w-4" />
                                            Delete Account
                                        </DropdownMenuItem>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete
                                                your account and remove your data from our servers.
                                            </DialogDescription>

                                            <p className={'text-gray-400'}>Type: "{username}" to confirm</p>
                                            <Input
                                                value={usernameInput}
                                                onChange={(e) => setUsernameInput(e.target.value)}
                                            />

                                            <Button
                                                disabled={!usernameMatches}
                                                type="button"
                                                onClick={deleteAccount}
                                            >
                                                Delete
                                            </Button>

                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}