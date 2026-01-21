import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAdminLog extends Document {
  adminId: mongoose.Types.ObjectId
  userId: string
  action: 'login' | 'logout' | 'password_change' | 'delete_callback' | 'delete_all_callbacks'
  details?: string
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

const AdminLogSchema = new Schema<IAdminLog>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ['login', 'logout', 'password_change', 'delete_callback', 'delete_all_callbacks'],
      required: true,
    },
    details: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
AdminLogSchema.index({ adminId: 1, createdAt: -1 })
AdminLogSchema.index({ action: 1, createdAt: -1 })

const AdminLog = mongoose.models.AdminLog || mongoose.model<IAdminLog>('AdminLog', AdminLogSchema)

export default AdminLog
