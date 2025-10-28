'use client'

type Props = {
    title?: string,
    details?: string,
    code?: number
}

export default function ErrorPage ({details, title}: Props) {

    return (
        <main className="flex items-center justify-center min-h-screen m-auto px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 mb-4">
                    {title || 'Oops! Something went wrong'}
                </h1>
                {details && (
                    <p className="text-gray-700 text-base sm:text-lg mb-4">
                        {details}
                    </p>
                )}

                <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Go Back
                </button>
            </div>
        </main>
    )
}