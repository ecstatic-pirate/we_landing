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

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const title = params.lang === 'es' 
    ? 'Nos casamos | Laura & Shantanu'
    : 'We Are Getting Married | Laura & Shantanu'
    
  const description = params.lang === 'es'
    ? 'Únete a nuestra celebración de boda en España e India'
    : 'Join us in celebrating our wedding in Spain and India'

  return {
    title,
    description,
    // Add other metadata properties as needed
  }
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