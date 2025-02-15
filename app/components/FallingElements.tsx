'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FallingElementsProps {
  type: 'rice' | 'marigold';
}

const FallingElements = ({ type }: FallingElementsProps) => {
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
    const newElements = Array.from({ length: type === 'rice' ? 200 : 100 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 5,
      rotation: Math.random() * 360,
      scale: type === 'rice' ? 0.5 + Math.random() * 0.2 : 0.3 + Math.random() * 0.2,
      swayAmount: Math.random() * 100,
    }));
    setElements(newElements);
  }, [type]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ minHeight: '100vh' }}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{ 
            left: `${element.x}%`,
            top: -20,
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
            // Rice grain - more realistic with curved shape and gradient
            <div className="relative">
              <div 
                className="h-3 w-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  position: 'relative',
                }}
              >
                <div 
                  className="absolute w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
                    transform: 'rotate(-45deg)',
                  }}
                />
              </div>
            </div>
          ) : (
            // Marigold flower - more realistic with multiple layers and better colors
            <div className="relative">
              {/* Outer petals */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: '8px',
                    height: '3px',
                    background: `linear-gradient(to right, rgb(255, ${120 + Math.random() * 30}, 0), rgb(255, ${180 + Math.random() * 20}, 0))`,
                    borderRadius: '40% 60% 50% 50%',
                    transform: `
                      rotate(${i * (360 / 16)}deg) 
                      translateX(4px)
                    `,
                    transformOrigin: '0 50%',
                    opacity: 0.9,
                  }}
                />
              ))}
              {/* Inner petals */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`inner-${i}`}
                  className="absolute"
                  style={{
                    width: '6px',
                    height: '2.5px',
                    background: `linear-gradient(to right, rgb(255, ${150 + Math.random() * 30}, 0), rgb(255, ${200 + Math.random() * 20}, 0))`,
                    borderRadius: '40% 60% 50% 50%',
                    transform: `
                      rotate(${i * (360 / 12)}deg) 
                      translateX(3px)
                    `,
                    transformOrigin: '0 50%',
                    opacity: 0.95,
                  }}
                />
              ))}
              {/* Center */}
              <div 
                className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'radial-gradient(circle, rgb(255, 140, 0) 0%, rgb(255, 120, 0) 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingElements; 