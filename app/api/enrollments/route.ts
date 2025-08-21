import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import { Enrollment } from '@/lib/models'

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()

        // Get all enrollments
        const enrollments = await Enrollment.find({}).sort({ createdAt: -1 }).limit(10)

        console.log(`Found ${enrollments.length} enrollments`)

        return NextResponse.json({
            success: true,
            count: enrollments.length,
            enrollments: enrollments.map(enrollment => ({
                id: enrollment._id,
                courseId: enrollment.courseId,
                email: enrollment.email,
                paymentId: enrollment.paymentId,
                amount: enrollment.amount,
                status: enrollment.status,
                timestamp: enrollment.timestamp,
                createdAt: enrollment.createdAt
            }))
        })
    } catch (error) {
        console.error('Error fetching enrollments:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch enrollments',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}
