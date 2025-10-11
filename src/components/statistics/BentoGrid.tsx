import {BentoModule} from "@/components/statistics/BentoModule";
import {BookCategoryPieChart, ChartPieDonutText} from "./BookCategoryPieChart";


type Props = {
    pieChartData: any;
}

export const BentoGrid = ({pieChartData}:Props) => {



    console.log(pieChartData);


    // Antalet böcker = längden av listan

    // Antalet böcker med respektive categories


    const categories = pieChartData.flatMap(readBook =>
        readBook.book.BookCategory.map(bc => ({
            id: bc.category.id,
            name: bc.category.name
        }))
    );

// Group by category id
    const grouped = Object.groupBy(categories, cat => cat.id);


    const defaultColors = ["#f87171", "#3b82f6", "#facc15", "#10b981", "#8b5cf6"];


// Count each group
    const chartData = Object.entries(grouped).map(([id, arr], index) => ({
        id,
        name: arr[0].name,
        value: arr.length,
        fill: defaultColors[index % defaultColors.length], // rotate through colors
    }));


    return (
        <section style={{maxWidth: 'var(--max-width)'}}
                 className="bento-grid h-full w-full self-center grid grid-cols-2 grid-rows-2">

            {/* Här kör vi en pie chart */}

            <ChartPieDonutText
                title={'Books'}
                numberOfBooks={pieChartData.length || 0}
                bookData={chartData}
                explenation={"Your reading genres"}
            />

        </section>
    )
}