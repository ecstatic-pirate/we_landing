'use client';

import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const PlaneTransition = () => {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Path Line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-200"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Airplane */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        initial={{ x: "-10%", rotate: 45 }}
        whileInView={{ x: "110%" }}
        viewport={{ once: true }}
        transition={{ 
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for realistic flight effect
          delay: 0.5
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -5, 0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Plane className="w-8 h-8 text-gray-600 rotate-45" />
        </motion.div>
      </motion.div>

      {/* Cloud Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ 
            x: "-10%", 
            opacity: 0,
            scale: 0.5
          }}
          whileInView={{ 
            x: "110%", 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          viewport={{ once: true }}
          transition={{ 
            duration: 2,
            ease: "easeOut",
            delay: 0.8 + (i * 0.2)
          }}
        >
          <div className="w-4 h-4 bg-white rounded-full blur-sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default PlaneTransition; 