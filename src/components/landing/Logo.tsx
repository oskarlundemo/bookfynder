export default function Logo ({}) {


    return (
        <div className="flex flex-col my-40  w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

            <div className="relative flex flex-row items-center gap-5 mb-6">

                <svg
                    className="relative"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        height: "clamp(40px, 8vw, 64px)",
                        width: "clamp(40px, 8vw, 64px)",
                    }}
                    viewBox="0 0 64 64"
                >
                    <rect width="64" height="64" rx="12" fill="#0F172A" />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        fontSize="28"
                        fontWeight="600"
                        fill="#F9FAFB"
                    >
                        bf.
                    </text>

                </svg>

                <div className={'flex flex-row relative'}>
                    <h1
                        className="relative left-3 select-none text-gray-300 whitespace-nowrap"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 6rem)",
                            lineHeight: "1"
                        }}
                    >
                        Bookfynder
                    </h1>

                    <h1
                        className="absolute select-none whitespace-nowrap"
                        style={{
                            left: "0.2em",
                            fontSize: "clamp(2rem, 8vw, 6rem)",
                            lineHeight: "1"
                        }}
                    >
                        Bookfynder
                    </h1>
                </div>

                <span className={'text-xl -top-8 -right-5 absolute sm:text-2xl md:text-3xl'}>1.0 alpha</span>

            </div>

            <div className="relative flex flex-col gap-5">
                <h2 className="text-xl sm:text-2xl md:text-3xl">
                    Books that match your <strong>vibe</strong>
                </h2>
            </div>

        </div>
    )
}