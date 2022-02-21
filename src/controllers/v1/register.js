import { Router } from 'express'
import models from '../../models'
import asyncWrapper from '../../utils/asyncWrapper'
import JWTUtils from '../../utils/jwt-utils'

const router = Router()
const { User } = models

router.post('/register', asyncWrapper(async(req, res) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })

    if (user) {
        return res.status(200).send({ sucess: false, message: 'User already exists' })
    }

    const payload = { email }
    const accessToken = JWTUtils.generateAccessToken(payload) // we are generating an access token for a new user
    const refreshToken = JWTUtils.generateRefreshToken(payload) // we are generating a refresh token for a new user
    await User.createNewUser({...req.body, refreshToken }) // pass all of the day in the request body and the refreshToken

    // if this doesn't fail
    return res.status(200).send({
        success: true,
        message: 'User successfully registered',
        data: {
            accessToken,
            refreshToken
        }
    })

}))

export default router;