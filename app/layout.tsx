import type React from "react"
import "./globals.css"
import { Montserrat, Open_Sans } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata = {
  title: "FindMe - Discover Quiet Places",
  description: "Find peaceful and quiet places near you",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'