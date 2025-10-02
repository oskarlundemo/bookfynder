

import "@/styles/LoadingSpinner.css"


type Props = {
    bgColor?: string
}

export const LoadingSpinner = ({bgColor = true}:Props) => {

    return (
        <div style={{backgroundColor: `${bgColor ? bgColor : 'blue'}`}} className="loading-wrapper">
            <div className="loader">
                <span>{}</span>
            </div>
        </div>
    )
}