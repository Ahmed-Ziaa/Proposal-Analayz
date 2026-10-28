import mongoose from 'mongoose'

mongoose.set('bufferCommands', false)

export const isDatabaseReady = () => mongoose.connection.readyState === 1

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('MONGODB_URI is not set. API is running in degraded mode; database routes will return 503.')
    return false
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  console.info('Connected to MongoDB.')
  return true
}

export async function closeDatabase() {
  await mongoose.disconnect()
}
