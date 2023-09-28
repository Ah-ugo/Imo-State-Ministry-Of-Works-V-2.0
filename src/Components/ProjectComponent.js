"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import lottieJson from "../Assets/animation_lkjfxofn.json";
import Lottie from "react-lottie-player";
import Image from "next/image";

export default function ProjectComponent() {
  const [project, setproject] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await axios
      .get("https://parseapi.back4app.com/classes/Projects", {
        headers: {
          "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
          "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
        },
      })
      .then((res) => {
        setproject(res.data.results);
        console.log(res.data.results + "" + "mcmcmcck");
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);
  return (
    <div>
      <section
        class="py-10 lg:py-20 bg-green-700 text-white"
        // style={{ fontFamily: "Cabin" }}
      >
        <div class="mx-10">
          <h2
            className="font-bold text-4xl mb-2"
            // style={{ fontFamily: "Cabin" }}
          >
            PROJECTS - New, On-going, and Completed
          </h2>
          <p className="font-semibold mb-6">
            The news about recent projects in the state
          </p>

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
            <div class="flex flex-wrap -m-3">
              {project
                .map((frogress) => {
                  return (
                    <div class="w-full lg:w-1/3 p-3" key={frogress.id}>
                      <Image
                        class="w-full h-72 rounded-lg object-cover object-top"
                        src={frogress.image.url}
                        alt=""
                      />
                    </div>
                  );
                })
                .slice(project.length - 6)
                .reverse()}
            </div>
          )}
          <div className="flex justify-center mt-6">
            <Link
              href="/Projects"
              className="bg-white text-green-700 p-2 font-semibold rounded hover:bg-gray-400">
              See More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
