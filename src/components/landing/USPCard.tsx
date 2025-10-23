import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


type Props = {
    title: string,
    description: string,

    content: React.ReactNode,
    cardFooter: React.ReactNode,
}

export function USPCard ({title, description, cardFooter, content}: Props) {
    return (
        <Card className="w-full justify-between max-w-sm">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>

                {content}

            </CardContent>
            <CardFooter className="flex-col gap-2">

                {cardFooter}

            </CardFooter>
        </Card>
    )
}
