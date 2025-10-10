"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import {LoadingSpinner} from "@/components/misc/LoadingSpinner";

type CardData = {
    id: number;
    title: string;
    author: string;
    about: string;
};

type CardProps = CardData & {
    cards: CardData[];
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
};

type CardData = {
    id: number;
    title: string;
    author: string;
    year: number;
    about: string;
};

const cardData: CardData[] = [
    {
        id: 1,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        about:
            "A witty exploration of love, reputation, and class, following Elizabeth Bennet as she navigates misunderstandings and pride in 19th-century England.",
    },
    {
        id: 2,
        title: "Moby-Dick",
        author: "Herman Melville",
        year: 1851,
        about:
            "A brooding tale of obsession and revenge as Captain Ahab hunts the great white whale across the vast, unforgiving ocean.",
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        about:
            "A chilling dystopian vision of a totalitarian regime where Big Brother watches every move and individuality is crushed.",
    },
    {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        about:
            "A tragic story of wealth, love, and illusion set in the roaring 1920s, centered around the mysterious millionaire Jay Gatsby.",
    },
    {
        id: 5,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        about:
            "A profound look at justice and racial prejudice in the American South through the eyes of young Scout Finch.",
    },
];


type Props = {
    Books: Book[];
}

const SwipeCards = ({books} :Props) => {

    const [cards, setCards] = useState<CardData[]>([]);
    const [cachedCards, setCachedCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        console.log(cards);
    }, [cards]);

    useEffect(() => {
        const fetchRecommendations = async () => {

            setLoading(true);

            const simplifiedBooks = books.map(book => ({
                id: book.id,
                title: book.title,
                author: book.author,
                categories: book.BookCategory.map(c => c.category.name),
                rating: book.readBooks[0]?.rating ?? null
            }));

            try {
                const recommendedBooks = await getRecommendations(simplifiedBooks);
                setCards(recommendedBooks.recommendations);
                setCachedCards(recommendedBooks.recommendations);
            } catch (err) {
                setError(err);
                setErrorMessage("An error occurred while fetching recommendations.");
                console.error('Error while retrieving books', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [books]);

    const getRecommendations = async (books: any[]) => {
        const res = await fetch("/api/explore/recommend-books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ books })
        });
        const data = await res.json();
        return data.recommendations;
    };

    const swipeAgain = () => {
        setCards(cachedCards);
    }

    if (loading) {
        return (
            <div style={{color: 'var(--text-subtle)'}} className="flex flex-grow justify-center items-center flex-col">
                    <LoadingSpinner bgColor={'var(--secondary)'} />;
                    <h1>Wainting for a response from OpenAI</h1>
                </div>
            )
    }

    if (error) {
        return (
            <div style={{color: 'var(--text-subtle)'}} className="flex flex-grow justify-center items-center flex-col">
                <h1>Error: {errorMessage}</h1>
            </div>
        )
    }

    return (

        <div className="flex flex-col flex-grow items-center justify-center w-full">

        <div className=" w-full grid place-items-center relative">

            {cards.length > 0 ? (
                (cards.map((book, index) => (
                        <CardComponent
                            key={book.id}
                            {...book}
                            cards={cards}
                            setCards={setCards}
                        />
                    )))
            ) : (
                <h2 onClick={() => swipeAgain()}>You have swiped on all your cards</h2>
            )}

            {cards.length > 0 && (
                <div className="flex flex-row gap-10 justify-center mt-6">

                    <button style={{transition: '200ms ease-in-out', cursor: 'pointer'}} className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg active:scale-95 transform hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </button>

                    <button style={{transition: '200ms ease-in-out', cursor: 'pointer'}} className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center active:scale-95  justify-center shadow-lg transform hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>

        </div>
    );
};

export default SwipeCards;

const CardComponent = ({ id, title, author, cards, setCards, year, about }: CardProps) => {

    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

    const isFront = id === cards[cards.length - 1].id;

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : id % 2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 50) {
            console.log("Deleting this card: " + id);
            setCards((prev) => prev.filter((card) => card.id !== id));
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
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="p-4 hover:cursor-grab active:cursor-grabbing h-[28rem] w-80 rounded-2xl shadow-md bg-white flex flex-col justify-between items-center text-center"
        >

            <p>{about}</p>

            <div className={'book-credentials w-full flex flex-col'}>
                <h2 className="text-xl text-left font-semibold">{title} <span className={'text-gray-600'}>({year})</span></h2>
                <p className="text-gray-600 italic text-left">by {author}</p>
            </div>

        </motion.div>
    );
};
