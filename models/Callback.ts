import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICallback extends Document {
  name: string
  phone: string
  email?: string
  message?: string
  product?: string
  status: 'pending' | 'contacted' | 'completed'
  createdAt: Date
  updatedAt: Date
}

const CallbackSchema = new Schema<ICallback>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^[+]?[\d\s-]{10,}$/.test(v)
        },
        message: 'Invalid phone number format',
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
        },
        message: 'Invalid email format',
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    product: {
      type: String,
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
CallbackSchema.index({ status: 1 })
CallbackSchema.index({ createdAt: -1 })
CallbackSchema.index({ phone: 1 })

const Callback: Model<ICallback> =
  mongoose.models.Callback || mongoose.model<ICallback>('Callback', CallbackSchema)

export default Callback
