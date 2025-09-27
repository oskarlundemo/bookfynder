




export const OrDivider = () => {

    return (
        <div className="orDivider g-5 flex items-center justify-center w-full">

            <div style={{background: 'var(--text-subtle)', opacity: '0.4'}} className="flex rounded-2xl h-1 flex-grow"/>

            <h3 style={{color: 'var(--text-subtle)'}} className={'flex m-5 w-fit'}>or</h3>

            <div style={{background: 'var(--text-subtle)', opacity: '0.4'}} className="flex rounded-2xl h-1 flex-grow"/>
        </div>
    )
}