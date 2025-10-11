
import "@/styles/BouncyDots.css"

export const BouncyDots = ({}) => {

    return (
        <>
           <span
               className="floating-dot"
               style={{ animationDelay: "0ms" }}
           >.</span>

            <span
                className="floating-dot"
                style={{ animationDelay: "100ms" }}
            >.</span>

            <span
                className="floating-dot"
                style={{ animationDelay: "200ms" }}
            >.</span>
        </>
    )
}