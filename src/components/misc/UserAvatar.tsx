"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

export const UserAvatar = ({}) => {

    return (
        <Avatar>
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback className="flex items-center justify-center bg-muted text-muted-foreground">
                <User className="w-4 h-4 aspect-square" />
            </AvatarFallback>
        </Avatar>
    )
}