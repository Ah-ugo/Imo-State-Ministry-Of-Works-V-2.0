"use client";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import imoLogo2 from "../Assets/imo-logo2.jpg";
import Image from "next/image";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavComponent2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0  w-full z-50">
      <nav
        className="flex bg-white items-center justify-between p-4"
        aria-label="Global">
        <div className="flex bg-white lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <span className="sr-only">Your Company</span>
            <Image className="h-16 w-auto" src={imoLogo2} alt="" />
            <h1 className="font-semibold uppercase text-green-700 text-left">
              Imo State Ministry
              <br /> Of Works
            </h1>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"></Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/"
            style={{ fontSize: 17, fontWeight: "400" }}
            className="text-sm leading-6 text-gray-900">
            Home
          </Link>
          <Link
            href="/About"
            style={{ fontSize: 17, fontWeight: "400" }}
            className="text-sm leading-6 text-gray-900">
            About
          </Link>
          <Link
            href="/Projects"
            style={{ fontSize: 17, fontWeight: "400" }}
            className="text-sm leading-6 text-gray-900">
            Projects
          </Link>
          <Link
            href="/Blogs"
            style={{ fontSize: 17, fontWeight: "400" }}
            className="text-sm leading-6 text-gray-900">
            Our Blogs
          </Link>
          <Link
            href="#"
            style={{ fontSize: 17, fontWeight: "400" }}
            className="text-sm leading-6 text-gray-900">
            Contact
          </Link>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
              <span className="sr-only">Your Company</span>
              <Image className="h-16 w-auto" src={imoLogo2} alt="" />
              <h1 className="font-semibold uppercase text-green-700 text-left">
                Imo State Ministry
                <br /> Of Works
              </h1>
            </a>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => <></>}
                </Disclosure>
                <Link
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </Link>
                <Link
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                  href="/About"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">
                  About
                </Link>
                <Link
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                  href="/Projects"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">
                  Projects
                </Link>
                <Link
                  style={{
                    fontFamily: "Cabin",
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                  href="/Blogs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">
                  Our Blog
                </Link>
                <Link
                  style={{
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
