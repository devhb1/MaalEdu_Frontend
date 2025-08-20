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
    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        if (!signature) {
            console.error('Missing stripe-signature header')
            return NextResponse.json(
                { error: 'Missing stripe-signature header' },
                { status: 400 }
            )
        }

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret!)
        } catch (err) {
            console.error('Webhook signature verification failed:', err)
            return NextResponse.json(
                { error: 'Webhook signature verification failed' },
                { status: 400 }
            )
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent
                await handleSuccessfulPayment(paymentIntent)
                break
            }
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session
                await handleCheckoutSessionCompleted(session)
                break
            }
            default: {
                console.log(`Unhandled event type: ${event.type}`)
            }
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook handler error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
    try {
        const { courseId, email } = paymentIntent.metadata

        if (!courseId || !email) {
            console.error('Missing metadata in payment intent:', paymentIntent.id)
            return
        }

        console.log(`Processing successful payment for course ${courseId}, email ${email}`)

        // Connect to database
        await connectToDatabase()

        // Check if enrollment already exists
        const existingEnrollment = await Enrollment.findOne({
            paymentId: paymentIntent.id
        })

        if (existingEnrollment) {
            console.log('Enrollment already exists for payment:', paymentIntent.id)
            return
        }

        // Create enrollment record
        const enrollment = new Enrollment({
            courseId,
            email: email.toLowerCase(),
            paymentId: paymentIntent.id,
            amount: paymentIntent.amount / 100, // Convert from cents
            status: 'paid',
            timestamp: new Date().toISOString()
        })

        await enrollment.save()
        console.log('Enrollment saved:', enrollment._id)

        // Call enrollment API
        await enrollStudent(courseId, email)

    } catch (error) {
        console.error('Error handling successful payment:', error)
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    try {
        const { courseId, email } = session.metadata || {}

        if (!courseId || !email) {
            console.error('Missing metadata in checkout session:', session.id)
            return
        }

        console.log(`Checkout session completed for course ${courseId}, email ${email}`)

        // Additional processing if needed
        // This is a backup in case payment_intent.succeeded doesn't fire

    } catch (error) {
        console.error('Error handling checkout session completed:', error)
    }
}

async function enrollStudent(courseId: string, email: string) {
    try {
        const enrollResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId, email }),
        })

        if (!enrollResponse.ok) {
            throw new Error(`Enrollment API failed: ${enrollResponse.statusText}`)
        }

        const result = await enrollResponse.json()
        console.log('Student enrolled successfully:', result)
    } catch (error) {
        console.error('Error enrolling student:', error)
        // In production, you might want to add this to a retry queue
    }
}

export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
    )
}
