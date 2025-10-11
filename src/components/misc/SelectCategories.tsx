"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const frameworks = [

    {
        value: "next.js",
        label: "Next.js",
    },

    {
        value: "sveltekit",
        label: "SvelteKit",
    },

    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },

    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },

]


type Props = {
    categories: Category[];
    selectedCategories: Category[],
    setSelectedCategories: (categories: Category[]) => void;
}

export function SelectCategories ({categories, setSelectedCategories, selectedCategories}: Props) {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [formattedCategories, setFormattedCategories] = React.useState< { value: string; label: string; selected: boolean }[] >([]);

    React.useEffect(() => {
        const formatted = categories.map((cat) => ({ value: cat.name, label: cat.name, id: cat.id})); setFormattedCategories(formatted);
        }, [categories]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCategories.length > 0 ? (
                        selectedCategories.map(cat => cat.value).join(", ")
                    ) : (
                        "Select Categories"
                    )}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search categories..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                            {formattedCategories.map((category, index) => (
                                <CommandItem
                                    key={index}
                                    value={category.label}
                                    onSelect={(currentValue) => {

                                        setValue(currentValue === value ? "" : currentValue)

                                        setSelectedCategories((prev) => {
                                            // Check if category is already selected
                                            const exists = prev.some(cat => cat.id === category.id);

                                            if (exists) {
                                                // Remove it
                                                return prev.filter(cat => cat.id !== category.id);
                                            } else {
                                                // Add it
                                                return [...prev, category];
                                            }
                                        });
                                    }}
                                >
                                    {category.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedCategories.some(cat => cat.id === category.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
