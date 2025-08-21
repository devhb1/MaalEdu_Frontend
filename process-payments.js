// Script to manually process recent payments and create enrollments
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function processRecentPayments() {
    try {
        console.log('🔍 Fetching recent successful payment intents...');
        
        // Get recent payment intents from the last hour
        const oneHourAgo = Math.floor((Date.now() - 60 * 60 * 1000) / 1000);
        
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 10,
            created: { gte: oneHourAgo }
        });
        
        console.log(`Found ${paymentIntents.data.length} recent payment intents`);
        
        for (const paymentIntent of paymentIntents.data) {
            console.log('\n----------------------------');
            console.log('💳 Payment Intent:', paymentIntent.id);
            console.log('💰 Amount:', paymentIntent.amount / 100);
            console.log('📅 Status:', paymentIntent.status);
            console.log('📋 Metadata:', JSON.stringify(paymentIntent.metadata, null, 2));
            
            if (paymentIntent.status === 'succeeded' && paymentIntent.metadata.courseId && paymentIntent.metadata.email) {
                console.log('✅ This payment has metadata - processing enrollment...');
                
                // Call our enrollment API
                const enrollResponse = await fetch('http://localhost:3000/api/test-enrollment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        courseId: paymentIntent.metadata.courseId,
                        email: paymentIntent.metadata.email,
                        paymentId: paymentIntent.id,
                        amount: paymentIntent.amount / 100
                    })
                });
                
                if (enrollResponse.ok) {
                    const result = await enrollResponse.json();
                    console.log('🎓 Enrollment created:', result.enrollment.id);
                } else {
                    console.log('❌ Failed to create enrollment');
                }
            } else {
                console.log('⚠️ Missing metadata or payment not succeeded');
            }
        }
        
    } catch (error) {
        console.error('💥 Error processing payments:', error);
    }
}

// Use dynamic import for fetch
async function main() {
    const fetch = (await import('node-fetch')).default;
    global.fetch = fetch;
    await processRecentPayments();
}

main();
