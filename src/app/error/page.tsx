'use client'



type Props = {
    title?: string,
    details?: string,
    code?: number
}

export default function ErrorPage ({details}: Props) {
    return (
        <main className="flex flex-col items-center justify-center h-full">

            {title ? (
                <h1 className={'text-4xl font-bold'}>{title}</h1>

            ) : (
                <h1 className={'text-4xl font-bold'}>Sorry, something went wrong</h1>
            )}

            {details && (
                <p>{details}</p>
            )}
        </main>
    )
}