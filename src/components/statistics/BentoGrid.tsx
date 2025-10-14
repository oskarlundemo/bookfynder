import {ChartPieDonutText} from "./BookCategoryPieChart";
import { Book } from "@prisma/client";


type Props = {
    readBookData: Book[];
}

export const BentoGrid = ({readBookData}:Props) => {


    return (
        <section style={{maxWidth: 'var(--max-width)'}}
                 className="bento-grid p-10 h-full w-full self-center grid grid-cols-2 grid-rows-2">

            {/* Här kör vi en pie chart */}

            <ChartPieDonutText
                title={'Books'}
                numberOfBooks={readBookData.length || 0}
                bookData={readBookData || []}
                explanation={"Your reading genres"}
            />

        </section>
    )
}