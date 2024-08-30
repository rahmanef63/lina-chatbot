import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'LinaAI Chatbot',
  description: 'A reusable AI chatbot built with Next.js and Express.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}