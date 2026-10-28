import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import AppError from './utils/AppError.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean)

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new AppError(403, 'This origin is not allowed by CORS.'))
  },
  credentials: true
}))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false, limit: '1mb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-8', legacyHeaders: false }))

app.get('/api/health', (_req, res) => {
  const ready = mongoose.connection.readyState === 1
  res.status(ready ? 200 : 503).json({
    success: ready,
    data: { status: ready ? 'ok' : 'degraded', database: ready ? 'connected' : 'disconnected' }
  })
})
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/analyses', analysisRoutes)
app.use((_req, _res, next) => next(new AppError(404, 'Route not found.')))
app.use(errorHandler)

export default app
