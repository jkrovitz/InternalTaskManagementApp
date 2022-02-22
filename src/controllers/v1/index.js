import { Router } from 'express'
import registerRouter from './register'
import loginRouter from './login'
import tokenRouter from './token'
import logoutRouter from './logout'
import taskRouter from './task'

const router = Router()

// this is where we are going to register all of our controllers like the register, login, logout, and token controllers
router.use(registerRouter)
router.use(loginRouter)
router.use(tokenRouter)
router.use(logoutRouter)
router.use(taskRouter)

export default router;