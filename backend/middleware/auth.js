import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import asyncHandler from './asyncHandler.js'

export default asyncHandler(async (req, _res, next) => {
  const authorization = req.get('authorization')
  if (!authorization?.startsWith('Bearer ')) throw new AppError(401, 'Authentication token is required.')
  if (!process.env.JWT_SECRET) throw new AppError(503, 'Authentication is not configured. Set JWT_SECRET on the backend.')

  let payload
  try {
    payload = jwt.verify(authorization.slice(7), process.env.JWT_SECRET)
  } catch {
    throw new AppError(401, 'Authentication token is invalid or expired.')
  }

  const user = await User.findById(payload.sub)
  if (!user) throw new AppError(401, 'The account for this token no longer exists.')
  req.user = user
  next()
})
