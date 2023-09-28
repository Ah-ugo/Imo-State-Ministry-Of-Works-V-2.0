"use client";
import React, { useEffect, useState } from "react";
import HomeBlogCard from "./HomeBlogCard";
import axios from "axios";
import lottieJson from "../Assets/animation_lkjfxofn.json";
import Lottie from "react-lottie-player";

export default function BlogSection() {
  const [read1, setRead1] = useState(false);
  const [read2, setRead2] = useState(false);
  const [read3, setRead3] = useState(false);
  const [read4, setRead4] = useState(false);
  const [blog, setBlog] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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
        setBlog(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div>
      <>
        {/* Card Blog */}
        <div
          className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
          // style={{ fontFamily: "Cabin" }}
        >
          <h2
            className="font-bold text-4xl mb-6 text-green-700"
            // style={{ fontFamily: "Cabin" }}
          >
            News and Publications
          </h2>
          {/* Grid */}
          {!loaded ? (
            <div className="flex justify-center">
              <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: "50%", height: "50%" }}
              />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
              {/* Card */}
              {blog
                .map((res) => (
                  <HomeBlogCard
                    img={res.image1.url}
                    title={res.title}
                    content1={res.content}
                    content2={res.paragraph1}
                    content3={res.paragraph2}
                  />
                ))
                .reverse()}
            </div>
          )}
          {/* End Grid */}
        </div>
        {/* End Card Blog */}
      </>
    </div>
  );
}
