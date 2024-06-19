import z from "zod"

export const CreateStudentSchema = z.object({
    firstName: z.string().min(2, "First name too short"),
    lastName: z.string().min(2,"Last name too short"),
    email: z.string().email("Invalid email"),
    nationalId : z.string().length(16,"Invalid national Id"),
    password: z.string().min(8,"Use a strong password"),
    confirmPassword: z.string().min(8, "Use a strong password"),
})


export const LoginStudentSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})