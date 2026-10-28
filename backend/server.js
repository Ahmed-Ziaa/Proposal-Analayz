import 'dotenv/config'
import app from './app.js'
import { closeDatabase, connectDatabase } from './config/database.js'

const port = Number(process.env.PORT) || 5001

if (process.env.NODE_ENV === 'production') {
  const missing = ['MONGODB_URI', 'JWT_SECRET', 'OPENAI_API_KEY'].filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing required production environment variables: ${missing.join(', ')}`)
  if (process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters in production.')
}

const server = app.listen(port, () => console.info(`Draftwise API listening on port ${port}.`))
connectDatabase().catch((error) => {
  console.error(`MongoDB connection failed; API remains available in degraded mode: ${error.message}`)
})

async function shutdown(signal) {
  console.info(`${signal} received. Shutting down gracefully.`)
  server.close(async () => {
    try {
      await closeDatabase()
      process.exit(0)
    } catch (error) {
      console.error(`Shutdown failed: ${error.message}`)
      process.exit(1)
    }
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
