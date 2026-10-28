import { Router } from 'express'
import { getProfile, profileUpdateSchema, updateProfile } from '../controllers/profileController.js'
import authenticate from '../middleware/auth.js'
import requireDatabase from '../middleware/requireDatabase.js'
import validate from '../middleware/validate.js'

const router = Router()
router.use(requireDatabase, authenticate)
router.get('/', getProfile)
router.patch('/', validate(profileUpdateSchema), updateProfile)

export default router
