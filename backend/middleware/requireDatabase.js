import mongoose from 'mongoose'
import AppError from '../utils/AppError.js'

export default function requireDatabase(_req, _res, next) {
  if (mongoose.connection.readyState !== 1) {
    return next(new AppError(503, 'Database is unavailable. Check MONGODB_URI and MongoDB connectivity.'))
  }
  return next()
}
