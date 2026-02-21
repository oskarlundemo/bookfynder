'use client'



type Props = {
    title?: string,
    details?: string,
    code?: number
}

export default function ErrorPage ({details, title}: Props) {

    return (
        <main className="flex flex-col items-center justify-center w-full h-full">

            <div className="relative  flex flex-col items-center gap-5">

                {title ? (
                    <h1 className={'text-4xl text-red-500 font-bold'}>{title}</h1>

                ) : (
                    <h1 className={'text-4xl text-red-500 font-bold'}>Error</h1>
                )}

                {details ? (
                    <p className={'text-gray-400 mb-6'}>{details}</p>
                ) : (
                    <p className={'text-gray-400 mb-6'}>Something went wrong! Try again later</p>
                )}

            </div>

        </main>
    )
}