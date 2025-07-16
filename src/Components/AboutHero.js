/** @format */
'use client';
import React from 'react';
import Link from 'next/link';
import AboutBg from '../../public/aboutbg.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='relative h-[750px]'>
        <div className='absolute inset-0'>
          <Image
            src={AboutBg}
            className='object-cover w-full h-full'
            alt='Imo State Ministry of Works building'
            fill
            priority
          />
          <div className='absolute inset-0 bg-gray-900/75 flex items-center'>
            <div className='max-w-7xl px-6 mx-auto text-center'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-4xl font-bold text-white md:text-5xl lg:text-7xl mb-6'
              >
                About The Ministry
              </motion.h2>
              <div className='flex items-center justify-center gap-2 text-lg text-gray-300'>
                <Link
                  href='/'
                  className='hover:text-green-300 transition-colors'
                >
                  Home
                </Link>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
                <Link href='/about' className='text-green-300'>
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl px-6 mx-auto'>
          <div className='grid md:grid-cols-2 gap-12'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='bg-white p-8 rounded-xl shadow-lg'
            >
              <h3 className='text-3xl font-bold text-green-700 mb-4'>
                Our Mission
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                To deliver sustainable infrastructure development through
                innovative planning, quality construction, and efficient
                maintenance that enhances the quality of life for all citizens
                of Imo State while promoting economic growth and environmental
                sustainability.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='bg-white p-8 rounded-xl shadow-lg'
            >
              <h3 className='text-3xl font-bold text-green-700 mb-4'>
                Our Vision
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                To transform Imo State into a model of infrastructural
                excellence in Nigeria, with well-planned urban and rural
                communities connected by a network of durable roads, bridges,
                and public facilities that meet international standards and
                serve as catalysts for socio-economic development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className='py-20'>
        <div className='max-w-7xl px-6 mx-auto'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl font-bold text-green-700 md:text-4xl'>
              Our History
            </h2>
            <div className='w-24 h-1 bg-green-600 mx-auto mt-4'></div>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src='/img3.jpg'
                alt='Imo State Ministry of Works building'
                width={800}
                height={500}
                className='rounded-lg shadow-xl'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className='text-gray-600 mb-6 leading-relaxed'>
                The Imo State Ministry of Works was established in 1976
                following the creation of Imo State. Since its inception, the
                Ministry has been at the forefront of infrastructure development
                in the state, overseeing the construction and maintenance of
                roads, bridges, and public buildings.
              </p>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Over the years, the Ministry has evolved to incorporate modern
                construction techniques and sustainable development practices.
                Our achievements include the construction of over 1,000
                kilometers of roads, numerous bridges, and critical public
                infrastructure across the three senatorial zones of the state.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Today, under the leadership of our Honorable Commissioner, we
                continue to uphold our mandate of providing quality
                infrastructure that meets the needs of our growing population
                while adapting to the challenges of the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl px-6 mx-auto'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2 className='text-3xl font-bold text-green-700 md:text-4xl'>
              Our Leadership
            </h2>
            <div className='w-24 h-1 bg-green-600 mx-auto mt-4'></div>
          </motion.div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                name: 'Hon. Barr. Ralph Nwosu',
                position: 'Commissioner for Works',
                image: '/bar_ralph.jpg',
                bio: 'With over 20 years of experience in civil engineering and public administration...',
              },
              {
                name: 'Engr. Mrs. Adaobi Okoli',
                position: 'Permanent Secretary',
                image: '/permanent-secretary.jpg',
                bio: 'A seasoned administrator with a background in structural engineering...',
              },
              {
                name: 'Engr. Chikezie Mbonu',
                position: 'Director of Public Works',
                image: '/director-works.jpg',
                bio: 'Specializes in road construction and maintenance with numerous projects...',
              },
            ].map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='bg-white rounded-xl shadow-lg overflow-hidden'
              >
                <div className='h-64 relative'>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className='object-contain content-center'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {leader.name}
                  </h3>
                  <p className='text-green-600 mb-3'>{leader.position}</p>
                  <p className='text-gray-600'>{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
