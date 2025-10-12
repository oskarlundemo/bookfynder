import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    placeholder?: string | number
    name?: string
    label?: string
    type?: string
    value?: any;
    setValue: (value: string | number | undefined) => void

    onBlur?: () => void
    onFocus?: () => void
}


export const InputField = ({placeholder, onFocus, onBlur, value, name, setValue, type}:Props) => {

    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">{name}</Label>
            <Input
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e =>
                    setValue(type === "number" ? Number(e.target.value) : e.target.value)
                }
            />
        </div>
    )
}