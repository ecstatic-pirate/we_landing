'use client'

import { useParams, useRouter } from 'next/navigation'

const languages = [
  { code: 'en', name: 'ENGLISH' },
  { code: 'es', name: 'ESPAÑOL' }
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const params = useParams()
  const currentLang = (params?.lang as string) || 'en'

  const handleLanguageChange = (langCode: string) => {
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${currentLang}`, `/${langCode}`)
    router.push(newPath)
  }

  return (
    <div>
      <div className="px-4 sm:px-6 py-2 sm:py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
        <ul className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-mono tracking-wider">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className="relative text-stone-200 transition-all duration-300
                  hover:text-white group whitespace-nowrap"
              >
                <span>{lang.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 
                  transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 