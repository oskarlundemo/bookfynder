




import {z} from "zod"

export const bookSchema = z.object({
    bookId: z.string().optional(),
    title: z.string().min(1, "Title is required").max(100, "The length of the book title can not exceed 100 characters"),
    author: z.string().min(1, "Author is required").max(100, 'The name of the author can not exceed 100 characters'),
    pages: z.number().min(1, "Pages must be greater than 0").max(10000, "Pages can not be greater than 10 000"),
    bookStatus: z.enum(["READ", "READING", "QUEUED"], "You must select a status for this book"),
    currentPage: z.number().min(0).max(10000, "Page limit of 10000").optional(),

    categories: z.array(z.object({
        id: z.string(),
        name: z.string(),
    }))
        .min(1, "You need to select at least one category")
        .max(5, "You can select at most 5 categories")
});

export type BookInput = z.infer<typeof bookSchema>;