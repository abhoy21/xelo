"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  ChevronRight,
  Code,
  GitBranch,
  Settings,
  Star,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

// Define types for the props of FeatureCard and TestimonialCard components
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Ensure this is only run on the client side
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <div className='flex flex-col min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-sans'>
      <header
        className={`px-4 lg:px-6 h-16 flex items-center justify-center fixed top-0 w-full z-50 transition-all duration-200 ${
          isScrolled ? "bg-[#1e1e1e] shadow-lg" : "bg-transparent"
        }`}
      >
        <div className='container mx-auto flex items-center justify-between'>
          <Link className='flex items-center justify-center' href='#'>
            <Code className='h-6 w-6 text-[#0078d4]' />
            <span className='ml-2 text-lg font-bold'>Xelo</span>
          </Link>
          <nav className='flex gap-6'>
            <Link
              className='text-sm font-medium hover:text-[#0078d4] transition-colors'
              href='#'
            >
              Features
            </Link>
            <Link
              className='text-sm font-medium hover:text-[#0078d4] transition-colors'
              href='#'
            >
              Docs
            </Link>
            <Link
              className='text-sm font-medium hover:text-[#0078d4] transition-colors'
              href='#'
            >
              Extensions
            </Link>
            <Link
              className='text-sm font-medium hover:text-[#0078d4] transition-colors'
              href='#'
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>
      <main className='flex-1 pt-16'>
        <section className='w-full bg-texture py-24 md:py-32 lg:py-40 overflow-hidden'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#0078d4] to-[#00bcf2] animate-gradient pb-4'>
                  Code at the Speed of Thought
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-400 md:text-xl lg:text-2xl animate-fade-in'>
                  Xelo: A cloud-based, lightweight, yet powerful IDE, empowering
                  developers to code from anywhere, anytime.
                </p>
              </div>
              <div className='space-x-4 animate-fade-in-up'>
                <Link href='/editor'>
                  <Button className='bg-[#0078d4] text-white hover:bg-[#0066b5] transition-colors'>
                    <ArrowUpRight className='mr-2 h-4 w-4' />
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant='outline'
                  className='border-gray-600 text-gray-500 hover:bg-gray-800 transition-colors'
                >
                  <Terminal className='mr-2 h-4 w-4' />
                  Other platforms
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-20 bg-[#252526]'>
          <div className='container mx-auto px-4 md:px-6'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Powerful Features for Modern Development
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
              <FeatureCard
                icon={<Code className='h-10 w-10 text-[#0078d4]' />}
                title='IntelliSense'
                description='Go beyond syntax highlighting and autocomplete with IntelliSense, which provides smart completions based on variable types, function definitions, and imported modules.'
              />
              <FeatureCard
                icon={<Terminal className='h-10 w-10 text-[#0078d4]' />}
                title='Integrated Terminal'
                description='Use your favorite command-line tools without leaving the editor. Run build tasks, npm scripts, and more with an integrated terminal that supports multiple instances.'
              />
              <FeatureCard
                icon={<GitBranch className='h-10 w-10 text-[#0078d4]' />}
                title='Built-in Git'
                description='Review diffs, stage files, and make commits right from the editor. Push and pull from any hosted Git service with built-in source control management.'
              />
              <FeatureCard
                icon={<Settings className='h-10 w-10 text-[#0078d4]' />}
                title='Extensibility'
                description="Customize every feature to your liking and install any number of third-party extensions. Xelo's growing community shares their secret sauce to make it easier to get started."
              />
              <FeatureCard
                icon={<Star className='h-10 w-10 text-[#0078d4]' />}
                title='Remote Development'
                description='Work in remote environments like containers, VMs, or WSL with full access to your tools and extensions, just like you were working locally.'
              />
              <FeatureCard
                icon={<ChevronRight className='h-10 w-10 text-[#0078d4]' />}
                title='And much more...'
                description='Debugging, multi-root workspaces, live share, and hundreds of other features to discover. Xelo is updated monthly with new features and bug fixes.'
              />
            </div>
          </div>
        </section>
        <section className='w-full py-20'>
          <div className='container mx-auto px-4 md:px-6'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Loved by Developers Worldwide
            </h2>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <TestimonialCard
                quote='Xelo has revolutionized the way I code. Its powerful features and extensibility make it my go-to editor for all projects.'
                author='Sarah Johnson'
                role='Senior Frontend Developer'
              />
              <TestimonialCard
                quote="The integrated terminal and Git support in Xelo have significantly improved my workflow. It's an indispensable tool in my development arsenal."
                author='Michael Chen'
                role='Full Stack Engineer'
              />
              <TestimonialCard
                quote="Xelo's IntelliSense is unparalleled. It's like having a coding assistant that understands your project's context."
                author='Emily Rodriguez'
                role='Software Architect'
              />
            </div>
          </div>
        </section>
        <section className='w-full py-20 bg-[#252526]'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
                  Ready to Transform Your Coding Experience?
                </h2>
                <p className='mx-auto max-w-[600px] text-gray-400 md:text-xl'>
                  Join millions of developers who trust Xelo for their daily
                  coding tasks.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <form className='flex space-x-2'>
                  <Input
                    className='max-w-lg flex-1 bg-[#3c3c3c] border-gray-600 text-white placeholder-gray-400'
                    placeholder='Enter your email'
                    type='email'
                  />
                  <Button className='bg-[#0078d4] text-white hover:bg-[#0066b5] transition-colors'>
                    Get Started
                  </Button>
                </form>
                <p className='text-xs text-gray-400'>
                  By subscribing, you agree to our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full py-6 bg-[#1e1e1e] border-t border-gray-800'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Product</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Download
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Company</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Resources</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className='space-y-3'>
              <h4 className='text-sm font-semibold'>Legal</h4>
              <ul className='space-y-1'>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-sm text-gray-400 hover:text-[#0078d4] transition-colors'
                    href='#'
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-8 border-t border-gray-800 pt-4 text-center'>
            <p className='text-xs text-gray-400'>
              &copy; {new Date().getFullYear()} Visual Studio Code. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// FeatureCard component
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className='flex flex-col items-center text-center space-y-3 p-4 bg-[#2e2e2e] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
    <div className='flex items-center justify-center'>{icon}</div>
    <h3 className='text-xl font-semibold'>{title}</h3>
    <p className='text-sm text-gray-400'>{description}</p>
  </div>
);

// TestimonialCard component
const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => (
  <div className='flex flex-col items-center text-center space-y-4 p-4 bg-[#2e2e2e] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
    <p className='text-lg font-medium text-gray-300 italic'>
      &quot;{quote}&quot;
    </p>
    <div className='space-y-1'>
      <h4 className='text-md font-semibold'>{author}</h4>
      <p className='text-sm text-gray-400'>{role}</p>
    </div>
  </div>
);
