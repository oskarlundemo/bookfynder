"use client";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Book} from "@prisma/client";


type CardProps = CardData & {
    cards: CardData[];
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
    card: any
};

type CardData = {
    id: number;
    title: string;
    author: string;
    year: number;
    about: string;
    zIndex: number;
    book: Book;
};

const cardData: any[] = [
    {
        id: 1,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        about:
            "A witty exploration of love, reputation, and class, following Elizabeth Bennet as she navigates misunderstandings and pride in 19th-century England.",
        categories: ["Fiction", "Romance", "Classic", "Social Commentary"],
    },
    {
        id: 2,
        title: "Moby-Dick",
        author: "Herman Melville",
        year: 1851,
        about:
            "A brooding tale of obsession and revenge as Captain Ahab hunts the great white whale across the vast, unforgiving ocean.",
        categories: ["Fiction", "Adventure", "Classic", "Philosophical"],
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        about:
            "A chilling dystopian vision of a totalitarian regime where Big Brother watches every move and individuality is crushed.",
        categories: ["Fiction", "Dystopian", "Political", "Classic"],
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        about:
            "A tragic story of wealth, love, and illusion set in the roaring 1920s, centered around the mysterious millionaire Jay Gatsby.",
        categories: ["Fiction", "Classic", "Tragedy", "Social Commentary"],
    },
    {
        id: 5,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        about:
            "A profound look at justice and racial prejudice in the American South through the eyes of young Scout Finch.",
        categories: ["Fiction", "Classic", "Coming-of-Age", "Social Justice"],
    },
]



const MockDeck = () => {

    const [cards, setCards] = useState<CardData[]>(cardData);

    return (
        <div className="flex flex-col flex-grow items-center justify-center w-full">

            <div
                className="w-full grid place-items-center relative">

                {cards.length > 0 && (
                    (cards.map((book, index) => (
                        <CardComponent
                            key={book.id}
                            {...book}
                            cards={cards}
                            setCards={setCards}
                            zIndex={index}
                            card={book}
                            categories={book.categories}
                        />
                    ))
                    ))
                }
            </div>
        </div>
    );
};

export default MockDeck;

const CardComponent = ({ id, title, card, about, year, author, zIndex, categories, cards, setCards }: CardProps) => {


    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

    const isFront = id === cards[cards.length - 1].id;

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : id % 2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    const handleDragEnd = async () => {

        const swipe = x.get();

        if (swipe > 50) {
            setCards((prev) => {
                const newDeck = [...prev];
                const topCard = newDeck.pop();
                if (topCard) newDeck.unshift(topCard);
                return newDeck;
            });

        } else if (swipe < -50) {
            setCards((prev) => {
                const newDeck = [...prev];
                const topCard = newDeck.pop();
                if (topCard) newDeck.unshift(topCard);
                return newDeck;
            });
        } else {
            console.log("Not swiped long enough, nothing happened");
        }
    };

    return (
        <motion.div
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                opacity,
                rotate,
                transition: "0.125s transform",
                boxShadow: isFront
                    ? "0 20px 40px rgba(0, 0, 0, 0.25)"
                    : "0 5px 10px rgba(0, 0, 0, 0.1)",
                scale: isFront ? 1 : 0.95,
                zIndex: zIndex,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="p-4 hover:cursor-grab active:cursor-grabbing h-[28rem] w-80 rounded-2xl shadow-md bg-white flex flex-col justify-between items-center text-center"
        >

            <p>{about}</p>

            <div className={'book-credentials w-full flex flex-col'}>

                {categories && (
                    <div className="flex flex-row gap-1 flex-wrap mb-2">
                        {categories.map((category, index) => (
                            <Button key={index}>
                                {category}
                            </Button>
                        ))}
                    </div>
                )}

                <h2 className="text-xl text-left font-semibold">{title} <span className={'text-gray-600 ml-auto'}>({year})</span></h2>
                <p className="text-gray-600 my-auto italic text-left">by {author}</p>
            </div>

        </motion.div>
    );
};




