import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IAdmin extends Document {
  userId: string
  passwordHash: string
  lastPasswordUpdatedAt: Date
  createdAt: Date
  updatedAt: Date
  isPasswordExpired(): boolean
  comparePassword(password: string): Promise<boolean>
}

interface IAdminMethods {
  isPasswordExpired(): boolean
  comparePassword(password: string): Promise<boolean>
}

type AdminModel = Model<IAdmin, {}, IAdminMethods>

const AdminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'User ID must be at least 3 characters'],
      maxlength: [50, 'User ID cannot exceed 50 characters'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    lastPasswordUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Check if password is expired (30 days)
AdminSchema.methods.isPasswordExpired = function (): boolean {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return this.lastPasswordUpdatedAt < thirtyDaysAgo
}

// Compare password with hash
AdminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.passwordHash)
}

// Hash password before saving
AdminSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) {
    return
  }
  
  // Only hash if it's not already hashed (check for bcrypt hash format)
  if (!this.passwordHash.startsWith('$2a$') && !this.passwordHash.startsWith('$2b$')) {
    const salt = await bcrypt.genSalt(12)
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
  }
})

// Prevent model recompilation in development
const Admin = mongoose.models.Admin || mongoose.model<IAdmin, AdminModel>('Admin', AdminSchema)

export default Admin
