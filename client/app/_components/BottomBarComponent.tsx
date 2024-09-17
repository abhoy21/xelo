import useIsFile from "@/hooks/useIsFile";
import { Check, Code, GitBranch, Rocket, Server } from "lucide-react";

type BottomBarProps = {
  selectedFile: string;
};

const BottomBarComponent: React.FC<BottomBarProps> = ({ selectedFile }) => {
  const { extension } = useIsFile(selectedFile);

  return (
    <div className='absolute bottom-0 left-0 right-0 bg-[#1e1e1e] border border-[#393939] text-gray-300 px-2 py-0.5 flex justify-between items-center text-xs'>
      <div className='flex items-center space-x-3'>
        <div className='flex items-center space-x-1 bg-[#16825d] px-2 py-0.5 rounded-sm'>
          <GitBranch className='w-3 h-3' />
          <span>main</span>
        </div>
        <div className='flex items-center space-x-1'>
          <Rocket className='w-3 h-3 text-blue-500' />
          <span>Xelo_V1</span>
        </div>
      </div>
      <div className='flex items-center space-x-3'>
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
        </div>
      </div>
    </div>
  );
};

export default BottomBarComponent;
