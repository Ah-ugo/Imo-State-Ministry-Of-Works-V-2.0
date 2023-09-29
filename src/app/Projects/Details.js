"use client";
import React, { useEffect, useState } from "react";
import NavComponent2 from "../../Components/NavComponent2";
import FooterSection from "../../Components/FooterSection";
import axios from "axios";
import lottieJson from "../../../public/animation_lkjfxofn.json";
import Lottie from "react-lottie-player";
import Image from "next/image";

const Details = () => {
  const [showCard, setShowCard] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleProject = (category) => {
    setShowCard(category);
  };
  const ViewData = async () => {
    await axios
      .get("https://parseapi.back4app.com/classes/Projects", {
        headers: {
          "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
          "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
        },
      })
      .then((res) => {
        setProjects(res.data.results);
        console.log(res.data.results + "" + "mcmcmcck");
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
    <>
      <NavComponent2 />
      <section
        className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]"
        // style={{ fontFamily: "Cabin" }}
      >
        <div className="px-3">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="block mb-2 text-green-700 text-lg font-semibold text-primary">
                  Our Projects
                </span>
                <h2 className="mb-4 text-green-700 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                  Our Recent Projects
                </h2>
                <p className="text-base text-body-color">
                  Explore our diverse range of recent projects that showcase our
                  commitment to transforming Imo State &apos;s infrastructure.
                  From roads and bridges to public transport and sustainable
                  urban planning, we are dedicated to creating a better,
                  well-connected future for all residents. Together, let &apos;s
                  shape a progressive Imo State for generations to come.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4"></div>
          </div>
          {loaded ? (
            <div className="flex flex-wrap -mx-4">
              {projects
                .map((project) => {
                  return (
                    <PortfolioCard
                      key={project.id}
                      ImageHref={project.image.url}
                      title={project.title}
                      showCard={showCard}
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
      </section>
      <FooterSection />
    </>
  );
};

export default Details;

const PortfolioCard = ({
  showCard,
  category,
  ImageHref,
  title,
  button,
  buttonHref,
}) => {
  return (
    <>
      <div
        className={`w-full my-4 px-4 md:w-1/2 xl:w-1/3 ${
          showCard === "all" || showCard === category.toLowerCase()
            ? "block"
            : "hidden"
        }`}>
        <div className="mb-12">
          <div className="overflow-hidden rounded-lg">
            <img src={ImageHref} alt="portfolio" className="w-full" />
          </div>
          <div className="relative z-10 px-3 -mt-20 text-center bg-white rounded-lg shadow-lg mx-7 py-9">
            <span className="block mb-2 text-sm font-semibold text-primary">
              {category}
            </span>
            <h3 className="mb-4 text-xl font-bold text-dark">{title}</h3>
            <a
              href={buttonHref}
              className="inline-block py-3 text-sm font-semibold transition border rounded-md px-7 text-body-color hover:border-primary hover:bg-primary hover:text-white">
              {button}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
