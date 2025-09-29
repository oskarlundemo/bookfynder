import {LoadingSpinner} from "@/components/misc/LoadingSpinner";


type Props = {
    children?: React.ReactNode;
    formAction?: any;
    buttonText?: string;
    disabledButton?: boolean;
    isLoading?: boolean;
    title?: string;
};

export const AuthForm = ({formAction, buttonText, isLoading, disabledButton, title, children} :Props) => {

    return (
        <form
            className={'auth-form flex flex-col gap-5 relative'}
        >
            <h1>{title}</h1>

            {isLoading && (
                <LoadingSpinner/>
            )}

            {children}
            <button
                formAction={formAction}
                className={'custom-button'}
                disabled={disabledButton}
                type="submit">
                {buttonText}
            </button>
        </form>
    )
}