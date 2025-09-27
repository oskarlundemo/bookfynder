import {LoadingSpinner} from "@/components/misc/LoadingSpinner";


type Props = {
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText?: string;
    disabledButton?: boolean;
    isLoading?: boolean;
    title?: string;
};


export const AuthForm = ({onSubmit, buttonText, isLoading, disabledButton, title, children} :Props) => {

    return (
        <form
            onSubmit={onSubmit}
            className={'auth-form flex flex-col gap-5 relative'}
        >
            <h1>{title}</h1>

            {isLoading && (
                <LoadingSpinner/>
            )}

            {children}
            <button
                className={'custom-button'}
                disabled={disabledButton}
                type="submit">
                {buttonText}
            </button>
        </form>
    )
}