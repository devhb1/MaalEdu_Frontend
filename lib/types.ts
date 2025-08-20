export interface Course {
    id: string
    title: string
    description: string
    price: number
    duration: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    image: string
    features: string[]
}

export interface CourseEnrollment {
    courseId: string
    email: string
    paymentId: string
    amount: number
    status: 'paid' | 'pending' | 'failed'
    timestamp: string
}

export interface CheckoutRequest {
    courseId: string
    email: string
}

export interface CheckoutResponse {
    checkoutUrl: string
    sessionId: string
}

export interface EnrollmentRequest {
    courseId: string
    email: string
}

export interface EnrollmentResponse {
    success: boolean
    message: string
    enrollmentId?: string
}
