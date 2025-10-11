

import "@/styles/LoadingSpinner.css"


type Props = {
    bgColor?: string
    pulsating?: boolean
}

export const LoadingSpinner = ({bgColor = '', pulsating = true}:Props) => {

    return (
        <div style={{animation: pulsating ? 'pulse 1s linear infinite' : 'none',  backgroundColor: `${bgColor ? bgColor : ''}`}} className="loading-wrapper">
            <div className="loader">
                <span>{}</span>
            </div>
        </div>
    )
}