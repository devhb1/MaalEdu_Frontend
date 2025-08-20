import { NextRequest, NextResponse } from 'next/server'
import { EnrollmentRequest, EnrollmentResponse } from '@/lib/types'
import { getCourseById } from '@/lib/courses'
import { z } from 'zod'
import connectToDatabase from '@/lib/db'
import { Enrollment } from '@/lib/models'

const enrollmentSchema = z.object({
    courseId: z.string().min(1, 'Course ID is required').regex(/^[a-zA-Z0-9-_]+$/, 'Course ID must contain only letters, numbers, hyphens, and underscores'),
    email: z.string().email('Valid email is required')
})

export async function POST(request: NextRequest) {
    try {
        const body: EnrollmentRequest = await request.json()

        // Validate request body
        const validatedData = enrollmentSchema.parse(body)
        const { courseId, email } = validatedData

        // Verify course exists
        const course = getCourseById(courseId)
        if (!course) {
            return NextResponse.json(
                { success: false, message: 'Course not found' },
                { status: 404 }
            )
        }

        // Connect to database
        await connectToDatabase()

        // Check if user has paid for this course
        const enrollment = await Enrollment.findOne({
            courseId,
            email: email.toLowerCase(),
            status: 'paid'
        })

        if (!enrollment) {
            return NextResponse.json(
                { success: false, message: 'No valid enrollment found. Please complete payment first.' },
                { status: 403 }
            )
        }

        // Log enrollment request for now
        console.log('=== ENROLLMENT REQUEST ===')
        console.log('Course ID:', courseId)
        console.log('Course Title:', course.title)
        console.log('Student Email:', email)
        console.log('Enrollment ID:', enrollment._id)
        console.log('Payment ID:', enrollment.paymentId)
        console.log('Amount Paid:', enrollment.amount)
        console.log('Enrollment Date:', enrollment.timestamp)
        console.log('========================')

        // TODO: Integrate with Open edX API
        // This is where you would call the Open edX enrollment API
        // Example implementation:
        /*
        const openEdxResponse = await enrollInOpenEdX({
          courseId,
          email,
          courseName: course.title
        })
        
        if (!openEdxResponse.success) {
          throw new Error('Failed to enroll in Open edX')
        }
        */

        // For now, simulate successful enrollment
        const mockEnrollmentId = `enroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        const response: EnrollmentResponse = {
            success: true,
            message: `Successfully enrolled ${email} in ${course.title}`,
            enrollmentId: mockEnrollmentId
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Enrollment API Error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Invalid request data', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Future Open edX integration function
async function enrollInOpenEdX(params: {
    courseId: string
    email: string
    courseName: string
}) {
    // This function will be implemented when integrating with Open edX
    // Example implementation:
    /*
    const { courseId, email, courseName } = params
    
    const response = await fetch(`${process.env.OPEN_EDX_BASE_URL}/api/enrollment/v1/enrollment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_EDX_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        course_id: courseId,
        user: email,
        mode: 'honor', // or 'verified' for paid courses
        is_active: true
      })
    })
    
    if (!response.ok) {
      throw new Error(`Open edX enrollment failed: ${response.statusText}`)
    }
    
    return await response.json()
    */

    return { success: true }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}
