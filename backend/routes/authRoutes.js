import { Router } from 'express'
import { login, register } from '../controllers/authController.js'
import requireDatabase from '../middleware/requireDatabase.js'
import { authLimiter } from '../middleware/rateLimiters.js'

const router = Router()
router.use(authLimiter, requireDatabase)
router.post('/register', register)
router.post('/login', login)

export default router
