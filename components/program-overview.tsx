import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GraduationCap, Building2, ArrowRight } from "lucide-react"

export function ProgramOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Blockchain Dual Diploma & <span className="text-orange-600">Corporate Training</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our comprehensive blockchain program, featuring a dual diploma with our global University partners, prepares
            graduates for diverse roles in the blockchain industry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Dual Diploma Card */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-50"></div>
            <CardContent className="relative p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Dual Diploma Program</h3>
                  <Badge variant="secondary" className="mt-1">
                    PDipBT + DipBT
                  </Badge>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Achieve dual recognition with one comprehensive program, awarding you both the Professional Diploma from
                Maal Data Lab and the Academic Diploma from Warnborough College, UK.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Professional Diploma in Blockchain Technology (PDipBT)
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Diploma in Blockchain Technology (DipBT)
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Globally recognized credentials
                </div>
              </div>

              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 group">
                <Link href="/certification/dual-diploma">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Corporate Training Card */}
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
            <CardContent className="relative p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Corporate Training</h3>
                  <Badge variant="secondary" className="mt-1">
                    CTC
                  </Badge>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Customized blockchain training solutions for organizations looking to upskill their teams and integrate
                blockchain technology into their business operations.
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Corporate Training Certification (CTC)
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Customized curriculum for your organization
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Flexible delivery options
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 group bg-transparent"
              >
                <Link href="/contact">
                  Talk to Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
