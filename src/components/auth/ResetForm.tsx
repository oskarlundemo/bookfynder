"use client"

import {resetPassword} from "@/app/auth/reset-password/action"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export function ResetForm ({
                                className,
                                ...props
                            }: React.ComponentProps<"form">) {

    const router = useRouter();

    const [samePasswords, setSamePasswords] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        setSamePasswords(password === confirmPassword && confirmPassword.length > 0 && password.length > 0);
    }, [password, confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {

        if (!samePasswords)
            return;

        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)

        const result = await resetPassword(formData)

        if (result.success) {
            toast.success(result.message)
            setLoading(false)
            router.push('/auth/login')
        } else {
            toast.error(result.message)
        }

        setLoading(false)
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Reset password</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your new password
                    </p>
                </div>

                <Field>
                    <FieldLabel htmlFor="email">Password</FieldLabel>
                    <Input
                        id="password"
                        type={`${!showPassword ? "password" : "text"}`}
                        value={password}
                        placeholder={'New password'}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Confirm password</FieldLabel>
                    <Input
                        id="confirmpassword"
                        type={`${!showPassword ? "password" : "text"}`}
                        value={confirmPassword}
                        placeholder={'Confirm new password'}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required />
                </Field>


                <div className="flex cursor-pointer h-3 items-center justify-end gap-1 flex-row text-center">

                    <p
                        className="text-sm text-gray-500 hover:underline cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        Show password
                    </p>

                    {showPassword ? (
                        <svg className={'text-gray-500'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                    ) : (
                        <svg className={'text-gray-500'} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    )}

                </div>

                <Field>
                    <Button disabled={!samePasswords} onClick={(e) => handleSubmit(e)} type="submit" className="w-full">

                        {loading && (
                            <Spinner/>
                        )}

                        {loading ? (
                            <p>
                                Resetting...
                            </p>
                        ) : (
                            <p>
                                Reset
                            </p>
                        )}

                    </Button>
                </Field>

                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a href="/auth/register" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}


