import TestimonialCard from "./TestimonialCardComponent";

const testimonialsData = [
  {
    quote:
      "Xelo has revolutionized the way I code. Its powerful features and extensibility make it my go-to editor for all projects.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
  },
  {
    quote:
      "The integrated terminal and Git support in Xelo have significantly improved my workflow. It's an indispensable tool in my development arsenal.",
    author: "Michael Chen",
    role: "Full Stack Engineer",
  },
  {
    quote:
      "Xelo's IntelliSense is unparalleled. It's like having a coding assistant that understands your project's context.",
    author: "Emily Rodriguez",
    role: "Software Architect",
  },
];

export default function Testimonials() {
  return (
    <section className='w-full bg-texture py-20 bg-gray-[#1a1a1a] relative'>
      <div className='container px-4 md:px-6 mx-auto relative z-10'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Loved by Developers Worldwide
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
      <div className='absolute inset-0 bg-pattern opacity-5'></div>
    </section>
  );
}
