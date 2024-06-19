import { Router } from "express";
import * as booksService from "./service";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router()

router.use(authMiddleware)
router.post('/', booksService.addBook)
router.get('/search', booksService.searchBook)
router.get('/', booksService.getAllBooks)



export default router