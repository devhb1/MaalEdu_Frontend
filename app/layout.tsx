import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "MaalEdu - Shape Tomorrow's Digital World | Blockchain Education",
  description:
    "Master blockchain technology with our globally recognized dual diploma program. Professional & Academic diplomas from Maal Data Lab and Warnborough College UK. Start your blockchain career today.",
  keywords:
    "blockchain education, dual diploma, blockchain certification, cryptocurrency course, smart contracts, blockchain developer, MaalEdu, Warnborough College",
  authors: [{ name: "MaalEdu" }],
  openGraph: {
    title: "MaalEdu - Shape Tomorrow's Digital World",
    description: "Master blockchain technology with our globally recognized dual diploma program.",
    url: "https://maaledu.com",
    siteName: "MaalEdu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaalEdu - Shape Tomorrow's Digital World",
    description: "Master blockchain technology with our globally recognized dual diploma program.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
