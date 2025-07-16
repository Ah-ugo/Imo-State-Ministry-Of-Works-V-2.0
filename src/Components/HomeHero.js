/** @format */

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/bg1.webp',
      title: 'Right Place To',
      subtitle: 'Connecting Communities,',
      highlight: 'Building Tomorrow',
      description: 'Imo State Ministry of Works Pioneering Progress!',
    },
    {
      image: '/imo_works1.jpg',
      title: 'Innovative Solutions',
      subtitle: 'Transforming Infrastructure,',
      highlight: 'Shaping Futures',
      description: 'Building sustainable development across Imo State',
    },
    {
      image: '/imo_works2.jpg',
      title: 'Excellence In',
      subtitle: 'Modern Engineering,',
      highlight: 'Lasting Legacy',
      description: 'Committed to quality and innovation in public works',
    },
  ];

  // Auto-slide with text sync
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    hover: {
      scale: 1.05,
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      boxShadow: '0 8px 25px rgba(5, 150, 105, 0.5)',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <header className='relative font-sans overflow-hidden h-screen max-h-[800px] min-h-[600px]'>
      {/* Animated background slides */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          className='absolute inset-0 bg-center bg-cover bg-no-repeat'
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: [0.33, 1, 0.68, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className='relative h-full w-full bg-gradient-to-br from-green-900/80 via-emerald-900/70 to-teal-900/60'>
        <div className='absolute inset-0 bg-radial-gradient from-green-500/10 via-transparent to-transparent opacity-40'></div>

        {/* Animated text content */}
        <div className='h-full flex items-center justify-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              className='mx-auto px-6 text-center max-w-4xl relative z-20'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <motion.h1
                className='text-white font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight'
                variants={textItemVariants}
              >
                <span className='text-emerald-300 font-extrabold'>
                  {slides[currentSlide].title.split(' ')[0]}
                </span>{' '}
                {slides[currentSlide].title.split(' ').slice(1).join(' ')}
              </motion.h1>

              <motion.h2
                className='text-white font-medium text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8 tracking-tighter'
                variants={textItemVariants}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].subtitle}{' '}
                <span className='text-emerald-300 font-semibold'>
                  {slides[currentSlide].highlight}
                </span>
              </motion.h2>

              <motion.p
                className='text-emerald-100 font-light text-xl sm:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed'
                variants={textItemVariants}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                variants={textItemVariants}
                transition={{ delay: 0.6 }}
              >
                <Link href='/About'>
                  <motion.button
                    className='px-8 py-4 text-white font-medium rounded-full text-lg sm:text-xl relative overflow-hidden'
                    variants={buttonVariants}
                    initial='rest'
                    whileHover='hover'
                    whileTap='tap'
                  >
                    <span className='relative z-10'>Discover More</span>
                    <span className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent'></span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className='absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentSlide === index ? 'bg-emerald-400 w-8' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}
