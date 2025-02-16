import type { Metadata } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Dos Bodas',
  description: 'A tale of two weddings - Spain and India',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang} className={`${playfair.variable} ${lora.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover" />
      </head>
      <body className="overflow-x-hidden">
        <div className="w-full min-h-screen overflow-x-hidden bg-white">
          {children}
        </div>
      </body>
    </html>
  )
} 