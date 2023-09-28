import React from "react";
import AboutHero from "../../Components/AboutHero";
import NavComponent2 from "../../Components/NavComponent2";
import FooterSection from "../../Components/FooterSection";
import "../../app/globals.css";

export const metadata = {
  title: "About || Imo State Ministry Of Works",
  description: "About Imo State Ministry Of Works",
};

export default function About() {
  return (
    <div>
      <NavComponent2 />
      <AboutHero />
      <FooterSection />
    </div>
  );
}
