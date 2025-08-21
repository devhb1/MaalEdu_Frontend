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
    console.log('🎯 WEBHOOK RECEIVED at:', new Date().toISOString())
    console.log('🔍 Request URL:', request.url)
    console.log('🔍 Request method:', request.method)

    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        console.log('📝 Webhook body length:', body.length)
        console.log('🔐 Signature present:', !!signature)
        console.log('🔐 Signature value:', signature ? 'whsec_***' + signature.slice(-10) : 'NONE')
        console.log('🎯 Expected webhook secret:', webhookSecret ? 'whsec_***' + webhookSecret.slice(-10) : 'NONE')

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
            console.log('✅ Webhook signature verified successfully')
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
                console.log('💰 Payment intent succeeded event received')
                const paymentIntent = event.data.object as Stripe.PaymentIntent
                await handleSuccessfulPayment(paymentIntent)
                break
            }
            case 'checkout.session.completed': {
                console.log('🛒 Checkout session completed event received')
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

        console.log('💾 Creating new enrollment record...')

        // Create enrollment record
        const enrollmentData = {
            courseId,
            email: email.toLowerCase(),
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert from cents
            status: 'paid' as const,
            timestamp: new Date().toISOString()
        }

        console.log('📋 Enrollment data:', JSON.stringify(enrollmentData, null, 2))

        const enrollment = new Enrollment(enrollmentData)

        const savedEnrollment = await enrollment.save()
        console.log('✅ Enrollment saved successfully:', savedEnrollment._id)
        console.log('📊 Saved enrollment details:', JSON.stringify(savedEnrollment.toObject(), null, 2))

        // Call enrollment API
        console.log('🎓 Calling enrollment API...')
        await enrollStudent(courseId, email)

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

            await enrollStudent(courseId, email)
        }

    } catch (error) {
        console.error('💥 Error handling checkout session completed:', error)
        if (error instanceof Error) {
            console.error('Error stack:', error.stack)
        }
    }
}

async function enrollStudent(courseId: string, email: string) {
    try {
        console.log(`🎓 Enrolling student ${email} in course ${courseId}...`)

        const enrollResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId, email }),
        })

        console.log('📡 Enrollment API response status:', enrollResponse.status)

        if (!enrollResponse.ok) {
            const errorText = await enrollResponse.text()
            console.error('❌ Enrollment API failed:', errorText)
            throw new Error(`Enrollment API failed: ${enrollResponse.statusText}`)
        }

        const result = await enrollResponse.json()
        console.log('✅ Student enrolled successfully:', result)
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

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}
