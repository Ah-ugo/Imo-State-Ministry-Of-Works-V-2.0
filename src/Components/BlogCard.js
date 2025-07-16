/** @format */

import Image from 'next/image';
import React from 'react';

export default function BlogCard(props) {
  return (
    <div>
      <a href={props.link}>
        <article class='relative overflow-hidden rounded-lg shadow transition hover:shadow-lg'>
          <Image
            alt='Office'
            src={props.image}
            class='absolute inset-0 h-full w-full object-cover'
          />

          <div class='relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64'>
            <div class='p-4 sm:p-6'>
              <time datetime='2022-10-10' class='block text-xs text-white/90'>
                {/* 10th Oct 2022 */}
                {props.date}
              </time>

              <h3 class='mt-0.5 text-sm text-white'>{props.title}</h3>
            </div>
          </div>
        </article>
      </a>
    </div>
  );
}
