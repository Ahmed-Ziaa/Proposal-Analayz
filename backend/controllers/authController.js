import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import asyncHandler from '../middleware/asyncHandler.js'

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128)
})
const loginSchema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) })

function assertJwtConfigured() {
  if (!process.env.JWT_SECRET) throw new AppError(503, 'Authentication is not configured. Set JWT_SECRET on the backend.')
}

function createToken(userId) {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

export const register = asyncHandler(async (req, res) => {
  assertJwtConfigured()
  const input = registerSchema.parse(req.body)
  const user = await User.create({ name: input.name, email: input.email.toLowerCase(), password: await bcrypt.hash(input.password, 12) })
  res.status(201).json({ success: true, message: 'Account created.', data: { user: user.toJSON(), token: createToken(user._id) } })
})

export const login = asyncHandler(async (req, res) => {
  assertJwtConfigured()
  const input = loginSchema.parse(req.body)
  const user = await User.findOne({ email: input.email.toLowerCase() }).select('+password')
  if (!user || !(await bcrypt.compare(input.password, user.password))) throw new AppError(401, 'Email or password is incorrect.')
  res.json({ success: true, message: 'Signed in successfully.', data: { user: user.toJSON(), token: createToken(user._id) } })
})
