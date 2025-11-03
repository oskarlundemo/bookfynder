"use client"
import * as React from "react"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

type Props = {
    bookStatus: string;
    setBookStatus: (status: string) => void;
    disabled?: boolean;
}

export function BookStatus ({bookStatus, disabled = false, setBookStatus} : Props): React.ReactElement {

    return (
        <div className="w-full flex-row max-w-md">
            <FieldGroup>
                <FieldSet>
                    <FieldLabel htmlFor="compute-environment-p8w">
                        Book status *
                    </FieldLabel>
                    <FieldDescription>
                        Select the status for this book
                    </FieldDescription>
                    <RadioGroup defaultValue={`${bookStatus ? bookStatus : 'read'}`}>
                        <FieldLabel htmlFor="read-r2h">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>Read</FieldTitle>
                                    <FieldDescription>
                                        I have already read this book.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem disabled={disabled} onClick={() => setBookStatus("READ")} value="READ" id="read-r2h" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="reading-z4k">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>Reading</FieldTitle>
                                    <FieldDescription>
                                        I am currently reading this book.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem disabled={disabled} onClick={() => setBookStatus("READING")} value="READING" id="reading-z4k" />
                            </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="que-z4k">
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>Queue</FieldTitle>
                                    <FieldDescription>
                                        I want to read this book in the future.
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem disabled={disabled} onClick={() => setBookStatus("QUEUED")} value="QUEUED" id="que-z4k" />
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </FieldSet>
            </FieldGroup>
        </div>
    )
}