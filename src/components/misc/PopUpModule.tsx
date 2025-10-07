
import "@/styles/PopUp.css"


interface PopupProps {
    show: boolean;
    setShow: (show: boolean) => void;

    children: React.ReactNode;
}



export const PopUpModule = ({show, setShow, children}:PopupProps) => {


    return (
        <div className={`pop-up-module ${show ? 'active-pop-up' : ''}`}>

            <div className={`pop-up-pop-header`}>
                <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>

            {children}
        </div>
    )

}