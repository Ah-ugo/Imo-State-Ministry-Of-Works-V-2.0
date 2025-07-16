/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import lottieJson from '../Assets/animation_lkjfxofn.json';
import Lottie from 'react-lottie-player';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProjectComponent() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/Projects',
        {
          headers: {
            'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APP_ID,
            'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_KEY,
          },
        }
      );
      setProjects(response.data.results);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className='py-16 lg:py-24 bg-gradient-to-b from-green-800 to-green-700 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 lg:mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
            Our Infrastructure Projects
          </h2>
          <p className='text-lg text-green-100 max-w-3xl mx-auto'>
            Discover the latest developments transforming Imo State's landscape
          </p>
        </motion.div>

        {!loaded ? (
          <div className='flex justify-center py-12'>
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: '50%', maxWidth: '300px', height: 'auto' }}
            />
          </div>
        ) : (
          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-100px' }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
          >
            {projects
              .slice(projects.length - 6)
              .reverse()
              .map((projectItem) => (
                <motion.div
                  key={projectItem.objectId}
                  variants={item}
                  className='group relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300'
                >
                  <div className='aspect-video w-full h-64 relative'>
                    <Image
                      src={projectItem.image?.url || '/placeholder-project.jpg'}
                      alt={projectItem.title || 'Project image'}
                      fill
                      className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6'>
                    <h3 className='text-xl font-bold text-white mb-2'>
                      {projectItem.title || 'Project'}
                    </h3>
                    <p className='text-green-200 line-clamp-2 text-sm lg:text-base'>
                      {projectItem.description ||
                        'Infrastructure development project'}
                    </p>
                    <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <button className='px-4 py-2 bg-white text-green-700 font-medium rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='text-center mt-12 lg:mt-16'
        >
          <Link
            href='/Projects'
            className='inline-flex items-center px-8 py-3.5 text-lg font-semibold rounded-lg text-green-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'
          >
            Explore All Projects
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='ml-2 h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
