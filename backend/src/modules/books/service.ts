import { Book } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../@types/IResponse";
import prisma from "../../utils/prisma";
import { AddBookDto } from "./schema";

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    /*  #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      $ref: "#/components/schemas/AddBookDto"
                  }  
              }
          }
      } 
  */
    try {
        const data = AddBookDto.parse(req.body)
        const book = await prisma.book.create({
            data
        })
        return res.status(201).json(new ApiResponse("Book added", true, book))
    } catch (error) {
        next(error)
    }

}

export const searchBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let searchResults: Book[] = []
        console.log(req);

        const query = new URL(`http://127.0.0.1:5317${req.originalUrl}`).searchParams.get('q')?.trim()
        if (!query || query.length == 0) {
            searchResults = await prisma.book.findMany()
        } else {
            searchResults = await prisma.book.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            })
        }


        return res.status(201).json(new ApiResponse("Search results", true, searchResults))
    } catch (error) {
        next(error)
    }
}

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let books = await prisma.book.findMany()
        return res.status(201).json(new ApiResponse("Books retrieved", true, books))
    } catch (error) {
        next(error)
    }
}