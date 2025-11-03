import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useEffect, useState} from "react"

type Props = {
    placeholder?: string | number
    name?: string
    label?: string
    type?: string
    value?: any
    setValue: (value: string | number | undefined) => void
    disabled?: boolean
    maxLength?: number
    maxNumber?: number
    onBlur?: () => void
    onFocus?: () => void
}

export const InputField = ({
                               placeholder,
                               disabled = false,
                               onFocus,
                               onBlur,
                               value,
                               name,
                               setValue,
                               type,
                               maxLength,
                                maxNumber,
                           }: Props) => {

    const [inputLength, setInputLength] = useState<number>(0);

    return (
        <div className="grid w-full items-center gap-3">
            <Label htmlFor={name}>{name}
                {maxLength && (
                    <p
                        className={`ml-auto transition-all duration-200 ease-in-out ${
                            inputLength >= maxLength
                                ? "text-red-500 scale-110 font-semibold"
                                : "text-muted-foreground scale-100"
                        }`}
                    >
                        {inputLength} / {maxLength}
                    </p>
                )}
            </Label>

            <Input
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                placeholder={ placeholder ? String (placeholder) : ''}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    const newValue = type === "number" ? Number(e.target.value) : e.target.value;
                    setValue(newValue);
                    setInputLength(String(newValue).length);
                }}
                maxLength={maxLength}
            />
        </div>
    )
}
