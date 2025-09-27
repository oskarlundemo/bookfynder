

type Props = {
    title: string;
    author: string;
    setBook: (title:string, author: string) => void;
}


export const ResultCard = ({title, author, setBook}:Props) => {

    return (
        <li onClick={() => setBook(title, author)} className={'flex p-2 flex-col'}>
            <h2 className={'font-semibold'}>{title}</h2>
            <h3 style={{color: 'var(-text-subtle)'}}>by {author}</h3>
        </li>
    )
}