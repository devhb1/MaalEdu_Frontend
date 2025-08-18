"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-200/20 rounded-full blur-lg"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              Welcome to Maal Data Lab
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Shape Tomorrow's{" "}
                <span className="text-orange-600 relative">
                  Digital World
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-orange-200 rounded-full"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Master blockchain technology with our globally recognized dual diploma program. Unlock your future with
                industry-relevant skills and expert mentorship.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white group">
                <Link href="https://lms.maaledu.com" target="_blank">
                  Begin Learning
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 group bg-transparent"
              >
                <Link href="/career-pathway">
                  <Play className="mr-2 h-4 w-4" />
                  Explore Career Paths
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Trusted by students worldwide</p>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-semibold text-orange-600">500+</span>
                  <span className="ml-1">Graduates</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-orange-600">95%</span>
                  <span className="ml-1">Success Rate</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-orange-600">24/7</span>
                  <span className="ml-1">Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/assets/HomePage1.png"
                alt="Blockchain Career Pathways"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-orange-600 font-bold text-sm">
                Dual
                <br />
                Diploma
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
