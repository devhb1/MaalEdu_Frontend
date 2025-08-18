import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">We'd Love To Hear From You</h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                If you have any questions or concerns, please write them below. One of our team members will get back to
                you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                          </Label>
                          <Input id="firstName" type="text" className="mt-1" placeholder="Enter your first name" />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                          </Label>
                          <Input id="lastName" type="text" className="mt-1" placeholder="Enter your last name" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <Input id="email" type="email" className="mt-1" placeholder="Enter your email address" />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          Subject
                        </Label>
                        <Input id="subject" type="text" className="mt-1" placeholder="What is this regarding?" />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          rows={6}
                          className="mt-1"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8">
                  <Card className="p-8">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</CardTitle>
                      <p className="text-gray-600 leading-relaxed">
                        Connect with us to experience seamless communication. We value open dialogue and are eager to
                        engage with you, whether you have questions, ideas, or feedback, we are here to listen and
                        respond.
                      </p>
                    </CardHeader>
                  </Card>

                  <Card className="p-8 bg-orange-50 border-orange-200">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                          <p className="text-gray-600 mb-2">For general inquiries and support:</p>
                          <a
                            href="mailto:support@maaledu.com"
                            className="text-orange-600 hover:text-orange-700 font-medium"
                          >
                            support@maaledu.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-8">
                    <CardContent className="p-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">General inquiries: Within 24 hours</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-600">Technical support: Within 12 hours</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600">Urgent matters: Within 4 hours</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
