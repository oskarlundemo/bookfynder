import {useEffect, useState} from "react";
import "@/styles/DropDown.css"

type Props = {
    buttonText: string,
    items: any[];


}


export const DropDownMenu = ({buttonText, items} : Props) => {

    const [label, setLabel] = useState<string>(buttonText);
    const [show, setShow] =   useState<boolean>(true);

    return (
        <button type={"button"} className={'drop-down-wrapper'}>
            <p onClick={() => setShow(!show)} className={'current-item'}>{label}</p>

            <div className={`drop-down-content ${show ? `show` : ``}`}>
                {items.map((item:any, index:number) => (
                    <p onClick={() => {setLabel(item); setShow(!show)}} key={index}>{item}</p>
                ))}
            </div>

        </button>
    )
}