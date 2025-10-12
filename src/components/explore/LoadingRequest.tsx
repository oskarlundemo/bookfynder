

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
export function LoadingRequest () {
    return (
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Processing your recommendations</EmptyTitle>
                <EmptyDescription>
                    Please wait while Open AI process your recommendations. Do not refresh the page.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
            </EmptyContent>
        </Empty>
    )
}