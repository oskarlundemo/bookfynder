import { Slider } from "@/components/ui/slider"

type Props = {
    noOfPages: number;
    value: number;
    setCurrentPage: (page: number) => void;
}

export default function CurrentPageSlider ({noOfPages, setCurrentPage, value}:Props) {


    return (

        <div className="flex gap-2 flex-col w-full">

            <h2>The page you are currently at</h2>

            <Slider
                defaultValue={[value]}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                max={noOfPages}
                step={1}
                disabled={noOfPages === 0}
            />

            <p className={'ml-auto p-5'}>{value} / {noOfPages}</p>
        </div>

    )
}