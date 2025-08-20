import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getCourseById } from '@/lib/courses'
import { CheckoutRequest, CheckoutResponse } from '@/lib/types'
import { z } from 'zod'

const checkoutSchema = z.object({
    courseId: z.string().min(1, 'Course ID is required').regex(/^[a-zA-Z0-9-_]+$/, 'Course ID must contain only letters, numbers, hyphens, and underscores'),
    email: z.string().email('Valid email is required')
})

export async function POST(request: NextRequest) {
    try {
        const body: CheckoutRequest = await request.json()

        // Validate request body
        const validatedData = checkoutSchema.parse(body)
        const { courseId, email } = validatedData

        // Get course details
        const course = getCourseById(courseId)
        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            )
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: course.title,
                            description: course.description,
                            images: course.image ? [course.image] : undefined,
                        },
                        unit_amount: Math.round(course.price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            customer_email: email,
            metadata: {
                courseId,
                email,
            },
            billing_address_collection: 'required',
            payment_intent_data: {
                metadata: {
                    courseId,
                    email,
                },
            },
        })

        if (!session.url) {
            throw new Error('Failed to create checkout session')
        }

        const response: CheckoutResponse = {
            checkoutUrl: session.url,
            sessionId: session.id,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Checkout API Error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request data', details: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}
