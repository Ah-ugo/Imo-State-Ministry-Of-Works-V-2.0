import React from "react";
import sirNwosu from "../../public/sirNwosu.jpg";
import sirNwosu2 from "../../public/sirNwosu2.jpg";
import sirNwosu3 from "../../public/sirNwosu3.jpg";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div>
      <div
        // style={{ fontFamily: "Cabin" }}
        class="bg-white overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 lg:items-center">
        <div class="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 class="text-3xl font-extrabold text-green-700 sm:text-4xl">
            <span class="block">
              Building Imo State &apos; s Tomorrow: Pioneering Progress,
              Connecting Communities!
            </span>
          </h2>
          <p class="text-md mt-4 text-gray-400">
            Welcome to the official website of the Imo State Ministry of Works.
            As the heartbeat of infrastructure development, we are dedicated to
            creating a vibrant and sustainable future for our beloved state.
            With innovation, expertise, and unwavering commitment, we pave the
            way to connect our communities, making dreams a reality. Discover
            our transformative projects, explore cutting-edge technologies, and
            witness the transformative power of visionary leadership. Together,
            we build the foundations of progress and prosperity, forging a
            legacy that will stand the test of time. Join us on this remarkable
            journey as we construct roads that lead to boundless opportunities,
            bridges that unite hearts, and structures that embody excellence.
            With every brick we lay and every mile we pave, we strive for a
            stronger, safer, and more prosperous Imo State.
          </p>
          <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
              <a href="/About">
                <button
                  type="button"
                  class="py-2 px-4  bg-green-700 hover:bg-green-800 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  About Us
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-8 p-8 lg:p-24">
          <Image src={sirNwosu} class="w-1/2 rounded-lg lg:w-full" alt="Tree" />
          <div>
            <Image src={sirNwosu2} class="mb-8 rounded-lg w-auto" alt="Tree" />
            <Image src={sirNwosu3} class="rounded-lg w-auto" alt="Tree" />
          </div>
        </div>
      </div>
    </div>
  );
}
