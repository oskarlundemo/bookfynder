"use client"

import {InputField} from "@/components/misc/InputField";
import {useEffect, useState} from "react";
import "@/styles/FilterSection.css"
import {Book, Category} from "@prisma/client";
import {CategoryDropDown} from "@/components/misc/CategoryDropDown";

interface FilterSectionProps {
    books: Book[]; // original books
    setFilteredBooks: (books: Book[]) => void;
    categories: Category[];
}

export const FilterSection = ({setFilteredBooks, categories, books}:FilterSectionProps) => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [scoreOrder, setScoreOrder] = useState<string>('default');
    const [status, setStatus] = useState<string>('none');

    const handleOrder = (option: string) => {
        if (scoreOrder === 'default') {
            setScoreOrder('asc')
        } else if (scoreOrder === 'asc') {
            setScoreOrder('desc')
        } else
            setScoreOrder('default')
    }

    const handleStatus = (active: string) => {

        if (status === active) {
            setStatus('default');
            return;
        }

        setStatus(active);
    }

    useEffect(() => {
        console.log(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        let updated = [...books];

        if (searchQuery) {
            updated = updated.filter(
                (book) =>
                    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (status === 'read') {
            updated = updated.filter((book) => book.readBooks.length > 0);
        } else if (status === 'want') {
            updated = updated.filter((book) => book.readingList.length > 0);
        }

        updated.sort((a: Book, b: Book) => {
            let aValue = 0;
            let bValue = 0;

            if (status === 'read') {
                aValue = a.readBooks[0]?.rating ?? 0;
                bValue = b.readBooks[0]?.rating ?? 0;
            } else if (status === 'want') {
                aValue = a.readingList[0]?.priority ?? 0;
                bValue = b.readingList[0]?.priority ?? 0;
            } else {
                aValue = a.readBooks[0]?.rating ?? a.readingList[0]?.priority ?? 0;
                bValue = b.readBooks[0]?.rating ?? b.readingList[0]?.priority ?? 0;
            }

            return scoreOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });


        if (selectedCategories.length > 0) {
            updated = updated.filter(book => {
                const bookCategoryIds = book.BookCategory.map(bc => bc.category.id);
                return selectedCategories.some(cat => bookCategoryIds.includes(cat.id));
            });
        }


        setFilteredBooks(updated);

    }, [searchQuery, books, scoreOrder, status, selectedCategories, setFilteredBooks]);


    return (
        <section style={{backgroundColor: 'var(--card)'}} className={'books-filter-section flex flex-col shadow m-5 p-5 rounded-xl'}>

            <InputField
                setValue={setSearchQuery}
                value={searchQuery}
                type="text"
                name={'Search'}
                placeholder="Search in your bookshelf"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                }
            />


            <div className='flex my-5 flex-wrap-reverse flex-row gap-5 justify-between items-center'>

                <CategoryDropDown
                    items={categories}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                    categories={categories}
                    allowEmpty={true}

                    fieldSet={true}
                    fieldSetName={'Categories'}
                />

                <div className='flex sort-option flex-row gap-2 items-center justify-center'>

                    <p onClick={() => handleOrder()}>Title</p>

                    <p onClick={() => handleOrder()}>Scores</p>

                    <svg className={`filter-icon ${scoreOrder}`}
                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>


                    <button style={{opacity: `${status === 'read' ? '0.5' : '1'}`}} className={'custom-button'} onClick={() => handleStatus('read')} type={'button'}>Read</button>
                    <button style={{opacity: `${status === 'want' ? '0.5' : '1'}`}} className={'custom-button'} type={'button'} onClick={() => handleStatus('want')}>Reading list</button>

                </div>

            </div>

        </section>
    )
}