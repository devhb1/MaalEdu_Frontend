"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { COURSES } from "@/lib/courses"
import { formatPrice } from "@/lib/utils-stripe"
import { CheckoutRequest, CheckoutResponse } from "@/lib/types"
import Image from "next/image"
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  BookOpen,
  ShoppingCart,
  Mail,
  Loader2
} from "lucide-react"

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleBuyNow = async (courseId: string) => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your Open edX email address to continue.",
        variant: "destructive"
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      const checkoutRequest: CheckoutRequest = {
        courseId,
        email: email.toLowerCase().trim()
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutRequest),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const data: CheckoutResponse = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = data.checkoutUrl

    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openPurchaseDialog = (courseId: string) => {
    setSelectedCourse(courseId)
    setIsDialogOpen(true)
  }

  const closePurchaseDialog = () => {
    setIsDialogOpen(false)
    setSelectedCourse(null)
    setEmail("")
  }

  const selectedCourseData = selectedCourse ? COURSES.find(c => c.id === selectedCourse) : null

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/70 transition-colors">
                <BookOpen className="w-4 h-4 mr-2" />
                Professional Courses
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
                Blockchain <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Courses</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors max-w-3xl mx-auto">
                Transform your career with our industry-leading blockchain courses. Designed by experts, 
                built for professionals, and recognized globally.
              </p>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span>500+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Industry Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-600" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {COURSES.map((course) => (
                  <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 bg-white dark:bg-gray-800">
                    <CardHeader className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // Fallback to a gradient background if image fails to load
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${
                            course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                          }`}>
                            {course.level}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/50 text-white border-0">
                            {course.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {course.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-orange-600" />
                            What you'll learn:
                          </h4>
                          <ul className="grid grid-cols-1 gap-2">
                            {course.features.slice(0, 4).map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          {course.features.length > 4 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              +{course.features.length - 4} more features
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="space-y-1">
                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                              {formatPrice(course.price)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </p>
                          </div>
                          
                          <Button 
                            onClick={() => openPurchaseDialog(course.id)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Blockchain Journey?
              </h2>
              <p className="text-xl text-orange-100 dark:text-orange-200 mb-8 leading-relaxed">
                Join thousands of professionals who have transformed their careers with our comprehensive blockchain education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="px-8 py-3 text-lg"
                  onClick={() => document.querySelector('.courses-grid')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View All Courses
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                  asChild
                >
                  <a href="/contact-us">Get Help Choosing</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Purchase Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
              Complete Your Purchase
            </DialogTitle>
          </DialogHeader>
          
          {selectedCourseData && (
            <div className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {selectedCourseData.title}
                </h4>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatPrice(selectedCourseData.price)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="openedx-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Open edX Email Address *
                  </Label>
                  <Input
                    id="openedx-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter the email address you'll use to access the course on our learning platform.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => selectedCourse && handleBuyNow(selectedCourse)}
                    disabled={isLoading || !email.trim()}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={closePurchaseDialog}
                    variant="outline"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>• You'll be redirected to Stripe for secure payment processing</p>
                <p>• Course access will be granted immediately after payment</p>
                <p>• You'll receive email confirmation with login details</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
