



type Props = {
    title?: string;
    subTitle: string;
    details?: string;
}

export default function ErrorModule ({title, subTitle, details} : Props) {


    return (
        <div className="flex h-full w-full items-center justify-center flex-col gap-4 p-4 bg-gray-50">

            <h1
                className="text-red-600 font-semibold text-center"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
            >
                {title || 'Something went wrong'}
            </h1>

            {subTitle && (
                <h2
                    className="text-gray-700 text-center"
                    style={{ fontSize: 'clamp(1.125rem, 4vw, 1.75rem)' }}
                >
                    {subTitle}
                </h2>
            )}

            {details && (
                <p
                    className="text-gray-500 text-center max-w-md"
                    style={{ fontSize: 'clamp(0.875rem, 3vw, 1.125rem)' }}
                >
                    {details}
                </p>
            )}

        </div>
    )
}