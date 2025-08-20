import mongoose from 'mongoose'
import { CourseEnrollment } from './types'

const enrollmentSchema = new mongoose.Schema<CourseEnrollment>({
    courseId: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    paymentId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'pending',
        index: true
    },
    timestamp: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    }
}, {
    timestamps: true,
    collection: 'enrollments'
})

// Create compound indexes for better query performance
enrollmentSchema.index({ courseId: 1, email: 1 })
enrollmentSchema.index({ status: 1, timestamp: -1 })

export const Enrollment = mongoose.models.Enrollment || mongoose.model<CourseEnrollment>('Enrollment', enrollmentSchema)
