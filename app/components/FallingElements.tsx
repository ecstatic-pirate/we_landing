'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FallingElementsProps {
  type: 'confetti' | 'marigold';
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
    color?: string;
    shape?: 'circle' | 'square' | 'triangle';
  }>>([]);

  useEffect(() => {
    // Create elements with more random properties
    const newElements = Array.from({ length: type === 'confetti' ? 200 : 100 }, (_, index) => {
      const colors = [
        'rgb(214, 0, 28)',    // Spanish red
        'rgb(255, 196, 0)',   // Spanish yellow
        'rgb(255, 87, 51)',   // Warm orange
        'rgb(255, 150, 0)',   // Golden
      ];
      const shapes = ['circle', 'square', 'triangle'] as const;
      
      return {
        id: index,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
        rotation: Math.random() * 360,
        scale: type === 'confetti' ? 0.4 + Math.random() * 0.3 : 0.3 + Math.random() * 0.2,
        swayAmount: Math.random() * 100,
        color: type === 'confetti' ? colors[Math.floor(Math.random() * colors.length)] : undefined,
        shape: type === 'confetti' ? shapes[Math.floor(Math.random() * shapes.length)] : undefined,
      };
    });
    setElements(newElements);
  }, [type]);

  const renderConfetti = (color: string, shape: 'circle' | 'square' | 'triangle') => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            className="absolute"
            style={{
              width: '8px',
              height: '8px',
              background: color,
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        );
      case 'square':
        return (
          <div 
            className="absolute"
            style={{
              width: '8px',
              height: '8px',
              background: color,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transform: 'rotate(15deg)',
            }}
          />
        );
      case 'triangle':
        return (
          <div 
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: `10px solid ${color}`,
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }}
          />
        );
    }
  };

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
          {type === 'confetti' ? (
            element.color && element.shape && renderConfetti(element.color, element.shape)
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