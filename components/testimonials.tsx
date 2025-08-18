"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Adelia",
      content:
        "The MaalChain LMS equipped me with the skills and confidence needed to excel in the blockchain industry. It was a game-changer for my career.",
      rating: 4,
    },
    {
      name: "Jason",
      content:
        "The hands-on training and flexible schedule allowed me to balance my studies with my job seamlessly. The program was tailored to fit my needs perfectly.",
      rating: 4,
    },
    {
      name: "Zheng",
      content:
        "The integrated learning approach and industry-relevant content provided me with invaluable insights and practical experience. The dual diploma has significantly boosted my career prospects.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Student <span className="text-orange-600">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our successful graduates who have transformed their careers through our blockchain program
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 space-y-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-orange-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</blockquote>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Program Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
