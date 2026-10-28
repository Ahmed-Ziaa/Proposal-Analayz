import { z } from 'zod'
import User from '../models/User.js'
import asyncHandler from '../middleware/asyncHandler.js'

const projectSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(2000).optional().default(''),
  link: z.string().trim().max(500).optional().default('')
}).strict()

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  title: z.string().trim().max(160).optional(),
  bio: z.string().trim().max(3000).optional(),
  skills: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
  experience: z.number().min(0).max(80).optional(),
  projects: z.array(projectSchema).max(30).optional()
}).strict().refine((value) => Object.keys(value).length > 0, { message: 'At least one profile field is required.' })

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: req.user.toJSON() } })
})

export const updateProfile = asyncHandler(async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user._id, { $set: req.validatedBody }, { new: true, runValidators: true })
  res.json({ success: true, message: 'Profile updated.', data: { user: updated.toJSON() } })
})
