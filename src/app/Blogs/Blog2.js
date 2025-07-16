/** @format */

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';
import NavComponent2 from '../../Components/NavComponent2';
import FooterSection from '../../Components/FooterSection';
import lottieJson from '../../../public/animation_lkjfxofn.json';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import Head from 'next/head';

function Blog2() {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-screen flex flex-col'>
      <Head>
        <title>Blog | Imo State Ministry Of Works</title>
        <meta
          name='description'
          content='Latest news and articles from Imo State Ministry of Works'
        />
      </Head>

      <NavComponent2 />

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-green-700 to-green-600 py-16 text-white'>
          <div className='container mx-auto px-6 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-5xl font-bold mb-4'
            >
              Ministry Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='text-xl md:text-2xl max-w-3xl mx-auto'
            >
              Insights, updates, and news from Imo State Ministry of Works
            </motion.p>
          </div>
        </section>

        {/* Blog Content */}
        <section className='py-12 px-4 sm:px-6 lg:px-8 bg-white'>
          <div className='max-w-7xl mx-auto'>
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='mb-12'
            >
              <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                  Latest Articles
                </h2>
                <div className='w-full md:w-96'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Search articles...'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                      className='absolute right-3 top-2.5 h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Grid */}
            {!loaded ? (
              <div className='flex justify-center py-12'>
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: 300, height: 300 }}
                />
              </div>
            ) : (
              <>
                {filteredBlogs.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  >
                    {filteredBlogs.map((blog, index) => (
                      <motion.div
                        key={blog.objectId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <BlogCard
                          link={`/Blogs/${blog.objectId}`}
                          title={blog.title}
                          image={blog.image1?.url}
                          date={blog.date}
                          excerpt={blog.content?.substring(0, 120) + '...'}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className='text-center py-12'>
                    <h3 className='text-xl font-medium text-gray-600'>
                      No articles found matching your search
                    </h3>
                    <button
                      onClick={() => setSearchQuery('')}
                      className='mt-4 px-4 py-2 text-green-600 hover:text-green-800 font-medium'
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

export default Blog2;
