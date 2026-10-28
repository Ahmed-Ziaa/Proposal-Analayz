import mongoose from 'mongoose'

const compatibilitySchema = new mongoose.Schema({
  summary: { type: String, required: true, trim: true, maxlength: 300 },
  explanation: { type: String, required: true, trim: true, maxlength: 3000 }
}, { _id: false })

const interviewQuestionSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true, maxlength: 80 },
  question: { type: String, required: true, trim: true, maxlength: 500 },
  answer: { type: String, required: true, trim: true, maxlength: 3000 }
}, { _id: false })

const jobAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jobDescription: { type: String, required: true, trim: true, maxlength: 30000 },
  jobTitle: { type: String, required: true, trim: true, maxlength: 200 },
  requiredSkills: { type: [{ type: String, trim: true, maxlength: 100 }], default: [] },
  preferredSkills: { type: [{ type: String, trim: true, maxlength: 100 }], default: [] },
  responsibilities: { type: [{ type: String, trim: true, maxlength: 500 }], default: [] },
  missingSkills: { type: [{ type: String, trim: true, maxlength: 100 }], default: [] },
  compatibilityAnalysis: { type: compatibilitySchema, required: true },
  compatibilityPercentage: { type: Number, required: true, min: 0, max: 100 },
  proposal: { type: String, trim: true, default: '', maxlength: 12000 },
  interviewQuestions: { type: [interviewQuestionSchema], default: [] }
}, { timestamps: true })

jobAnalysisSchema.index({ userId: 1, createdAt: -1 })
jobAnalysisSchema.index({ jobTitle: 'text', jobDescription: 'text' })

const JobAnalysis = mongoose.model('JobAnalysis', jobAnalysisSchema)
export default JobAnalysis
