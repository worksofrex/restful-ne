import z from "zod"

export const AddBookDto = z.object({
    name: z.string().min(1,"Name too short"),
    author: z.string().min(1, "Author name to short"),
    publisher: z.string().min(1 , "Publisher name too short"),
    publicationYear: z.number(),
    subject: z.string().min(1, "Subject name to short")
})

export const UpdateBookDto = z.object({
    name: z.string().min(1, "Name too short").nullish(),
    author: z.string().min(1).nullish(),
    publisher: z.string().min(1).nullish(),
    publicationYear: z.number().nullish(),
    subject: z.string().min(1).nullish()
})

