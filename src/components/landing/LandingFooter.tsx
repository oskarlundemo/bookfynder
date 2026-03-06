import {AuthorDetails} from "@/components/landing/AuthorDetails";

export default function LandingFooter () {

    return (
        <footer
            className={'bg-muted w-full p-0 z-10 relative h-[800px]'}
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
                <div className="sticky max-w-[1200px] mx-auto top-[calc(100vh-800px)]">
                    <AuthorDetails />
                </div>
            </div>
        </footer>
    )
}