import { Spinner } from "@/components/ui/spinner"

type Props = {
    title?: string;
}

export function ShadSpinner ({title} : Props) {
    return (
        <div style={{maxWidth: 'var(--max-width)'}} className="flex m-auto h-full justify-center self-start gap-6">
            <Spinner className="size-8 my-auto" />

            {title && (
                <p>{title}</p>
            )}

        </div>
    )
}

