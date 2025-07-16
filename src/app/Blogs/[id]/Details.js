/** @format */

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavComponent2 from '../../../Components/NavComponent2';
import FooterSection from '../../../Components/FooterSection';
import lottieJson from '../../../../public/animation_lkjfxofn.json';
import Lottie from 'react-lottie-player';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

function BlogDetail({ params }) {
  const [blog, setBlog] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const url = `https://parseapi.back4app.com/classes/BlogPost/${params.id}`;
        const response = await axios.get(url, {
          headers: {
            'X-Parse-Application-Id': process.env.NEXT_PUBLIC_APP_ID,
            'X-Parse-REST-API-Key': process.env.NEXT_PUBLIC_REST_KEY,
          },
        });
        setBlog(response.data);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching blog:', error);
        router.push('/Blogs');
      }
    };

    fetchBlog();
  }, [params.id, router]);

  if (!loaded) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 300, height: 300 }}
        />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Head>
        <title>{blog.title} | Imo State Ministry Of Works</title>
        <meta name='description' content={blog.content?.substring(0, 160)} />
      </Head>

      <NavComponent2 />

      <main className='flex-grow'>
        {/* Article Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='bg-white py-12 px-4 sm:px-6 lg:px-8'
        >
          <div className='max-w-4xl mx-auto'>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className='mb-6'
            >
              <button
                onClick={() => router.back()}
                className='flex items-center text-green-600 hover:text-green-800 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                Back to Blogs
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='mb-8'
            >
              <span className='inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 mb-4'>
                Ministry News
              </span>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                {blog.title}
              </h1>
              {blog.date && (
                <p className='text-gray-500'>
                  Published on {format(new Date(blog.date), 'MMMM d, yyyy')}
                </p>
              )}
            </motion.div>

            {blog.image1?.url && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8'
              >
                <Image
                  src={blog.image1.url}
                  alt={blog.image1Caption || blog.title}
                  fill
                  className='object-cover'
                  priority
                />
                {blog.image1Caption && (
                  <figcaption className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2 text-center'>
                    {blog.image1Caption}
                  </figcaption>
                )}
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Article Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='py-12 px-4 sm:px-6 lg:px-8'
        >
          <div className='max-w-2xl mx-auto prose prose-lg text-gray-700'>
            {blog.content && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='text-lg leading-relaxed mb-6'
              >
                {blog.content}
              </motion.p>
            )}

            {blog.paragraph1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className='text-lg leading-relaxed mb-6'
              >
                {blog.paragraph1}
              </motion.p>
            )}

            {blog.paragraph2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className='text-lg leading-relaxed mb-6'
              >
                {blog.paragraph2}
              </motion.p>
            )}

            {blog.quote && (
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className='border-l-4 border-green-500 pl-4 my-8 italic text-gray-600'
              >
                <p className='text-xl'>{blog.quote}</p>
                {blog.quoteAuthor && (
                  <footer className='mt-2 text-gray-500'>
                    &mdash; {blog.quoteAuthor}
                  </footer>
                )}
              </motion.blockquote>
            )}

            {blog.image2?.url && (
              <motion.figure
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className='my-8'
              >
                <div className='relative w-full h-64 md:h-96 rounded-lg overflow-hidden'>
                  <Image
                    src={blog.image2.url}
                    alt={blog.image2Caption || 'Blog image'}
                    fill
                    className='object-cover'
                  />
                </div>
                {blog.image2Caption && (
                  <figcaption className='mt-2 text-sm text-center text-gray-500'>
                    {blog.image2Caption}
                  </figcaption>
                )}
              </motion.figure>
            )}

            {blog.subHeading1 && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className='text-2xl font-bold text-gray-800 mt-8 mb-4'
              >
                {blog.subHeading1}
              </motion.h2>
            )}

            {blog.subHeadingContent1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className='text-lg leading-relaxed mb-6'
              >
                {blog.subHeadingContent1}
              </motion.p>
            )}

            {blog.paragraph5 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className='text-lg leading-relaxed mb-6'
              >
                {blog.paragraph5}
              </motion.p>
            )}
          </div>
        </motion.section>
      </main>

      <FooterSection />
    </div>
  );
}

export default BlogDetail;
