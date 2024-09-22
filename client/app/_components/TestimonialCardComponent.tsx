import React from "react";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
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

export default TestimonialCard;
