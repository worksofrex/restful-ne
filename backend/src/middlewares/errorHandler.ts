import type { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let message = err.message;
  if (err.name === "ZodError") {
      message = err.errors[0].message || "Invalid data";
  }
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    return res.json({
      success: false,
      message: message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }