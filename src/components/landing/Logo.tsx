export default function Logo ({}) {


    return (
        <div className="flex my-50 flex-col w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

            <div className="relative flex flex-row items-center gap-5 mb-6">


                <div className={'flex flex-row relative'}>
                    <h1
                        className="relative left-3 text-black/20 select-none  whitespace-nowrap"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 6rem)",
                            lineHeight: "1"
                        }}
                    >
                        Bookfynder
                    </h1>

                    <h1
                        className="absolute text-black select-none whitespace-nowrap"
                        style={{
                            left: "0.2em",
                            fontSize: "clamp(2rem, 8vw, 6rem)",
                            lineHeight: "1"
                        }}
                    >
                        Bookfynder
                    </h1>
                </div>
            </div>

            <div className="relative flex flex-col gap-5">
                <h2 className="text-xl text-black sm:text-2xl md:text-3xl">
                    Discover your next favorite book with AI.
                </h2>
            </div>

        </div>
    )
}