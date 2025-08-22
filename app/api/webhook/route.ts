import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import connectToDatabase from '@/lib/db'
import { Enrollment } from '@/lib/models'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables')
}

export async function POST(request: NextRequest) {
    console.log('🎯 Stripe webhook received at:', new Date().toISOString())

    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        if (!signature) {
            console.error('❌ Missing stripe-signature header')
            return NextResponse.json(
                { error: 'Missing stripe-signature header' },
                { status: 400 }
            )
        }

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret!)
            console.log('✅ Webhook verified:', event.type, event.id)
        } catch (err) {
            console.error('❌ Webhook signature verification failed:', err)
            return NextResponse.json(
                { error: 'Webhook signature verification failed' },
                { status: 400 }
            )
        }

        console.log(`📨 Processing event: ${event.type}, ID: ${event.id}`)

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded': {
                console.log('💰 Payment intent succeeded - processing enrollment')
                const paymentIntent = event.data.object as Stripe.PaymentIntent
                await handleSuccessfulPayment(paymentIntent)
                break
            }
            case 'checkout.session.completed': {
                console.log('🛒 Checkout session completed - processing enrollment')
                const session = event.data.object as Stripe.Checkout.Session
                await handleCheckoutSessionCompleted(session)
                break
            }
            default: {
                console.log(`⚠️ Unhandled event type: ${event.type}`)
            }
        }

        console.log('✅ Webhook processed successfully')
        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('💥 Webhook handler error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
    try {
        console.log('🔍 Payment Intent Details:')
        console.log('  - ID:', paymentIntent.id)
        console.log('  - Amount:', paymentIntent.amount)
        console.log('  - Status:', paymentIntent.status)
        console.log('  - Metadata:', JSON.stringify(paymentIntent.metadata, null, 2))

        const { courseId, email } = paymentIntent.metadata

        if (!courseId || !email) {
            console.error('❌ Missing metadata in payment intent:', paymentIntent.id)
            console.error('  - courseId:', courseId)
            console.error('  - email:', email)
            return
        }

        console.log(`✅ Processing successful payment for course ${courseId}, email ${email}`)

        // Connect to database
        console.log('🔗 Connecting to MongoDB...')
        await connectToDatabase()
        console.log('✅ MongoDB connected successfully')

        // Check if enrollment already exists
        console.log('🔍 Checking for existing enrollment...')
        const existingEnrollment = await Enrollment.findOne({
            paymentId: paymentIntent.id
        })

        if (existingEnrollment) {
            console.log('⚠️ Enrollment already exists for payment:', paymentIntent.id)
            return
        }

        console.log('💾 📊 SAVING TO MONGODB IN REAL-TIME...')

        // Create enrollment record
        const enrollmentData = {
            courseId,
            email: email.toLowerCase(),
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert from cents
            status: 'paid' as const,
            timestamp: new Date().toISOString()
        }

        console.log('📋 Real-time enrollment data:', JSON.stringify(enrollmentData, null, 2))

        const enrollment = new Enrollment(enrollmentData)

        const savedEnrollment = await enrollment.save()
        console.log('✅ 🎉 MONGODB SAVE SUCCESSFUL!')
        console.log('🆔 Enrollment ID:', savedEnrollment._id)
        console.log('📧 Student Email:', savedEnrollment.email)
        console.log('� Course ID:', savedEnrollment.courseId)
        console.log('💰 Amount Paid: $', savedEnrollment.amount)

        // Call enrollment API with payment data
        console.log('🎓 📡 SENDING TO OPENEDX IN REAL-TIME...')
        await enrollStudent(courseId, email, paymentIntent.id, paymentIntent.amount / 100)

    } catch (error) {
        console.error('💥 Error handling successful payment:', error)
        if (error instanceof Error) {
            console.error('Error stack:', error.stack)
        }
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
        console.log('🛒 Checkout Session Details:')
        console.log('  - ID:', session.id)
        console.log('  - Payment Status:', session.payment_status)
        console.log('  - Amount Total:', session.amount_total)
        console.log('  - Metadata:', JSON.stringify(session.metadata, null, 2))

        const { courseId, email } = session.metadata || {}

        if (!courseId || !email) {
            console.error('❌ Missing metadata in checkout session:', session.id)
            console.error('  - courseId:', courseId)
            console.error('  - email:', email)
            return
        }

        console.log(`✅ Checkout session completed for course ${courseId}, email ${email}`)

        // Connect to database
        console.log('🔗 Connecting to MongoDB...')
        await connectToDatabase()
        console.log('✅ MongoDB connected successfully')

        // Check if enrollment already exists
        console.log('🔍 Checking for existing enrollment by session...')
        const existingEnrollment = await Enrollment.findOne({
            $or: [
                { paymentId: session.payment_intent as string },
                { courseId, email: email.toLowerCase(), status: 'paid' }
            ]
        })

        if (existingEnrollment) {
            console.log('⚠️ Enrollment already exists for session:', session.id)
            return
        }

        // For checkout sessions, we might need to get the payment intent
        if (session.payment_intent && typeof session.payment_intent === 'string') {
            console.log('💳 Retrieving payment intent:', session.payment_intent)
            const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
            await handleSuccessfulPayment(paymentIntent)
        } else {
            console.log('📝 Creating enrollment from checkout session directly...')

            const enrollmentData = {
                courseId,
                email: email.toLowerCase(),
                paymentId: session.id, // Use session ID if no payment intent
                amount: (session.amount_total || 0) / 100,
                status: 'paid' as const,
                timestamp: new Date().toISOString()
            }

            console.log('📋 Enrollment data:', JSON.stringify(enrollmentData, null, 2))

            const enrollment = new Enrollment(enrollmentData)
            const savedEnrollment = await enrollment.save()
            console.log('✅ Enrollment saved from session:', savedEnrollment._id)

            await enrollStudent(courseId, email, session.id, (session.amount_total || 0) / 100)
        }

    } catch (error) {
        console.error('💥 Error handling checkout session completed:', error)
        if (error instanceof Error) {
            console.error('Error stack:', error.stack)
        }
    }
}

async function enrollStudent(courseId: string, email: string, paymentId?: string, amount?: number) {
    try {
        console.log(`🎓 Enrolling student ${email} in course ${courseId}...`)

        // Call internal enrollment API first
        const internalEnrollResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId, email }),
        })

        console.log('📡 Internal enrollment API response status:', internalEnrollResponse.status)

        if (!internalEnrollResponse.ok) {
            const errorText = await internalEnrollResponse.text()
            console.error('❌ Internal enrollment API failed:', errorText)
        } else {
            const result = await internalEnrollResponse.json()
            console.log('✅ Internal enrollment successful:', result)
        }

        // Send enrollment webhook to OpenedX if payment data is available
        if (paymentId && amount !== undefined) {
            console.log('🔗 Sending enrollment webhook to OpenedX...')
            await sendEnrollmentWebhookToOpenedX({
                courseId,
                email,
                paymentId,
                amount
            })
        }

    } catch (error) {
        console.error('💥 Error enrolling student:', error)
        console.error('Error details:', {
            courseId,
            email,
            error: error instanceof Error ? error.message : String(error)
        })
        // In production, you might want to add this to a retry queue
    }
}

// Enhanced function to send webhook to OpenedX with better error handling
async function sendEnrollmentWebhookToOpenedX(paymentData: {
    courseId: string;
    email: string;
    paymentId: string;
    amount: number;
}) {
    try {
        console.log('🎯 📡 REAL-TIME OPENEDX WEBHOOK SENDING...')
        console.log('📋 Payment Data:', JSON.stringify(paymentData, null, 2))

        // Create webhook signature (you'll need to implement this based on OpenedX requirements)
        const webhookSignature = process.env.STRIPE_WEBHOOK_SECRET || 'fallback-signature'

        const webhookPayload = {
            type: 'payment_intent.succeeded',
            data: {
                object: {
                    id: paymentData.paymentId,
                    receipt_email: paymentData.email,
                    metadata: {
                        course_id: paymentData.courseId,
                        email: paymentData.email
                    },
                    amount: paymentData.amount * 100 // Convert to cents
                }
            }
        }

        console.log('📡 Sending to OpenedX webhook payload:', JSON.stringify(webhookPayload, null, 2))

        // Try multiple possible OpenedX webhook endpoints
        const possibleEndpoints = [
            'https://lms.maaledu.com/api/maal-edu-webhook/',
            'https://lms.maaledu.com/api/webhooks/stripe/',
            'https://lms.maaledu.com/webhooks/stripe/',
            'https://lms.maaledu.com/api/stripe-webhook/'
        ]

        let webhookSent = false

        for (const endpoint of possibleEndpoints) {
            try {
                console.log(`🔄 Trying OpenedX endpoint: ${endpoint}`)

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Stripe-Signature': `whsec_${webhookSignature}`,
                        'User-Agent': 'MaalEdu-Webhook/1.0'
                    },
                    body: JSON.stringify(webhookPayload)
                })

                console.log(`📡 OpenedX response status for ${endpoint}:`, response.status)

                if (response.ok) {
                    console.log('✅ 🎉 OPENEDX WEBHOOK SENT SUCCESSFULLY!')
                    const result = await response.text()
                    console.log('📋 OpenedX success response:', result)
                    webhookSent = true
                    break
                } else if (response.status === 404) {
                    console.log(`⚠️ Endpoint ${endpoint} not found (404), trying next...`)
                    continue
                } else {
                    const errorText = await response.text()
                    console.log(`❌ OpenedX webhook failed for ${endpoint}:`, response.status, errorText)
                }

            } catch (endpointError) {
                console.log(`❌ Error with endpoint ${endpoint}:`, endpointError)
                continue
            }
        }

        if (!webhookSent) {
            console.log('⚠️ All OpenedX endpoints failed - enrollment saved in MongoDB but OpenedX not notified')
            console.log('💡 Please verify the correct OpenedX webhook endpoint with your team')

            // For now, we'll continue without failing the entire process
            // The enrollment is still saved in MongoDB
        }

    } catch (error) {
        console.error('💥 Error sending OpenedX webhook:', error)
        console.log('⚠️ OpenedX webhook failed but enrollment is saved in MongoDB')
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}
