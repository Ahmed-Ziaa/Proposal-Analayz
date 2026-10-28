import { ZodError } from 'zod'
import AppError from '../utils/AppError.js'

export default function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: { message: 'Request validation failed.', details: error.issues.map(({ path, message }) => ({ field: path.join('.'), message })) }
    })
  }

  if (error?.code === 11000) {
    return res.status(409).json({ success: false, error: { message: 'An account with this email already exists.' } })
  }
  if (error?.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: { message: 'Database validation failed.', details: Object.values(error.errors).map((item) => item.message) } })
  }
  if (error?.name === 'CastError') {
    return res.status(400).json({ success: false, error: { message: 'Invalid resource identifier.' } })
  }
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ success: false, error: { message: 'Request body is too large.' } })
  }
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ success: false, error: { message: 'Request body must contain valid JSON.' } })
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500
  const message = error instanceof AppError ? error.message : 'An unexpected server error occurred.'
  if (!(error instanceof AppError) || statusCode >= 500) console.error(error)
  return res.status(statusCode).json({
    success: false,
    error: { message, ...(error instanceof AppError && error.details ? { details: error.details } : {}) }
  })
}
