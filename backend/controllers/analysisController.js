import { z } from 'zod'
import JobAnalysis from '../models/JobAnalysis.js'
import AppError from '../utils/AppError.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { analyzeJob, generateInterviewQuestions, generateProposal } from '../services/aiService.js'

export const createAnalysisSchema = z.object({ jobDescription: z.string().trim().min(80).max(30000) }).strict()
export const proposalOptionsSchema = z.object({ tone: z.string().trim().min(2).max(60).optional() }).strict()
export const historyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).optional()
})

const normalizeSkill = (skill) => skill.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

export const createAnalysis = asyncHandler(async (req, res) => {
  const { jobDescription } = req.validatedBody
  const result = await analyzeJob(jobDescription, req.user)
  const profileSkills = new Set(req.user.skills.map(normalizeSkill))
  const missingSkills = result.requiredSkills.filter((skill) => !profileSkills.has(normalizeSkill(skill)))
  const analysis = await JobAnalysis.create({ userId: req.user._id, jobDescription, ...result, missingSkills })
  res.status(201).json({ success: true, message: 'Job analysis completed.', data: { analysis } })
})

export const listAnalyses = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.validatedQuery
  const filter = { userId: req.user._id }
  if (search) filter.$or = [
    { jobTitle: { $regex: escapeRegex(search), $options: 'i' } },
    { jobDescription: { $regex: escapeRegex(search), $options: 'i' } }
  ]
  const [items, total] = await Promise.all([
    JobAnalysis.find(filter).select('-jobDescription').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    JobAnalysis.countDocuments(filter)
  ])
  res.json({ success: true, data: { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } })
})

function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

async function findOwnedAnalysis(req) {
  const analysis = await JobAnalysis.findOne({ _id: req.params.id, userId: req.user._id })
  if (!analysis) throw new AppError(404, 'Analysis not found.')
  return analysis
}

export const getAnalysis = asyncHandler(async (req, res) => {
  const analysis = await findOwnedAnalysis(req)
  res.json({ success: true, data: { analysis } })
})

export const createProposal = asyncHandler(async (req, res) => {
  const analysis = await findOwnedAnalysis(req)
  const { tone = 'professional and warm' } = req.validatedBody
  const { proposal } = await generateProposal(analysis, req.user, tone)
  analysis.proposal = proposal
  await analysis.save()
  res.json({ success: true, message: 'Proposal generated.', data: { proposal, analysisId: analysis._id } })
})

export const createInterviewQuestions = asyncHandler(async (req, res) => {
  const analysis = await findOwnedAnalysis(req)
  const { questions } = await generateInterviewQuestions(analysis, req.user)
  analysis.interviewQuestions = questions
  await analysis.save()
  res.json({ success: true, message: 'Interview questions generated.', data: { questions, analysisId: analysis._id } })
})

export const listHistory = listAnalyses
