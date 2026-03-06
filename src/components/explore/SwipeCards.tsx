"use client";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {LoadingRequest} from "./LoadingRequest"
import {Button} from "@/components/ui/button"
import {Book} from "@prisma/client";
import ErrorPage from "@/components/misc/ErrorPage"
import { Info, Heart, X } from 'lucide-react';
import MoreInfo from "@/components/explore/MoreInfo"

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
    zIndex: number;
    book: Book;
};


type props = {
    userId?: string,
}

const SwipeCards = ({userId} : props) => {

    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [topCard, setTopCard] = useState<any>(null);
    const storageKey = `cards_${userId}`;

    const getRecommendations = async () => {
        const res = await fetch("/api/explore/recommend-books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        return res.json();
    };

    // Load cached cards or fetch new recommendations
    useEffect(() => {

        const cachedCards = localStorage.getItem(storageKey);

        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const response = await getRecommendations();
                const newCards = response.data?.recommendations || [];
                localStorage.setItem(storageKey, JSON.stringify(newCards));
                setCards(newCards);
            } catch (err) {
                setError(true);
                console.error("Error fetching recommendations:", err);
            } finally {
                setLoading(false);
            }
        };

        if (cachedCards) {
            setCards(JSON.parse(cachedCards));
            setLoading(false);
        } else {
            fetchRecommendations();
        }
    }, []);

    useEffect(() => {
        if (cards.length > 0) {
            localStorage.setItem(storageKey, JSON.stringify(cards));
        } else {
            localStorage.removeItem(storageKey);
        }
    }, [cards, storageKey]);


    const fetchNew = async () => {

        setLoading(true);

        try {
            const response = await getRecommendations();
            console.log(response.data.recommendations);
            setCards(response.data.recommendations || []);
        } catch (err:any) {
            setError(true);
            console.error('Error while retrieving books', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (cards.length === 0) {
            setTopCard(null);
        } else {
            setTopCard(cards[cards.length - 1]);
        }
    }, [cards]);

    if (loading) {
        return (
            <LoadingRequest/>
        )
    }

    if (error) {
        return (
            <ErrorPage
                title={'Error'}
                details={'An error occurred while fetching recommendations from Open AI. Please try again later!'}
            />
        )
    }

    return (
        <div className="flex flex-col flex-grow items-center justify-center w-full">

            {cards.length > 0 && (
                <div className="flex flex-row gap-10 translate-x-30 justify-center my-5">
                    <span className={'text-2xl text-right text-gray-500'}>{cards.length}/10</span>
                </div>
            )}

            <div
                className="w-full grid place-items-center relative">
             {cards.length > 0 ? (
                (cards.map((book, index) => (
                        <CardComponent
                            key={book.id}
                            {...book}
                            cards={cards}
                            setCards={setCards}
                            book={book}
                            zIndex={index}
                        />
                    )))
            ) : (
                 <div className="flex flex-col items-center justify-center text-center space-y-4 p-6">
                     <h2 className="text-3xl font-extrabold">
                         Looks like you’ve read every book in the universe (or at least this deck).
                     </h2>
                     <h3 className="text-lg text-gray-600">
                         Ready to dive back in or explore something new?
                     </h3>
                     <div className="flex space-x-4 mt-4">
                         <Button
                             onClick={() => fetchNew()}
                             variant="secondary"
                             className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
                         >
                             Fetch new recommendations
                         </Button>
                     </div>
                 </div>

             )}

            {cards.length > 0 && (
                <div className="flex flex-row gap-10 justify-center mt-6">

                    <button

                        onClick={() => {
                            if (!topCard) return;
                            setCards((prev) => prev.filter((card) => card.id !== topCard.id));
                        }}

                        style={{transition: '200ms ease-in-out', cursor: 'pointer'}} className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg active:scale-95 transform hover:scale-110 transition-all">

                        <X stroke={'white'} />

                    </button>

                    <button
                        onClick={() => {
                            if (!topCard) return;
                            setCards((prev) => prev.filter((card) => card.id !== topCard.id));
                            handleSave(topCard);
                        }}
                        style={{transition: '200ms ease-in-out', cursor: 'pointer'}}
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center active:scale-95  justify-center shadow-lg transform hover:scale-110 transition-all">
                        <Heart stroke={'white'}/>
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default SwipeCards;

export const handleSave = async (book:Book) => {

    try {
        const res = await fetch("/api/explore/save-book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({book}),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            toast.success(`Book "${book.title}" added successfully!`);
        } else {
            toast.error(`An error occurred while adding "${book.title}".`);
        }
    } catch (error) {
        console.error("Error saving book:", error);
        toast.error(`Failed to save "${book.title}". Please try again.`);
    }
};

const CardComponent = ({ id, book, zIndex, cards, setCards }: CardProps) => {

    const x = useMotionValue(0);
    const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

    const isFront = id === cards[cards.length - 1].id;

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : id % 2 ? 6 : -6;
        return `${rotateRaw.get() + offset}deg`;
    })

    console.log(book)

    const handleDragEnd = async () => {

        const swipe = x.get();

        if (swipe > 50) {
            setCards((prev) => prev.filter((card) => card.id !== id));
            await handleSave(book)
        } else if (swipe < -50) {
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
                zIndex: zIndex,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="p-4 hover:cursor-grab active:cursor-grabbing h-[28rem] w-80 rounded-2xl shadow-md bg-white flex flex-col justify-between items-center text-center"
        >

            <div className="book-credentials h-full w-full flex flex-col mt-4">

                {book.categories && (
                    <div className="flex flex-row gap-2 flex-wrap mb-4">
                        {book.categories.map((category, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 font-medium tracking-wide"
                            >
                            {category.name}
                            </span>
                        ))}
                    </div>
                )}

                <h2 className="text-xl font-semibold text-left leading-tight">
                    {book.title}
                    <span className="text-gray-500 text-sm font-sans ml-2">({book.year})</span>
                </h2>

                <p className="text-gray-600 italic text-left mt-1">
                    by {book.author}
                </p>

                <p className="text-m text-gray-800 text-left mt-4 leading-relaxed line-clamp-4">
                    {book.about}
                </p>

                <div className="flex items-end justify-end gap-2 p-2 flex-row mt-auto">
                    <MoreInfo
                        whyRead={book.whyRead || "No data was received from Open AI "}
                        aboutAuthor={book.aboutAuthor || "No data was received from Open AI"}
                        whyRecommended={book.whyRecommended || "No data was received from Open AI"}
                    />
                </div>

            </div>

        </motion.div>
    );
};
