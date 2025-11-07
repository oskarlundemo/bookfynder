import { Slider } from "@/components/ui/slider";
import { CirclePlus, CircleMinus } from 'lucide-react';

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


            <div className="flex ml-auto items-center gap-2 justify-center flex-row">
                <CircleMinus
                    onClick={() => {
                        if (Number(value) <= 1) return;
                        setCurrentPage(Number(value) - 1);
                    }}
                />

                <p>{value} / {noOfPages}</p>

                <CirclePlus
                    onClick={() => {
                        if (Number(value) >= noOfPages) return;
                        setCurrentPage(Number(value) + 1);
                    }}
                />
            </div>



        </div>

    )
}