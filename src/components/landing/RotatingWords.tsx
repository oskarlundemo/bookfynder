

import {useEffect, useState} from 'react'

export default function RotatingWords() {

    const words = [
        "adventures",
        "romance",
        "mystery",
        "comedy",
        "sci-fi",
        "fantasy",
        "history",
        "biography",
        "poetry",
        "thriller"
    ];


    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState("")
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150)

    useEffect(() => {
        const handleTyping = () => {
            const fullWord = words[index];

            if (!isDeleting) {
                setCurrentWord(fullWord.substring(0, currentWord.length + 1));

                if (currentWord.length + 1 === fullWord.length) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }

            } else {
                setCurrentWord(fullWord.substring(0, currentWord.length - 1));

                if (currentWord.length === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            }
        };

        const timer = setTimeout(handleTyping, speed);

        return () => clearTimeout(timer);
    }, [currentWord, isDeleting, index, words, speed]);


    return (

        <div className="grid grid-cols-2 gap-2 items-center">
            <h2 className="text-4xl font-semibold text-center">
                Discover new{" "}
            </h2>
            <h2 className="text-blue-600 text-4xl">{currentWord}<span>|</span></h2>
        </div>
    );
}