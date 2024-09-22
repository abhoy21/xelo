import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowUpRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Hero section animation with GSAP
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl
      .from(hero.querySelector("h1"), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        hero.querySelector("p"),
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        hero.querySelector("a"),
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className='hero w-full bg-texture py-24 md:py-32 lg:py-40 overflow-hidden relative'
    >
      <div className='container px-4 md:px-6 mx-auto relative z-10'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h1 className='flex justify-center items-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-500 pb-4'>
              <Terminal size={64} className='text-blue-500 mr-2 mt-3' />
              Code at the Speed of Thought
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl'>
              Xelo: The lightweight yet powerful source code editor of choice.
            </p>
          </div>
          <div className='space-x-4'>
            <Link
              href='/editor'
              className='inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md text-sm font-medium'
            >
              <ArrowUpRight className='mr-2 h-4 w-4' />
              Get Started
            </Link>
            <Button
              variant='outline'
              className='inline-flex items-center justify-center border-gray-600 text-gray-500 hover:bg-gray-800 hover:text-gray-200 transition-colors px-4 py-2 rounded-md text-sm font-medium'
            >
              <Terminal className='mr-2 h-4 w-4' />
              Other platforms
            </Button>
          </div>
        </div>
      </div>
      <div className='absolute inset-0 bg-pattern opacity-10'></div>
    </section>
  );
}
