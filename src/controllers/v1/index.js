import { Router } from 'express'
import registerRouter from './register'
import loginRouter from './login'

const router = Router()

// this is where we are going to register all of our controllers like the register, login, logout, and token controllers
router.use(registerRouter)
router.use(loginRouter)

export default router;