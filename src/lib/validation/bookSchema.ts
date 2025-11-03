




import {z} from "zod"

export const bookSchema = z.object({
    bookId: z.string().optional(),
    title: z.string().min(1, "Title is required").max(100),
    author: z.string().min(1, "Author is required").max(100),
    pages: z.number().min(1, "Pages must be greater than 0"),
    bookStatus: z.enum(["READ", "READING", "QUEUED"]),
    currentPage: z.number().min(0),
    categories: z.array(z.object({
        id: z.string().uuid(),
        value: z.string(),
    })),
});

export type BookInput = z.infer<typeof bookSchema>;