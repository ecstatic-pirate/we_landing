import { Metadata } from 'next'

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return {
    title: params.lang === 'es' ? 'Nuestra Historia de Boda | Inicio' : 'Our Wedding Story | Home',
    description: params.lang === 'es' 
      ? 'Una historia de dos bodas entre España e India' 
      : 'A tale of two weddings across Spain and India',
  }
} 