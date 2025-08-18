"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/assets/Logo.svg" alt="MaalEdu" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
            Home
          </Link>
          <Link href="/about-us" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
            About Us
          </Link>
          <Link
            href="/certification"
            className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
          >
            Certification
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
              Help <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/faqs">FAQs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact-us">Contact Us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="https://lms.maaledu.com" target="_blank">
              Begin Learning
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about-us" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="/certification" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Certification
              </Link>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">Help</p>
                <Link href="/faqs" className="block pl-4 text-gray-600" onClick={() => setIsOpen(false)}>
                  FAQs
                </Link>
                <Link href="/contact-us" className="block pl-4 text-gray-600" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </div>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white mt-4">
                <Link href="https://lms.maaledu.com" target="_blank">
                  Begin Learning
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
