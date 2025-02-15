'use client';

import { motion } from 'framer-motion';

const printingVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    filter: 'blur(10px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const lineVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};

const inkBlotVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 0.1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function LoadingAnimation() {
  return (
    <motion.div
      className="fixed inset-0 bg-[#f4f1ea] z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-2xl mx-4">
        {/* Paper texture */}
        <motion.div
          className="absolute inset-0 bg-white shadow-xl"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Content container */}
        <motion.div
          className="relative bg-white p-12 vintage-border"
          variants={printingVariants}
          initial="initial"
          animate="animate"
        >
          {/* Ink blots */}
          <motion.div
            className="absolute -top-4 -right-4 w-12 h-12 bg-black rounded-full"
            variants={inkBlotVariants}
            initial="initial"
            animate="animate"
            style={{ filter: 'blur(10px)' }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-8 h-8 bg-black rounded-full"
            variants={inkBlotVariants}
            initial="initial"
            animate="animate"
            style={{ filter: 'blur(8px)' }}
          />

          {/* Header */}
          <div className="text-center space-y-6">
            <motion.p
              className="font-lora text-sm uppercase tracking-[0.3em]"
              variants={printingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              Est. 2020
            </motion.p>

            <motion.h1
              className="font-playfair text-5xl md:text-6xl"
              variants={printingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              The Wedding Chronicle
            </motion.h1>

            <motion.div
              className="w-32 h-px bg-black mx-auto"
              variants={lineVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            />

            <motion.p
              className="font-lora text-lg italic"
              variants={printingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.8 }}
            >
              Special Edition
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className="flex justify-center items-center gap-4"
              variants={printingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
            >
              <div className="w-8 h-px bg-black" />
              <p className="font-playfair">✦</p>
              <div className="w-8 h-px bg-black" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 