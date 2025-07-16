/** @format */

'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import imoLogo2 from '../Assets/imo-logo2.jpg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavComponent2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/About', label: 'About' },
    { href: '/Projects', label: 'Projects' },
    { href: '/Blogs', label: 'News & Blogs' },
    { href: '/Contact', label: 'Contact' },
  ];

  return (
    <header className='bg-gradient-to-r from-green-800 to-green-600 shadow-lg sticky top-0 w-full z-50'>
      <nav className='mx-auto max-w-7xl px-6 py-4' aria-label='Global'>
        <div className='flex items-center justify-between'>
          <div className='flex lg:flex-1'>
            <Link href='/' className='flex items-center gap-4'>
              <Image
                className='h-14 w-auto rounded-full border-2 border-white/30 shadow-md transition-transform hover:scale-105'
                src={imoLogo2}
                alt='Imo State Ministry of Works Logo'
                priority
              />
              <h1 className='font-extrabold uppercase text-white text-left text-xl tracking-tight leading-tight'>
                Imo State Ministry <br /> of Works
              </h1>
            </Link>
          </div>

          <div className='flex lg:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-full p-2.5 text-white hover:bg-green-700/50 transition-colors'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-7 w-7' aria-hidden='true' />
            </button>
          </div>

          <div className='hidden lg:flex lg:gap-x-10 lg:items-center'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={classNames(
                  'relative text-base font-semibold transition-colors px-4 py-2 rounded-lg group',
                  pathname === item.href
                    ? 'text-green-100'
                    : 'text-white hover:text-green-100'
                )}
              >
                {item.label}
                <span
                  className={classNames(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-green-300 transform transition-transform duration-300 ease-out',
                    pathname === item.href
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  )}
                ></span>
              </Link>
            ))}
            <Link
              href='/suggestion'
              className='ml-6 bg-white text-green-800 px-6 py-2 rounded-full font-semibold hover:bg-green-100 hover:shadow-lg transition-all duration-300'
            >
              E-Suggestion Box
            </Link>
          </div>
        </div>
      </nav>

      <Transition appear show={mobileMenuOpen} as={Fragment}>
        <Dialog as='div' className='lg:hidden' onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-md' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-x-full'
            enterTo='opacity-100 translate-x-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-x-0'
            leaveTo='opacity-0 translate-x-full'
          >
            <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-gradient-to-b from-green-800 to-green-600 px-6 py-6 sm:max-w-sm'>
              <div className='flex items-center justify-between'>
                <Link href='/' className='flex items-center gap-4'>
                  <Image
                    className='h-14 w-auto rounded-full border-2 border-white/30 shadow-md'
                    src={imoLogo2}
                    alt='Imo State Ministry of Works Logo'
                  />
                  <h1 className='font-extrabold uppercase text-white text-left text-xl tracking-tight leading-tight'>
                    Imo State Ministry <br /> of Works
                  </h1>
                </Link>
                <button
                  type='button'
                  className='rounded-full p-2.5 text-white hover:bg-green-700/50 transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon className='h-7 w-7' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-10 flow-root'>
                <div className='space-y-4'>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={classNames(
                        'block rounded-lg px-4 py-3 text-base font-semibold transition-colors',
                        pathname === item.href
                          ? 'bg-green-700/50 text-green-100'
                          : 'text-white hover:bg-green-700/50'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href='/suggestion'
                    className='block rounded-full px-4 py-3 text-base font-semibold bg-white text-green-800 hover:bg-green-100 transition-colors text-center mt-6'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    E-Suggestion Box
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </header>
  );
}
