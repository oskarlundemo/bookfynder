



type Props = {
    placeholder?: string
    name?: string
    label?: string
    type?: string
    value?: string
    setValue: (value: string) => void
    icon?: any
}


export const InputField = ({placeholder, value, name, setValue, icon, type}:Props) => {

    return (
        <fieldset className="custom-input p-4 rounded-md">
            <legend className="px-2 text-sm font-medium">{name}</legend>
            <input
                id={`input-${name}`}
                className="custom-input-field"
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                type={type}
            />

            {icon && (
                (icon)
            )}

        </fieldset>
    )
}