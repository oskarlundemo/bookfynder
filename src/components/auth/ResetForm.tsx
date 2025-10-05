"use client"

import {AuthForm} from "@/components/auth/AuthForm";
import {InputField} from "@/components/misc/InputField";
import {useEffect, useState} from "react";
import {forgot} from "@/app/auth/forgot/actions";
import toast from "react-hot-toast";
import Link from "next/link";
import {resetPassword} from "@/app/auth/reset-password/action";

export const ResetForm = ({}) => {

    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [passwordMatch, setPasswordMatch] = useState<string>('');

    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setPasswordMatch(
            password === repeatPassword
        );

        if (passwordMatch)
            console.log('Matchar');

    }, [password, repeatPassword]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("password", password);

        try {
            const result = await resetPassword(formData);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong, please try again later");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={'flex auth-page flex-col m-auto gap-5 '}>

            <AuthForm
                buttonText={'Submit'}
                disabledButton={!passwordMatch}
                isLoading={loading}
                title={'Reset password'}
                handleSubmit={handleSubmit}
            >

                <InputField
                    type={'password'}
                    placeholder={'******'}
                    value={password}
                    setValue={setPassword}
                    name="New password"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q66 0 121 33t87 87h432v240h-80v120H600v-120H488q-32 54-87 87t-121 33Zm0-80q66 0 106-40.5t48-79.5h246v120h80v-120h80v-80H434q-8-39-48-79.5T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q33 0 56.5-23.5T360-480q0-33-23.5-56.5T280-560q-33 0-56.5 23.5T200-480q0 33 23.5 56.5T280-400Zm0-80Z"/></svg>
                    }
                />

                <InputField
                    type={'password'}
                    placeholder={'******'}
                    value={repeatPassword}
                    setValue={setRepeatPassword}
                    name="Repeat password"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q66 0 121 33t87 87h432v240h-80v120H600v-120H488q-32 54-87 87t-121 33Zm0-80q66 0 106-40.5t48-79.5h246v120h80v-120h80v-80H434q-8-39-48-79.5T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q33 0 56.5-23.5T360-480q0-33-23.5-56.5T280-560q-33 0-56.5 23.5T200-480q0 33 23.5 56.5T280-400Zm0-80Z"/></svg>
                    }
                />

                <span className="subtle-form-message">
                    Don't have an account? <Link href="/auth/register">Register</Link>
                </span>

            </AuthForm>

        </section>
    )
}


export default ResetForm;