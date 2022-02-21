import { Router } from 'express'
import registerRouter from './register'

const router = Router()

// this is where we are going to register all of our controllers like the register login, logout, and token controllers
router.use(registerRouter)

export default router;