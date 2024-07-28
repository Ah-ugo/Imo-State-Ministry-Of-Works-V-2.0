"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../Components/BlogCard";
import NavComponent2 from "../../Components/NavComponent2";
import FooterSection from "../../Components/FooterSection";
import lottieJson from "../../../public/animation_lkjfxofn.json";
import Lottie from "react-lottie-player";

function Blog2() {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const ViewData = () => {
    // Replace YOUR_PARSE_APP_ID and YOUR_PARSE_REST_API_KEY with your Back4App credentials
    const url = "https://parseapi.back4app.com/classes/BlogPost";
    axios
      .get(url, {
        headers: {
          "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
          "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
        },
      })
      .then((response) => {
        console.log(response);
        setBlogs(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  useEffect(() => {
    ViewData();
  }, []);

  return (
    <div>
      <NavComponent2 />
      <div class="w-full p-12 bg-white">
        <div class="flex justify-center mb-12 header">
          <div class="title text-center">
            <p class="mb-4 text-4xl text-green-700 font-bold">
              Read From Our Blog
            </p>
            <p class="text-2xl font-light text-gray-400">
              All article are verified by 2 experts and validate by the CTO
            </p>
          </div>
          {/* <div class="text-end">
            <form class="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div class=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Search'
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter a title"
                />
              </div>
              <button
                class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit">
                Search
              </button>
            </form>
          </div> */}
        </div>

        {loaded ? (
          <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {blogs
              .map((blog) => {
                return (
                  <BlogCard
                    key={blog.id}
                    link={`/Blogs/${blog.objectId}`}
                    title={blog.title}
                    image={blog.image1.url}
                    date={blog.date}
                  />
                );
              })
              .reverse()}
          </div>
        ) : (
          <div className="flex justify-center">
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: "50%", height: "50%" }}
            />
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

export default Blog2;
