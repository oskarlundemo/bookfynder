"use client"
import {forgot} from "@/app/auth/forgot/actions"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {z} from "zod"
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

export function ForgotForm ({
                               className,
                               ...props
                           }: React.ComponentProps<"form">) {

    const router = useRouter();

    const emailSchema = z.object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);

    useEffect(() => {

        const result = emailSchema.safeParse({ email })

        if (result.success) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }

    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {

        if (validEmail)
            return;

        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('email', email)

        const result = await forgot(formData)

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
                    <h1 className="text-2xl font-bold">Forgot password</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your associated email and a link will be sent
                    </p>
                </div>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="password"
                        type={"email"}
                        value={email}
                        placeholder={'john@doe.com'}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </Field>

                <Field>
                    <Button disabled={!validEmail} onClick={(e) => handleSubmit(e)} type="submit" className="w-full">

                        {loading && (
                            <Spinner/>
                        )}

                        {loading ? (
                            <p>
                                Sending link...
                            </p>
                        ) : (
                            <p>
                                Send link
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


