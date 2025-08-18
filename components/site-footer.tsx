import Link from "next/link"
import { Facebook, Twitter, Youtube, Github, Send } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/assets/lms-orange.webp" alt="MaalEdu" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering learners worldwide with blockchain education and innovative learning solutions. Shape
              tomorrow's digital world with globally recognized credentials.
            </p>
            <p className="text-gray-400 text-sm">
              Email:{" "}
              <Link href="mailto:support@maaledu.com" className="text-orange-400 hover:text-orange-300">
                support@maaledu.com
              </Link>
            </p>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-orange-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://lms.maaledu.com"
                  target="_blank"
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  New Student
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Career Pathways
                </Link>
              </li>
              <li>
                <Link href="/certification" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Certification
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 MaalEdu. All rights reserved.</p>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Send className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
