import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import { Enrollment } from '@/lib/models'

export async function POST(request: NextRequest) {
    try {
        const { courseId, email, paymentId, amount } = await request.json()

        console.log('🧪 Testing enrollment creation with data:', {
            courseId,
            email,
            paymentId,
            amount
        })

        // Connect to database
        console.log('🔗 Connecting to MongoDB...')
        await connectToDatabase()
        console.log('✅ MongoDB connected successfully')

        // Create test enrollment record
        const enrollmentData = {
            courseId: courseId || 'test-course-123',
            email: email || 'test@example.com',
            paymentId: paymentId || 'test_payment_' + Date.now(),
            amount: amount || 199.99,
            status: 'paid' as const,
            timestamp: new Date().toISOString()
        }

        console.log('📋 Creating enrollment with data:', enrollmentData)

        const enrollment = new Enrollment(enrollmentData)
        const savedEnrollment = await enrollment.save()

        console.log('✅ Test enrollment saved successfully:', savedEnrollment._id)

        return NextResponse.json({
            success: true,
            message: 'Test enrollment created successfully',
            enrollment: {
                id: savedEnrollment._id,
                courseId: savedEnrollment.courseId,
                email: savedEnrollment.email,
                paymentId: savedEnrollment.paymentId,
                amount: savedEnrollment.amount,
                status: savedEnrollment.status,
                timestamp: savedEnrollment.timestamp
            }
        })
    } catch (error) {
        console.error('💥 Error creating test enrollment:', error)
        return NextResponse.json(
            {
                error: 'Failed to create test enrollment',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Test enrollment endpoint. Use POST to create a test enrollment.',
        example: {
            method: 'POST',
            body: {
                courseId: 'blockchain-fundamentals-101',
                email: 'test@example.com',
                paymentId: 'pi_test_123',
                amount: 199.99
            }
        }
    })
}
