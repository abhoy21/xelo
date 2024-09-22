import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTA() {
  return (
    <section className='w-full py-20 bg-gray-[#121212] relative'>
      <div className='container px-4 md:px-6 mx-auto relative z-10'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              Ready to Transform Your Coding Experience?
            </h2>
            <p className='mx-auto max-w-[600px] text-gray-400 md:text-xl'>
              Join millions of developers who trust Xelo for their daily coding
              tasks.
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
  );
}
