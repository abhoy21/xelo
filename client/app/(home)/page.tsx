"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronRight,
  Code,
  GitBranch,
  Menu,
  Settings,
  Star,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const featuresRef = useRef<HTMLElement | null>(null);
  const testimonialsRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const hero = heroRef.current;
    //   const featuresRef = useRef<HTMLElement | null>(null);
    // const testimonialsRef = useRef<HTMLElement | null>(null);
    const cta = ctaRef.current;
    const cursor = cursorRef.current;

    // Custom cursor animation
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", moveCursor);

    // Header animation
    if (header) {
      gsap.fromTo(
        header,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );
    }

    // Hero section animation with parallax
    if (hero) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const heroTitle = hero.querySelector("h1");
      const heroDescription = hero.querySelector("p");
      const heroButtons = hero.querySelectorAll("button");

      if (heroTitle) {
        heroTl.fromTo(heroTitle, { y: 0 }, { y: -50 });
      }

      if (heroDescription) {
        heroTl.fromTo(heroDescription, { y: 0 }, { y: -30 }, "<");
      }

      if (heroButtons.length) {
        heroTl.fromTo(heroButtons, { y: 0 }, { y: -20 }, "<");
      }
    }

    // Features section animation with parallax
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    });

    // Testimonials section animation with parallax
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    });

    // CTA section animation with parallax
    if (cta) {
      gsap.fromTo(
        cta,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    }

    // Parallax background effect
    gsap.to(".bg-pattern", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#121212] text-gray-100 font-sans overflow-hidden'>
      <div ref={cursorRef} className='custom-cursor'></div>
      <header
        ref={headerRef}
        className='px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full z-50 bg-[#1a1a1a] bg-opacity-80 backdrop-blur-md'
      >
        <Link className='flex items-center justify-center' href='#'>
          <Code className='h-6 w-6 text-blue-400' />
          <span className='ml-2 text-lg font-bold'>Xelo: Cloud_IDE</span>
        </Link>
        <nav
          className={`ml-auto flex gap-6 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <Link
            className='text-sm font-medium hover:text-blue-400 transition-colors'
            href='#'
          >
            Features
          </Link>
          <Link
            className='text-sm font-medium hover:text-blue-400 transition-colors'
            href='#'
          >
            Docs
          </Link>
          <Link
            className='text-sm font-medium hover:text-blue-400 transition-colors'
            href='#'
          >
            Extensions
          </Link>
          <Link
            className='text-sm font-medium hover:text-blue-400 transition-colors'
            href='#'
          >
            Blog
          </Link>
        </nav>
        <button
          className='ml-auto md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className='h-6 w-6' />
        </button>
      </header>
      <main className='flex-1 pt-16'>
        <section
          ref={heroRef}
          className='w-full bg-texture py-24 md:py-32 lg:py-40 overflow-hidden relative'
        >
          <div className='container px-4 md:px-6 mx-auto relative z-10'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='flex justify-center items-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-500 pb-4'>
                  <Terminal size={64} className='text-blue-500 mr-2 mt-3' />
                  Code at the Speed of Thought
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl'>
                  Xelo: The lightweight yet powerful source code editor of
                  choice for millions of developers.
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
        <section
          ref={featuresRef}
          className='w-full py-20 bg-gray-[#121212] relative'
        >
          <div className='container px-4 md:px-6 mx-auto relative z-10'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Powerful Features for Modern Development
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
              <FeatureCard
                icon={<Code className='h-10 w-10 text-blue-400' />}
                title='IntelliSense'
                description='Go beyond syntax highlighting and autocomplete with IntelliSense, which provides smart completions based on variable types, function definitions, and imported modules.'
              />
              <FeatureCard
                icon={<Terminal className='h-10 w-10 text-blue-400' />}
                title='Integrated Terminal'
                description='Use your favorite command-line tools without leaving the editor. Run build tasks, npm scripts, and more with an integrated terminal that supports multiple instances.'
              />
              <FeatureCard
                icon={<GitBranch className='h-10 w-10 text-blue-400' />}
                title='Built-in Git'
                description='Review diffs, stage files, and make commits right from the editor. Push and pull from any hosted Git service with built-in source control management.'
              />
              <FeatureCard
                icon={<Settings className='h-10 w-10 text-blue-400' />}
                title='Extensibility'
                description="Customize every feature to your liking and install any number of third-party extensions. VS Code's growing community shares their secret sauce to make it easier to get started."
              />
              <FeatureCard
                icon={<Star className='h-10 w-10 text-blue-400' />}
                title='Remote Development'
                description='Work in remote environments like containers, VMs, or WSL with full access to your tools and extensions, just like you were working locally.'
              />
              <FeatureCard
                icon={<ChevronRight className='h-10 w-10 text-blue-400' />}
                title='And much more...'
                description='Debugging, multi-root workspaces, live share, and hundreds of other features to discover. VS Code is updated monthly with new features and bug fixes.'
              />
            </div>
          </div>
          <div className='absolute inset-0 bg-pattern opacity-5'></div>
        </section>
        <section
          ref={testimonialsRef}
          className='w-full bg-texture py-20 bg-gray-[#1a1a1a] relative'
        >
          <div className='container px-4 md:px-6 mx-auto relative z-10'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Loved by Developers Worldwide
            </h2>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <TestimonialCard
                quote='VS Code has revolutionized the way I code. Its powerful features and extensibility make it my go-to editor for all projects.'
                author='Sarah Johnson'
                role='Senior Frontend Developer'
              />
              <TestimonialCard
                quote="The integrated terminal and Git support in VS Code have significantly improved my workflow. It's an indispensable tool in my development arsenal."
                author='Michael Chen'
                role='Full Stack Engineer'
              />
              <TestimonialCard
                quote="VS Code's IntelliSense is unparalleled. It's like having a coding assistant that understands your project's context."
                author='Emily Rodriguez'
                role='Software Architect'
              />
            </div>
          </div>
          <div className='absolute inset-0 bg-pattern opacity-5'></div>
        </section>
        <section
          ref={ctaRef}
          className='w-full py-20 bg-gray-[#121212] relative'
        >
          <div className='container px-4 md:px-6 mx-auto relative z-10'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Ready to Transform Your Coding Experience?
                </h2>
                <p className='mx-auto max-w-[600px] text-gray-400 md:text-xl'>
                  Join millions of developers who trust VS Code for their daily
                  coding tasks.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='flex-1 bg-[#1e1e1e] border-gray-600 text-white placeholder-gray-400'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <Button className='bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
                    Get Started
                  </Button>
                </form>
                <p className='text-xs text-gray-400'>
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute inset-0 bg-pattern opacity-5'></div>
        </section>
      </main>
      <footer className='w-full py-6 bg-[#1a1a1a] border-t border-gray-800'>
        <div className='container px-4 md:px-6 mx-auto'>
          <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Product</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Download
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Resources</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Release Notes
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Company</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Legal</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                    href='#'
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-400'>
              © 2023 Microsoft Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className='feature-card flex flex-col items-center space-y-2 p-6 bg-[#1f1f1f] rounded-lg transition-all duration-300 hover:bg-[#2f2f2f] hover:shadow-lg hover:-translate-y-1 ease-linear'>
      {icon}
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-center text-gray-400'>{description}</p>
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
}) => {
  return (
    <div className='testimonial-card p-6 bg-[#1f1f1f] rounded-lg shadow-md transition-all duration-300 hover:bg-[#2f2f2f] hover:-translate-y-1 ease-linear'>
      <p className='text-gray-300 italic mb-4'>&quot;{quote}&quot;</p>
      <div>
        <p className='font-semibold'>{author}</p>
        <p className='text-sm text-gray-400'>{role}</p>
      </div>
    </div>
  );
};
