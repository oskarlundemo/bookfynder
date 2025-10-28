"use client";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {LoadingRequest} from "./LoadingRequest"
import {Button} from "@/components/ui/button"
import {Book} from "@prisma/client";
import ErrorPage from "@/components/misc/ErrorPage"

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
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </button>

                    <button

                        onClick={() => {
                            if (!topCard) return;
                            setCards((prev) => prev.filter((card) => card.id !== topCard.id));
                            handleSave(topCard);
                        }}

                        style={{transition: '200ms ease-in-out', cursor: 'pointer'}}
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center active:scale-95  justify-center shadow-lg transform hover:scale-110 transition-all">

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

            <p>{book.about}</p>

            <div className={'book-credentials w-full flex flex-col'}>

                {book.categories && (
                    <div className="flex flex-row gap-1 flex-wrap mb-2">
                        {book.categories.map((category, index) => (
                            <Button key={index}>
                                {category.name}
                            </Button>
                        ))}
                    </div>
                )}

                <h2 className="text-xl text-left font-semibold">{book.title} <span className={'text-gray-600 ml-auto'}>({book.year})</span></h2>
                <p className="text-gray-600 my-auto italic text-left">by {book.author}</p>
            </div>

        </motion.div>
    );
};
