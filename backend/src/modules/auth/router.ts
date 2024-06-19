import { Router } from "express";
import * as authService from "./service";

const router = Router()

router.post('/signup', authService.studentSignup)
router.post('/login', authService.studentLogin)



export default router