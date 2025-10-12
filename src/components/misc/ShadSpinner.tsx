import { Spinner } from "@/components/ui/spinner"
export function ShadSpinner () {
    return (
        <div style={{maxWidth: 'var(--max-width)'}} className="flex mx-auto h-full justify-center self-start gap-6">
            <Spinner className="size-8 my-auto" />
        </div>
    )
}

