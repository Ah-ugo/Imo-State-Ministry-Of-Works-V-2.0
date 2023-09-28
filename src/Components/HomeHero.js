import React from "react";
// import "../styles/App.css";

export default function HomeHero() {
  return (
    <div>
      <header id="up" class="bg-center bg-no-repeat hero-header bg-cover">
        <div
          class="bg-opacity-50 bg-black flex items-center justify-center h-96 lg:h-screen"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <div class="mx-2 text-center">
            <h1 class="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
              <span class="text-white">Right</span> Place To
            </h1>
            <h2 class="text-gray-200 font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
              Connecting Communities,{" "}
              <span class="text-white">Building Tomorrow:</span>
            </h2>
            <p class="text-gray-100 font-semibold text-xl xs:text-2xl md:text-3xl mt-10">
              Imo State Ministry of Works{" "}
              <span class="text-white">Pioneering </span> Progress!
            </p>
            <div class="inline-flex">
              {/* <button class="p-2 my-5 mx-2 bg-indigo-700 hover:bg-indigo-800 font-bold text-white rounded border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl">
                Hire US!
              </button> */}
              <a href="/About">
                <button class="p-2 my-5 mx-2 border-0 hover:bg-opacity-100 bg-green-700 rounded hover:bg-green-800 font-bold text-white shadow transition duration-500 md:text-lg">
                  Discover More
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
