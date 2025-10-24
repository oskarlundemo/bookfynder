import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    placeholder?: string | number
    name?: string
    label?: string
    type?: string
    value?: any
    setValue: (value: string | number | undefined) => void
    disabled?: boolean
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

                           }: Props) => {
    return (
        <div className="grid w-full items-center gap-3">
            <Label htmlFor={name}>{name}</Label>
            <Input
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                placeholder={ placeholder ? String (placeholder) : ''}
                value={value}
                disabled={disabled}
                onChange={(e) =>
                    setValue(type === "number" ? Number(e.target.value) : e.target.value)
                }
            />
        </div>
    )
}
