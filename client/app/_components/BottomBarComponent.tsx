import useIsFile from "@/hooks/useIsFile";
import { Check, Code, GitBranch, Info, Rocket, Server } from "lucide-react";
import SaveButton from "./SaveButton";

type BottomBarProps = {
  selectedFile: string;
};

const BottomBarComponent: React.FC<BottomBarProps> = ({ selectedFile }) => {
  const { extension } = useIsFile(selectedFile);

  return (
    <div className='absolute bottom-0 left-0 right-0 bg-[#1a1a1a] border border-[#393939] text-gray-300 pr-2 py-0.5 flex justify-between items-center text-xs'>
      <div className='flex items-center space-x-3'>
        <div className='ml-auto flex items-center text-sky-500 border border-sky-500 p-1 px-2 rounded-md bg-blue-500 bg-opacity-10 backdrop-blur-lg'>
          <Info size={16} className='mr-1' />
          <span>Install necessary dependencies if required!</span>
        </div>

        <div className='flex items-center space-x-1'>
          <Rocket className='w-3 h-3 text-blue-500' />
          <span>Xelo_V1</span>
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <SaveButton />
        <div className='flex items-center space-x-1'>
          <Server className='w-3 h-3' />
          <span className='tracking-wide' style={{ letterSpacing: "0.1em" }}>
            {selectedFile}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <span>{extension}</span>
          <span>UTF-8</span>
          <span>LF</span>
          <Check className='w-3 h-3' />
          <Code className='w-3 h-3 text-blue-500' />
          <div className='flex items-center space-x-1 bg-[#3b82f6] px-2 py-0.5 rounded-sm'>
            <GitBranch className='w-3 h-3' />
            <span>main</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBarComponent;
