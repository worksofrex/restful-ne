import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "../../@types/IResponse"
import { errorHandler } from "../../middlewares/errorHandler"
import { createJwtToken } from "../../utils/authMiddleware"
import prisma from "../../utils/prisma"
import { CreateStudentSchema, LoginStudentSchema } from "./schemas"


export async function studentSignup(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/StudentSignUpDto"
                    }  
                }
            }
        } 
    */
    try {
        const rawBody = CreateStudentSchema.parse(req.body)
        const emailTaken =  await prisma.student.findUnique({ where  : { email : rawBody.email }})
        if(emailTaken)  throw new Error("Email is taken")
        if (rawBody.password != rawBody.confirmPassword) throw new Error("Passwords mismatch")
        const hashedPassword = await bcrypt.hash(rawBody.password, 10);

        const newStudent = await prisma.student.create({
            data: {
                email: rawBody.email,
                password: hashedPassword,
                firstName: rawBody.firstName,
                lastName: rawBody.lastName,
                nationalId: rawBody.nationalId,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                nationalId: true
            }
        })

        return res.status(200).send(new ApiResponse("Sign up successful", true))

    } catch (error : any) {
       return  errorHandler(error, req, res, next)
    }
}


export async function studentLogin(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: "#/components/schemas/StudentLoginDto"
                     }  
                 }
             }
         } 
     */
    try {
        const rawBody = LoginStudentSchema.parse(req.body)
   
        const student = await prisma.student.findUnique({
            where:
                { email: rawBody.email },

            select: {
                id: true,
                email: true,
                password: true,
                lastName: true
            }
        })
        if (!student) throw new Error("Invalid credentials")
        const passwordMatches = await bcrypt.compare(rawBody.password, student.password)
        if (!passwordMatches) throw new Error("Invalid credentials")

        const token = createJwtToken({
            id: student.id,
            email: student.email
        })
        return res.status(200).send(new ApiResponse("Student logged in", true, { token, student}))
    } catch (error : any) {
        errorHandler(error, req, res, next)
    }
}