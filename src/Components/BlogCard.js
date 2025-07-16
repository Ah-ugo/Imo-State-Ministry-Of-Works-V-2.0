/** @format */
import Image from 'next/image';
import React from 'react';

export default function BlogCard(props) {
  return (
    <div className='group'>
      <a href={props.link} className='block'>
        <article className='relative overflow-hidden rounded-lg shadow transition hover:shadow-lg h-64'>
          <Image
            alt={props.title || 'Blog post image'}
            src={props.image || '/placeholder-blog.jpg'}
            fill
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />

          <div className='relative bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent h-full flex flex-col justify-end'>
            <div className='p-4 sm:p-6'>
              {props.date && (
                <time className='block text-xs text-white/90 mb-1'>
                  {props.date}
                </time>
              )}
              <h3 className='text-lg font-medium text-white'>{props.title}</h3>
            </div>
          </div>
        </article>
      </a>
    </div>
  );
}
