"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/assets/lms-logo.png" 
              alt="Phenomenal Based LMS" 
              className="h-12 w-auto" 
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-12">
            <div className="flex items-center space-x-10">
              <Link 
                href="/" 
                className="text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-gray-100 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about-us" 
                className="text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 relative group"
              >
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-gray-100 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/career-pathway"
                className="text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 relative group"
              >
                Career Pathway
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-gray-100 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link
                href="/courses"
                className="text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 relative group"
              >
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-gray-100 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <Link
                href="/certification"
                className="text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 relative group"
              >
                Certification
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white dark:bg-gray-100 transition-all duration-200 group-hover:w-full"></span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-white dark:text-gray-100 font-medium hover:text-orange-100 dark:hover:text-orange-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 dark:focus:ring-gray-100/20 focus:ring-offset-2 focus:ring-offset-orange-600 dark:focus:ring-offset-orange-700 rounded-md px-3 py-2 relative group">
                    Help 
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-white dark:bg-gray-100 scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-white dark:bg-gray-800 shadow-xl border-0 dark:border dark:border-gray-700 rounded-lg mt-2 min-w-[200px]">
                  <DropdownMenuItem asChild className="hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    <Link href="/faqs" className="w-full cursor-pointer py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">FAQs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    <Link href="/contact-us" className="w-full cursor-pointer py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400">Contact Us</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild 
              variant="outline" 
              className="border-white dark:border-gray-200 text-white dark:text-gray-100 hover:bg-white hover:text-orange-600 dark:hover:bg-gray-100 dark:hover:text-orange-700 bg-transparent transition-colors duration-200"
            >
              <Link href="https://lms.maaledu.com" target="_blank">
                Login
              </Link>
            </Button>
            
            <Button 
              asChild 
              className="bg-white dark:bg-gray-100 text-orange-600 dark:text-orange-700 hover:bg-orange-50 dark:hover:bg-gray-200 font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <Link href="https://lms.maaledu.com" target="_blank">
                Sign Up
              </Link>
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Button 
              asChild 
              size="sm"
              className="bg-white dark:bg-gray-100 text-orange-600 dark:text-orange-700 hover:bg-orange-50 dark:hover:bg-gray-200 font-semibold"
            >
              <Link href="https://lms.maaledu.com" target="_blank">
                Login
              </Link>
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-100/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center space-x-3 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <img 
                      src="/assets/lms-logo.png" 
                      alt="Phenomenal Based LMS" 
                      className="h-8 w-auto" 
                    />
                  </div>
                  
                  <Link 
                    href="/" 
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-2" 
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about-us" 
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-2" 
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/career-pathway" 
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-2" 
                    onClick={() => setIsOpen(false)}
                  >
                    Career Pathway
                  </Link>
                  <Link 
                    href="/courses" 
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-2" 
                    onClick={() => setIsOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link 
                    href="/certification" 
                    className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-2" 
                    onClick={() => setIsOpen(false)}
                  >
                    Certification
                  </Link>
                  
                  <div className="space-y-3 pt-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Help</p>
                    <Link 
                      href="/faqs" 
                      className="block pl-4 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-1" 
                      onClick={() => setIsOpen(false)}
                    >
                      FAQs
                    </Link>
                    <Link 
                      href="/contact-us" 
                      className="block pl-4 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-1" 
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                  
                  <div className="pt-6 space-y-3">
                    <Button 
                      asChild 
                      className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800 text-white font-semibold"
                    >
                      <Link href="https://lms.maaledu.com" target="_blank" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                    <div className="flex justify-center pt-4">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
