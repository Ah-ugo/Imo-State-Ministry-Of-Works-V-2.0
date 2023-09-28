"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavComponent2 from "../../../Components/NavComponent2";
import FooterSection from "../../../Components/FooterSection";
import lottieJson from "../../../../public/animation_lkjfxofn.json";
import Lottie from "react-lottie-player";
import Image from "next/image";

function BlogDetail({ params }) {
  const [blog, setBlog] = useState({});
  const [loaded, setLoaded] = useState(false);

  const fetchBlog = async () => {
    const url = `https://parseapi.back4app.com/classes/BlogPost/${params.id}`;
    const response = await axios.get(url, {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
      },
    });
    return response.data;
  };

  useEffect(async () => {
    const blogData = await fetchBlog();
    setBlog(blogData);
    setLoaded(true);
  }, [params.id]);

  return (
    <div>
      <NavComponent2 />

      {loaded ? (
        <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-green-700 md:text-3xl">
                {blog.title}
              </h2>

              <p className="text-lg text-gray-800">{blog.content}</p>
            </div>

            <p className="text-lg text-gray-800">{blog.paragraph1}</p>

            <figure>
              <Image
                className="w-full object-cover rounded-xl"
                src={blog.image1 && blog.image1.url}
                alt="Image Description"
              />
              <figcaption className="mt-3 text-sm text-center text-gray-500">
                {blog.image1Caption}
              </figcaption>
            </figure>

            <p className="text-lg text-gray-800">{blog.paragraph2}</p>

            <p className="text-lg text-gray-800">{blog.paragraph3}</p>

            <blockquote className="text-center p-4 sm:px-7">
              <p className="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal">
                {blog.quote}
              </p>
              <p className="mt-5 text-gray-800">{blog.quoteAuthor}</p>
            </blockquote>

            <figure>
              <Image
                className="w-full object-cover rounded-xl"
                src={blog.image2 && blog.image2.url}
                alt="Image Description"
              />

              <figcaption className="mt-3 text-sm text-center text-gray-500">
                {blog.image2Caption}
              </figcaption>
            </figure>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">{blog.subHeading1}</h3>

              <p className="text-lg text-gray-800">{blog.subHeadingContent1}</p>
            </div>

            <p className="text-lg text-gray-800">{blog.paragraph5}</p>
          </div>

          <div className="block h-3 border-r border-gray-300 mx-3"></div>

          <div className="block h-3 border-r border-gray-300 mx-3"></div>

          {/*  */}
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

      <FooterSection />
    </div>
  );
}

export default BlogDetail;
