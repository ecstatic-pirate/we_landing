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
  title: 'Our Wedding Newspaper',
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
      <body className="bg-cream-100">
        <div className="newspaper-container">
          {children}
        </div>
      </body>
    </html>
  )
} 