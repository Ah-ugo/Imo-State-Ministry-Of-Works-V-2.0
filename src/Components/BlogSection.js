/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import lottieJson from '../Assets/animation_lkjfxofn.json';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        'https://parseapi.back4app.com/classes/BlogPost',
        {
          headers: {
            'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APP_ID,
            'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_KEY,
          },
        }
      );
      setBlogs(response.data.results);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 lg:mb-16'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-4'>
            News & Publications
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Stay updated with the latest news and announcements from the
            Ministry
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
          <>
            <motion.div
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true, margin: '-100px' }}
              className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10'
            >
              {blogs.slice(0, 4).map((blogPost) => (
                <motion.div
                  key={blogPost.objectId}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                >
                  <HomeBlogCard
                    img={blogPost.image1?.url || '/placeholder-blog.jpg'}
                    title={blogPost.title}
                    content1={blogPost.content}
                    content2={blogPost.paragraph1}
                    content3={blogPost.paragraph2}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-center mt-12'
            >
              <Link
                href='/Blogs'
                className='inline-flex items-center px-6 py-3 border border-green-700 text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors duration-300'
              >
                View All Articles
                <svg
                  className='ml-2 -mr-1 w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function HomeBlogCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldShowReadMore = props.content1 && props.content1.length > 150;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white'
    >
      <div className='flex flex-col sm:flex-row h-full'>
        <div className='relative flex-shrink-0 w-full sm:w-56 h-48 sm:h-auto'>
          <Image
            className='object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none transition-transform duration-500 group-hover:scale-105'
            src={props.img}
            alt={props.title || 'Blog post image'}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:bg-gradient-to-r sm:from-black/20 sm:via-transparent sm:to-transparent' />
        </div>

        <div className='flex-1 p-6 sm:p-5 flex flex-col'>
          <h3 className='text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300'>
            {props.title || 'Untitled Blog Post'}
          </h3>

          <div className='mt-3 text-gray-600 space-y-3'>
            {expanded ? (
              <>
                {props.content1 && <p>{props.content1}</p>}
                {props.content2 && <p>{props.content2}</p>}
                {props.content3 && <p>{props.content3}</p>}
              </>
            ) : (
              <p>
                {props.content1
                  ? shouldShowReadMore
                    ? `${props.content1.substring(0, 150)}...`
                    : props.content1
                  : 'No content available'}
              </p>
            )}
          </div>

          {shouldShowReadMore && (
            <div className='mt-4 sm:mt-auto'>
              <button
                onClick={() => setExpanded(!expanded)}
                className='inline-flex items-center text-green-700 hover:text-green-800 font-medium transition-colors duration-300'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {expanded ? 'Read less' : 'Read more'}
                <motion.svg
                  className='w-4 h-4 ml-1.5'
                  width={16}
                  height={16}
                  viewBox='0 0 16 16'
                  fill='none'
                  animate={{
                    rotate: expanded ? 180 : 0,
                    x: isHovered ? (expanded ? -2 : 2) : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <path
                    d='M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                  />
                </motion.svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
