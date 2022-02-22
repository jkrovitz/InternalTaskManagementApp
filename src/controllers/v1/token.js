import { Router } from 'express'
import models from '../../models'
import asyncWrapper from '../../utils/asyncWrapper'
import JWTUtils from '../../utils/jwt-utils'
import requiresAuth from '../../middlewares/requiresAuth'

const router = Router()
const { User, RefreshToken } = models

router.post(
  '/token',
  requiresAuth('refreshToken'), // if we're making a request and it doesn't contain a token or it is malformed or anything than the logic below won't be executed.
  asyncWrapper(async (req, res) => {
    const{jwt: {email},
    } = req.body
    const user = await User.findOne(
      {where: {email},
        include: RefreshToken,
      })
    const savedToken = user.RefreshToken

    if (!savedToken || !savedToken.token) {
      return res
        .status(401)
        .send({ success: false, message: 'You must login first' })
    }

      const payload = {email}
      const newAccessToken = JWTUtils.generateAccessToken(payload)

      return res.status(200).send({success: true, data: {accessToken : newAccessToken}})
  })
)

export default router