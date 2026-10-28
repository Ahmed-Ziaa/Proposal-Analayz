import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true, maxlength: 160 },
  description: { type: String, trim: true, default: '', maxlength: 2000 },
  link: { type: String, trim: true, default: '', maxlength: 500 }
}, { _id: true })

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true, maxlength: 254 },
  password: { type: String, required: true, select: false },
  title: { type: String, trim: true, default: '', maxlength: 160 },
  bio: { type: String, trim: true, default: '', maxlength: 3000 },
  skills: { type: [{ type: String, trim: true, maxlength: 80 }], default: [] },
  experience: { type: Number, min: 0, max: 80, default: 0 },
  projects: { type: [projectSchema], default: [] }
}, { timestamps: true, toJSON: { transform: (_doc, ret) => { delete ret.password; delete ret.__v; return ret } } })

const User = mongoose.model('User', userSchema)
export default User
