

import {motion} from "framer-motion";



export default function Logo ({}) {


    return (
        <motion.div

            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}

            className="flex my-auto flex-col w-full items-center justify-center" style={{ maxWidth: 'var(--max-width)' }}>

            <div className="relative flex flex-row items-center gap-5 mb-6">
                <h1
                    className="font-bold tracking-light text-black"
                    style={{
                        fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                        lineHeight: "0.95",
                    }}
                >
                    Bookfynder
                </h1>
            </div>

            <div className="relative flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl leading-snug ">
                    Discover your next favorite book with{' '}
                    <span
                        className="font-extrabold uppercase tracking-wide"
                        style={{
                            background: 'linear-gradient(90deg, #6366f1, #a78bfa, #4f46e5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                    AI
                    </span>
                </h2>
            </div>

        </motion.div>
    )
}