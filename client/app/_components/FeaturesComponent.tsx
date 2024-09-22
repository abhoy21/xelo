import {
  ChevronRight,
  Code,
  GitBranch,
  Settings,
  Star,
  Terminal,
} from "lucide-react";
import FeatureCard from "./FeatureCardComponent";

const featuresData = [
  {
    icon: <Code className='h-10 w-10 text-blue-400' />,
    title: "IntelliSense",
    description:
      "Go beyond syntax highlighting and autocomplete with IntelliSense, which provides smart completions based on variable types, function definitions, and imported modules.",
  },
  {
    icon: <Terminal className='h-10 w-10 text-blue-400' />,
    title: "Integrated Terminal",
    description:
      "Use your favorite command-line tools without leaving the editor. Run build tasks, npm scripts, and more with an integrated terminal that supports multiple instances.",
  },
  {
    icon: <GitBranch className='h-10 w-10 text-blue-400' />,
    title: "Built-in Git",
    description:
      "Review diffs, stage files, and make commits right from the editor. Push and pull from any hosted Git service with built-in source control management.",
  },
  {
    icon: <Settings className='h-10 w-10 text-blue-400' />,
    title: "Extensibility",
    description:
      "Customize every feature to your liking and install any number of third-party extensions. Xelo's growing community shares their secret sauce to make it easier to get started.",
  },
  {
    icon: <Star className='h-10 w-10 text-blue-400' />,
    title: "Remote Development",
    description:
      "Work in remote environments like containers, VMs, or WSL with full access to your tools and extensions, just like you were working locally.",
  },
  {
    icon: <ChevronRight className='h-10 w-10 text-blue-400' />,
    title: "And much more...",
    description:
      "Debugging, multi-root workspaces, live share, and hundreds of other features to discover. Xelo is updated monthly with new features and bug fixes.",
  },
];

export default function Features() {
  return (
    <section className='w-full py-20 bg-gray-[#121212] relative'>
      <div className='container px-4 md:px-6 mx-auto relative z-10'>
        <h2 className='text-3xl font-bold text-center mb-12'>
          Powerful Features for Modern Development
        </h2>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
      <div className='absolute inset-0 bg-pattern opacity-5'></div>
    </section>
  );
}
