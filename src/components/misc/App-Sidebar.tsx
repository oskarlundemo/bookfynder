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
} from "@/components/ui/sidebar"

const items = [
    {
        title: "My books",
        url: "/books",
        icon: Library,
    },
    {
        title: "Explore",
        url: "/explore",
        icon: GalleryHorizontalEnd,
    },
    {
        title: "Add a new book",
        url: "/books/add",
        icon: Plus,
    },
    {
        title: "Statistics",
        url: "/statistics",
        icon: ChartPie,
    },
]

export function AppSidebar () {

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Librum</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={'p-5'}>
                <UserAvatar/>
            </SidebarFooter>
        </Sidebar>
    )
}