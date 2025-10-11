


type Props = {
    title: string;
    content?: React.ReactNode;
}


export const BentoModule = ({title, content}:Props) => {
    return (
        <article
            style={{
                backgroundColor: 'var(--primary)',
            }}
            className="bento-module p-5 aspect-ratio-1 flex flex-col shadow rounded-2xl">

            <h2>{title}</h2>

            {content}

        </article>
    )
}