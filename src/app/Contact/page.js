/** @format */

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import NavComponent2 from '../../Components/NavComponent2';
import FooterSection from '../../Components/FooterSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Head>
        <title>Contact Us | Imo State Ministry Of Works</title>
        <meta
          name='description'
          content='Get in touch with the Imo State Ministry of Works'
        />
      </Head>

      <NavComponent2 />

      <main className='flex-grow'>
        {/* Hero Section */}
        <section className='relative bg-green-700 text-white py-20'>
          <div className='absolute inset-0 overflow-hidden'>
            <Image
              src='/img_3.jpg'
              alt='Contact background'
              fill
              className='object-cover opacity-20'
            />
          </div>
          <div className='container mx-auto px-6 relative z-10 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-5xl font-bold mb-4'
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='text-xl max-w-2xl mx-auto'
            >
              We're here to help and answer any questions you may have
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className='py-16 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='bg-white rounded-xl shadow-lg p-8'
              >
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                  Send Us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className='mb-6 p-4 bg-green-100 text-green-700 rounded-lg'>
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-lg'>
                    There was an error submitting your message. Please try
                    again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Full Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Email Address
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Subject
                    </label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    >
                      <option value=''>Select a subject</option>
                      <option value='General Inquiry'>General Inquiry</option>
                      <option value='Road Maintenance'>Road Maintenance</option>
                      <option value='Project Proposal'>Project Proposal</option>
                      <option value='Complaint'>Complaint</option>
                      <option value='Feedback'>Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Your Message
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      rows='5'
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 rounded-lg font-medium text-white ${
                        isSubmitting
                          ? 'bg-green-400'
                          : 'bg-green-600 hover:bg-green-700'
                      } transition-colors`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='space-y-8'
              >
                <div className='bg-white rounded-xl shadow-lg p-8'>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                    Our Office
                  </h2>

                  <div className='space-y-6'>
                    <div className='flex items-start'>
                      <div className='flex-shrink-0 mt-1'>
                        <svg
                          className='h-6 w-6 text-green-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-lg font-medium text-gray-800'>
                          Headquarters
                        </h3>
                        <p className='mt-1 text-gray-600'>
                          State Secretariat Complex, Port Harcourt Road
                          <br />
                          Owerri, Imo State, Nigeria
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <div className='flex-shrink-0 mt-1'>
                        <svg
                          className='h-6 w-6 text-green-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-lg font-medium text-gray-800'>
                          Phone Numbers
                        </h3>
                        <p className='mt-1 text-gray-600'>
                          Main: +234 803 123 4567
                          <br />
                          Office: +234 814 567 8901
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <div className='flex-shrink-0 mt-1'>
                        <svg
                          className='h-6 w-6 text-green-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-lg font-medium text-gray-800'>
                          Email Addresses
                        </h3>
                        <p className='mt-1 text-gray-600'>
                          General: info@imostatemow.org
                          <br />
                          Support: support@imostatemow.org
                        </p>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <div className='flex-shrink-0 mt-1'>
                        <svg
                          className='h-6 w-6 text-green-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <h3 className='text-lg font-medium text-gray-800'>
                          Office Hours
                        </h3>
                        <p className='mt-1 text-gray-600'>
                          Monday - Friday: 8:00 AM - 5:00 PM
                          <br />
                          Saturday: 9:00 AM - 1:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Embed */}
                <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
                  <div className='h-64 w-full'>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d7.033845315769939!3d5.486295796081967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042598f6a8f6a07%3A0x1d3e5a1b9a0a0a0a!2sImo%20State%20Secretariat!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen=''
                      loading='lazy'
                      title='Imo State Ministry of Works Location'
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
