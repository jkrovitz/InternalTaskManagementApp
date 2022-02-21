import { Router } from 'express'
import models from '../../models'
import asyncWrapper from '../../utils/asyncWrapper'
import JWTUtils from '../../utils/jwt-utils'

const router = Router()
const { User } = models

router.post('/login', asyncWrapper(async(req, res) => {

  const { email, password } = req.body // we get the email and password from the request body
  const user = await User.scope('password').findOne({ where: { email } })
  if (!user || !(await user.comparePasswords(password))) { //The body of the if block will be executed if the email or password are incorrect
    return res
      .status(401)
      .send({ success: false, message: 'Invalid credentials' })
  }

  const payload = { email }
  const accessToken = JWTUtils.generateAccessToken(payload)
  const savedRefreshToken = await user.getRefreshToken()
  let refreshToken

  if (!savedRefreshToken || !savedRefreshToken.token) { // if there isn't a token in the refreshToken table  or if there is a record but the token field is null or empty
    refreshToken = JWTUtils.generateRefreshToken(payload) // generate refresh token if there isn't one or if the token field is null or empty

    if (!savedRefreshToken) { // if we don't have a refresh token saved to a table
      await user.createRefreshToken({ token: refreshToken }) // if there isn't a record of a refresh token in the database, one is created
    } else { // if there is a record in the database
      savedRefreshToken.token = refreshToken; /// we're going to save that new token in the token fields
      await savedRefreshToken.save()
    }
  } else {
    refreshToken = savedRefreshToken.token // only if the two conditions are met, we assign the refresh token to the saved refresh token
  }
  return res.status(200).send({
    succcess: true,
    message: 'Successfully logged in',
    data: { accessToken, refreshToken }
    // if we wanted we could pass email: user.email, username: user.username' here 
  })
}))

export default router;