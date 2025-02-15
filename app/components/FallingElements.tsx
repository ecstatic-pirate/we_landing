'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface FallingElementsProps {
  type: 'rice' | 'marigold';
}

const FallingElements = ({ type }: FallingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
    rotation: number;
    scale: number;
    swayAmount: number;
  }>>([]);

  useEffect(() => {
    // Create elements with more random properties
    const newElements = Array.from({ length: 75 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 7,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      swayAmount: Math.random() * 100,
    }));
    setElements(newElements);
  }, []);

  if (!isInView) return null;

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ minHeight: '100vh' }}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{ 
            left: `${element.x}%`,
            top: 0,
            scale: element.scale,
            zIndex: 0,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0%', '100vh'],
            x: [0, Math.sin(element.swayAmount) * 30],
            opacity: [0, 1, 1, 0],
            rotate: [element.rotation, element.rotation + 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        >
          {type === 'rice' ? (
            // Rice grain
            <div 
              className="h-4 w-1.5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-sm"
              style={{
                transform: 'rotate(45deg)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
          ) : (
            // Marigold flower
            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: `${6 + Math.random() * 2}px`,
                    height: `${6 + Math.random() * 2}px`,
                    background: `rgb(255, ${150 + Math.random() * 50}, 0)`,
                    borderRadius: '50%',
                    transform: `
                      rotate(${i * 30}deg) 
                      translate(${4 + Math.random()}px, 0)
                      scale(${0.9 + Math.random() * 0.2})
                    `,
                    opacity: 0.8 + Math.random() * 0.2,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              <div className="w-3 h-3 bg-orange-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingElements; 