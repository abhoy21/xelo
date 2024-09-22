import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

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

export default FeatureCard;
