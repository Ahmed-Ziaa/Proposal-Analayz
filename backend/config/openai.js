import OpenAI from 'openai'
import AppError from '../utils/AppError.js'

let client

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new AppError(503, 'AI analysis is not configured. Set OPENAI_API_KEY on the backend.')
  }
  client ??= new OpenAI({ apiKey })
  return client
}
