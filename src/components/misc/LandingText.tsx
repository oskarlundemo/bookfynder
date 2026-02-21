


type Props = {
    title: string,
    breadText: any,
    number: number,
    reverse?: boolean,
}


export default function LandingText({title, breadText, number, reverse}: Props) {

    return (
        <article className="relative md:w-1/2 w-full flex flex-col items-center gap-5">
            <div
                className={'flex gap-2 flex-row w-full items-center gap-4 justify-start'}
            >
                <span className={'h-5 w-5 p-5 flex items-center justify-center text-white bg-black rounded-full'}>
                    {number}.
                </span>
                <h2
                    className={'text-2xl'}
                >{title}</h2>
            </div>

            <div className="flex items-start justify-start flex-col w-full gap-5">
                {breadText && (
                    (breadText)
                )}
            </div>

        </article>
    )
}