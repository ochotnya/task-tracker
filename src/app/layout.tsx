import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '~/lib/utils'
import { TooltipProvider } from '~/shadcn/ui/tooltip'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'Logowanie czasu pracy per zadanie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-slate-800 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
