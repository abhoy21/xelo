import { FilePlus2, FolderPlus } from "lucide-react";

type FileTreeHeaderProps = {
  setCreatingType: React.Dispatch<
    React.SetStateAction<"file" | "folder" | null>
  >;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
};

const FileTreeHeader: React.FC<FileTreeHeaderProps> = ({
  setCreatingType,
  setCurrentPath,
}) => {
  return (
    <div className='mb-2 font-bold flex justify-between items-center text-gray-400 border-b border-[#393939]'>
      <span className='text-lg '>FILE EXPLORER</span>
      <div className='flex space-x-1'>
        <button
          onClick={() => {
            setCreatingType("file");
            setCurrentPath("root");
          }}
          className='p-1 hover:bg-gray-600 rounded'
        >
          <FilePlus2 size={14} />
        </button>
        <button
          onClick={() => {
            setCreatingType("folder");
            setCurrentPath("root");
          }}
          className='p-1 hover:bg-gray-600 rounded'
        >
          <FolderPlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default FileTreeHeader;
