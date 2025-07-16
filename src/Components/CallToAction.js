/** @format */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import sirNwosu from '../../public/sirNwosu.jpg';
import sirNwosu2 from '../../public/sirNwosu2.jpg';
import sirNwosu3 from '../../public/sirNwosu3.jpg';
import Image from 'next/image';

export default function CallToAction() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
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
    <div className='bg-white overflow-hidden relative'>
      {/* Futuristic decorative elements */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/30 to-transparent'></div>
        <div className='absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-emerald-50/20 to-transparent'></div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10'>
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div className='order-2 lg:order-1'>
            <motion.h2
              className='text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 mb-6 leading-tight'
              variants={itemVariants}
            >
              Building Imo State&apos;s Future:{' '}
              <span className='text-gray-800 block mt-2'>
                Sustainable Progress, Connected Communities
              </span>
            </motion.h2>

            <motion.p
              className='text-lg text-gray-600 mb-8 leading-relaxed'
              variants={itemVariants}
            >
              Welcome to the official website of the Imo State Ministry of
              Works. As the cornerstone of infrastructure development,
              we&apos;re committed to creating a vibrant and sustainable future
              for our beloved state. Through innovation, expertise, and
              unwavering dedication, we&apos;re building the pathways that
              connect our communities and turn visions into reality.
            </motion.p>

            <motion.div className='mt-8' variants={itemVariants}>
              <motion.a
                href='/About'
                className='inline-flex items-center px-8 py-4 text-lg font-medium rounded-full text-white relative overflow-hidden'
                variants={buttonVariants}
                initial='rest'
                whileHover='hover'
                whileTap='tap'
              >
                <span className='relative z-10'>Learn About Our Mission</span>
                <span className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent'></span>
              </motion.a>
            </motion.div>
          </div>

          <div className='order-1 lg:order-2'>
            <div className='grid grid-cols-2 gap-4 sm:gap-6'>
              <motion.div
                className='relative h-64 sm:h-80 rounded-2xl overflow-hidden'
                variants={imageVariants}
                whileHover='hover'
              >
                <Image
                  src={sirNwosu}
                  alt='Commissioner at work'
                  fill
                  className='absolute inset-0 w-full h-full object-cover'
                  priority
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
              </motion.div>

              <div className='space-y-4 sm:space-y-6'>
                <motion.div
                  className='relative h-28 sm:h-36 rounded-2xl overflow-hidden'
                  variants={imageVariants}
                  transition={{ delay: 0.2 }}
                  whileHover='hover'
                >
                  <Image
                    src={sirNwosu2}
                    alt='Project site visit'
                    fill
                    className='absolute inset-0 w-full h-full object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                </motion.div>

                <motion.div
                  className='relative h-28 sm:h-36 rounded-2xl overflow-hidden'
                  variants={imageVariants}
                  transition={{ delay: 0.4 }}
                  whileHover='hover'
                >
                  <Image
                    src={sirNwosu3}
                    alt='Infrastructure development'
                    fill
                    className='absolute inset-0 w-full h-full object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
