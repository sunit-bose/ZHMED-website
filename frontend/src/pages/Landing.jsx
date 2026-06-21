import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Specialties from "@/components/sections/Specialties";
import PainPoints from "@/components/sections/PainPoints";
import Process from "@/components/sections/Process";
import BrandBand from "@/components/sections/BrandBand";
import About from "@/components/sections/About";
import TrustBar from "@/components/sections/TrustBar";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Landing() {
  const location = useLocation();

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  }, [location.state]);

  return (
    <div data-testid="landing-page">
      <Hero />
      <PainPoints />
      <Services />
      <Specialties />
      <Process />
      <BrandBand />
      <About />
      <TrustBar />
      <BlogPreview />
      <FAQ />
      <Contact />
    </div>
  );
}
