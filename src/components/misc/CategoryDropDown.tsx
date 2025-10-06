import {useEffect, useState} from "react";
import "@/styles/DropDown.css"
import {Category} from "@prisma/client";

type Props = {
    activeCategory: string,
    items: any[];
    setSelectedCategories: (categories: Category[]) => void;
    selectedCategories: Category[];
    categories: any;
    allowEmpty?: boolean;
    fieldSet?: boolean;
    fieldSetName?: string;
}


export const CategoryDropDown = ({activeCategory, allowEmpty = false, fieldSet = false, fieldSetName, selectedCategories, setSelectedCategories, items} : Props) => {

    const [label, setLabel] = useState<string>('');
    const [show, setShow] =   useState<boolean>(true);


    useEffect(() => {
        const labelStr = selectedCategories.map(cat => cat.name).join(", ");
        setLabel(labelStr);
    }, [selectedCategories]);

    const handleAddCategory = (event: React.MouseEvent<HTMLDivElement>, category: Category) => {

        setSelectedCategories(prev => {

            const exists = prev.some(cat => cat.id === category.id);

            if (exists) {
                const filtered = prev.filter(cat => cat.id !== category.id);

                if (filtered.length === 0 && !allowEmpty) {
                    return prev;
                }
                return filtered;
            }

            else if (!exists && prev.length <= 5) {
                return [...prev, category];
            }
            else {
                return prev;
            }
        });
    };



    if (fieldSet) {


        return (
                <fieldset className="custom-input w-full p-4 rounded-md">
                    <legend className="px-2 text-sm font-medium">{fieldSetName}</legend>

                    <button type={"button"} className={'drop-down-wrapper'}>

                        <input
                            onClick={() => setShow(!show)}
                            className={'current-item border-0! p-0!'}
                            value={label}
                            placeholder={'Select categories'}
                            type={'text'}
                            readOnly={true}
                        >
                        </input>

                        <div className={`drop-down-content ${show ? `show` : ``}`}>

                            {items.map((item: Category, index: number) => {
                                const isSelected = selectedCategories.some(cat => cat.id === item.id);

                                return (
                                    <div
                                        key={index}
                                        onClick={(e) => handleAddCategory(e, item)}
                                        className={`item-wrapper flex flex-row w-full align-items-center ${isSelected ? ' selected-item' : ''}`}
                                    >
                                        <p>
                                            {item.name}
                                        </p>

                                        <svg className={`${isSelected ? 'show-check' : ''}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>

                                    </div>
                                );
                            })}
                        </div>

                    </button>

                </fieldset>
            )
    }


    return (

        <button type={"button"} className={'drop-down-wrapper'}>

            <input
                onClick={() => setShow(!show)}
                className={'current-item'}
                value={label}
                placeholder={'Select categories'}
                type={'text'}
                readOnly={true}
            >
            </input>

            <div className={`drop-down-content ${show ? `show` : ``}`}>

                {items.map((item: Category, index: number) => {
                    const isSelected = selectedCategories.some(cat => cat.id === item.id);

                    return (
                        <div
                            key={index}
                            onClick={(e) => handleAddCategory(e, item)}
                            className={`item-wrapper flex flex-row w-full align-items-center ${isSelected ? ' selected-item' : ''}`}
                        >
                            <p>
                                {item.name}
                            </p>

                            <svg className={`${isSelected ? 'show-check' : ''}`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>

                        </div>
                    );
                })}
            </div>

        </button>
    )
}