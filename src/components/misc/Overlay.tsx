
import "@/styles/Overlay.css"

interface OverlayProps {
    show: boolean
    setShow: (show: boolean) => void
}

export const Overlay = ({show, setShow}:OverlayProps) => {
    return (
        <div onClick={() => setShow(false)} className={`overlay ${show ? 'active' : ''}`} />
    )
}