"use client";
import { initializeAnimations } from "@/hooks/animations";
import { useEffect } from "react";
import CTA from "../_components/CTAComponent";
import Features from "../_components/FeaturesComponent";
import Footer from "../_components/FooterComponent";
import Header from "../_components/HeaderComponent";
import Hero from "../_components/HeroComponent";
import Testimonials from "../_components/TestimonialsComponent";

export default function Component() {
  useEffect(() => {
    initializeAnimations();
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#101010] text-gray-100 font-sans overflow-hidden'>
      <div className='custom-cursor'></div>
      <Header />
      <main className='flex-1 pt-16'>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
