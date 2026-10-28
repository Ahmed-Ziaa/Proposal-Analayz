import { Router } from 'express'
import { createAnalysis, createAnalysisSchema, createInterviewQuestions, createProposal, getAnalysis, historyQuerySchema, listAnalyses, proposalOptionsSchema } from '../controllers/analysisController.js'
import authenticate from '../middleware/auth.js'
import requireDatabase from '../middleware/requireDatabase.js'
import validate from '../middleware/validate.js'

const router = Router()
router.use(requireDatabase, authenticate)
router.post('/', validate(createAnalysisSchema), createAnalysis)
router.get('/', validate(historyQuerySchema, 'query'), listAnalyses)
router.get('/history', validate(historyQuerySchema, 'query'), listAnalyses)
router.get('/:id', getAnalysis)
router.post('/:id/proposal', validate(proposalOptionsSchema), createProposal)
router.post('/:id/interview-questions', createInterviewQuestions)

export default router
