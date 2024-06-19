import cors from 'cors';
import { Router, json } from "express";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { authModule, booksModule } from "./modules";

const api = Router()

// Global middlewares
api.use(json())
api.options("*", cors())

api.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.status(200)
    //     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //     res.append('Access-Control-Allow-Headers', ['Content-Type','Authorization']);
    next();
});
api.use(morgan("common"))
// app modules
api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
api.use('/auth', authModule
    /*
        #swagger.tags = ['Students-Auth']
        #swagger.security = [{  }] 
    */
)

api.use('/books', booksModule
    /*
   #swagger.tags = ['Books'
     #swagger.security = [{
           "bearerAuth": []
      }] 
     */
)

export default api