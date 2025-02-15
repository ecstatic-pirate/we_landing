'use client'

import { motion } from 'framer-motion'

type TimelineProps = {
  events: {
    date: string
    title: string
    description: string
  }[]
  title: string
}

const clipVariants = {
  hidden: { 
    scale: 0.8,
    opacity: 0,
    rotateZ: -5
  },
  visible: (i: number) => ({ 
    scale: 1,
    opacity: 1,
    rotateZ: 0,
    transition: { 
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}

export default function Timeline({ events, title }: TimelineProps) {
  return (
    <section className="py-16">
      <h2 className="newspaper-headline mb-12">{title}</h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {events.map((event, i) => (
          <motion.div
            key={event.date}
            className="newspaper-article bg-newspaper-bg p-6 shadow-lg transform"
            variants={clipVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={i}
          >
            <div className="border-2 border-newspaper-accent p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span className="text-newspaper-accent font-serif italic">
                  {event.date}
                </span>
              </div>
              <p className="font-serif leading-relaxed">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 