




import {z} from "zod"

export const bookSchema = z.object({
    bookId: z.string().optional(),
    title: z.string().min(1, "Title is required").max(100),
    author: z.string().min(1, "Author is required").max(100),
    pages: z.number().min(1, "Pages must be greater than 0"),
    bookStatus: z.enum(["READ", "READING", "QUEUED"]),
    currentPage: z.number().min(0).max(100000),

    categories: z.array(z.object({
        id: z.string(),
        name: z.string(),
    }))
        .min(1, "You need to select at least one category")
        .max(5, "You can select at most 5 categories")
});

export type BookInput = z.infer<typeof bookSchema>;