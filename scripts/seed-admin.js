// Admin Seed Script
// Run: node scripts/seed-admin.js
// This script creates an initial admin user

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local')
  process.exit(1)
}

// Admin Schema (simplified for seed script)
const AdminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  lastPasswordUpdatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

async function seedAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Default admin credentials
    // IMPORTANT: Change these after first login!
    const defaultUserId = 'admin'
    const defaultPassword = 'Admin@123'

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ userId: defaultUserId })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!')
      console.log(`   User ID: ${defaultUserId}`)
      console.log('   To reset password, delete the admin from MongoDB and run this script again.')
      process.exit(0)
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(defaultPassword, salt)

    // Create admin user
    const admin = new Admin({
      userId: defaultUserId,
      passwordHash: passwordHash,
      lastPasswordUpdatedAt: new Date(),
    })

    await admin.save()

    console.log('')
    console.log('✅ Admin user created successfully!')
    console.log('')
    console.log('========================================')
    console.log('   ADMIN LOGIN CREDENTIALS')
    console.log('========================================')
    console.log(`   User ID:  ${defaultUserId}`)
    console.log(`   Password: ${defaultPassword}`)
    console.log('========================================')
    console.log('')
    console.log('⚠️  IMPORTANT: Change your password after first login!')
    console.log('   Access admin panel at: /admin/login')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding admin:', error)
    process.exit(1)
  }
}

seedAdmin()
