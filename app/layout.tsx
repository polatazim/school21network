import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "School 21 Network",
  description:
    "School 21 talabalari uchun ko'nikmalarni ko'rsatish va jamoadosh topish platformasi.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f1729",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="uz"
      className={cn(
        "dark antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        "bg-background"
      )}
    >
      <body>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        {children}
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  )
}
