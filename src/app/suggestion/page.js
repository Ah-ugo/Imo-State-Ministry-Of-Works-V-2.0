/** @format */

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import NavComponent2 from '../../Components/NavComponent2';
import FooterSection from '../../Components/FooterSection';

export default function SuggestionBox() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General',
    suggestion: '',
    anonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: formData.anonymous ? 'Anonymous' : formData.name,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          category: 'General',
          suggestion: '',
          anonymous: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting suggestion:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Head>
        <title>E-Suggestion Box | Imo State Ministry Of Works</title>
        <meta
          name='description'
          content='Share your suggestions with the Imo State Ministry of Works'
        />
      </Head>

      <NavComponent2 />

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative bg-green-700 text-white py-20'>
          <div className='container mx-auto px-6 relative z-10 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-5xl font-bold mb-4'
            >
              E-Suggestion Box
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='text-xl max-w-2xl mx-auto'
            >
              Your ideas help us improve our services
            </motion.p>
          </div>
        </section>

        {/* Suggestion Form */}
        <section className='py-16 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='bg-white rounded-xl shadow-lg p-8'
            >
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                Share Your Suggestion
              </h2>

              {submitStatus === 'success' && (
                <div className='mb-6 p-4 bg-green-100 text-green-700 rounded-lg'>
                  Thank you for your suggestion! We appreciate your input.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-lg'>
                  There was an error submitting your suggestion. Please try
                  again.
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                {!formData.anonymous && (
                  <>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Your Name (Optional)
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Your Email (Optional)
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      />
                    </div>
                  </>
                )}

                <div>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  >
                    <option value='General'>General Suggestion</option>
                    <option value='Roads'>Roads & Infrastructure</option>
                    <option value='Services'>Public Services</option>
                    <option value='Policy'>Policy Improvement</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='suggestion'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Your Suggestion *
                  </label>
                  <textarea
                    id='suggestion'
                    name='suggestion'
                    rows='6'
                    value={formData.suggestion}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='Please describe your suggestion in detail...'
                  ></textarea>
                </div>

                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='anonymous'
                    name='anonymous'
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='anonymous'
                    className='ml-2 block text-sm text-gray-700'
                  >
                    Submit anonymously
                  </label>
                </div>

                <div className='pt-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-lg font-medium text-white ${
                      isSubmitting
                        ? 'bg-green-400'
                        : 'bg-green-600 hover:bg-green-700'
                    } transition-colors`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className='mt-12 bg-white rounded-xl shadow-lg p-8'
            >
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Suggestion Guidelines
              </h2>
              <div className='prose text-gray-600'>
                <ul className='space-y-3'>
                  <li>
                    Suggestions should be constructive and solution-oriented
                  </li>
                  <li>Be specific about the area you're addressing</li>
                  <li>
                    Provide as much detail as possible about your proposed
                    solution
                  </li>
                  <li>Avoid complaints without suggested improvements</li>
                  <li>All suggestions will be reviewed by our team</li>
                  <li>
                    We may contact you for clarification if you provide contact
                    information
                  </li>
                </ul>
                <p className='mt-4 text-sm text-gray-500'>
                  Note: While we review all suggestions, we cannot guarantee
                  implementation of every idea.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
