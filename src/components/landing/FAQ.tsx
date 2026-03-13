"use client"

import {ChevronUp} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FAQ() {
    const faqItems = [
        {
            title: "What is Bookfynder?",
            text: "Bookfynder helps you discover your next favorite book using AI-powered recommendations."
        },
        {
            title: "Is Bookfynder free?",
            text: "Yes! You can track books, discover new ones, and manage your reading list completely free."
        },
        {
            title: "What technologies power Bookfynder?",
            text: "Bookfynder is built with modern web technologies. It uses Next.js as the framework for fast and scalable performance, Supabase for authentication and backend services, OpenAI to generate intelligent book recommendations, and Tailwind CSS for clean and responsive styling."
        },
        {
            title: "Why did you build this?",
            text: "I’ve always loved reading, but I found myself spending too much time searching for the right book to read next. It became clear that there wasn’t an easy way to track what I’ve read, discover new books tailored to my tastes, and visualize my reading progress. I wanted to create an application that could solve these problems — a personal reading companion that not only helps me stay organized, but also makes discovering and tracking books more enjoyable and efficient. The goal was to combine simplicity, AI recommendations, and a visually engaging experience to make reading more rewarding for anyone who loves books as much as I do."
        }

    ];

    return (
        <section className="flex flex-col items-start justify-start gap-4 w-full">

            <h4 className="font-semibold text-[clamp(1rem,2vw,2rem)]">Questions you might have</h4>

            {faqItems.map((item, i) => (
                <DropDownItem key={i} title={item.title} text={item.text} />
            ))}
        </section>
    );
}

type DropDownProp = {
    title?: string;
    text?: string;
};

function DropDownItem({ title, text }: DropDownProp) {
    const [isOpen, setOpen] = useState(false);

    return (
        <div
            className="border-gray-200 rounded-lg w-full flex flex-col items-start  p-5 cursor-pointer bg-white"
            onClick={() => setOpen(!isOpen)}
        >
            <h4 className="font-semibold flex flex-row items-center justify-start my-2 gap-2 text-[clamp(1rem,1.5vw,1.5rem)] ">

                {title}



                <ChevronUp className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-all`} size={24} />

            </h4>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                        className={'bg-muted rounded-xl overflow-hidden'}
                    >
                        <p className="w-full p-5 text-left text-gray-600">{text}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
