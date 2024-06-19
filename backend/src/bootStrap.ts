import express from "express";
import baseRouter from './api';
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { env } from "./utils/env";
import prisma from './utils/prisma';
async function bootStrap() {

    const app = express()
    app.use("/api/v1/", baseRouter)

    await prisma.$connect()
    console.log("Pg :: Database connected ")
    const server = app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`)
    })

    // Function used to shut down the server  graceful
    function killServer() {

        server.close()
        // Disconnect the database
        prisma.$disconnect()
            .then(() => {
                console.log("Database disconnected")
            })
        // Then close the server 
        server.close((err) => {
            if (err) {
                console.log(err.message)
            }
            else {
                console.log("Server shut down gracefully")
            }
        })
    }

    return {
        killServer
    }
}

export default bootStrap