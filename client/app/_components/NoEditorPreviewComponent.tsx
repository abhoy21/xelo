import { Coffee, FileText, Folder, Github } from "lucide-react";

const NoEditorPreviewComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center px-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Xelo: Cloud IDE</h1>
      <p className='text-xl mb-8'>
        Get started by opening a file or creating a new one.
      </p>
      <div className='grid grid-cols-3 gap-8 text-center'>
        <div className='flex flex-col items-center'>
          <FileText className='w-12 h-12 mb-2 text-blue-500' />
          <h2 className='text-lg font-semibold mb-1'>New File</h2>
          <p className='text-sm'>Create a new file to start coding</p>
        </div>
        <div className='flex flex-col items-center'>
          <Folder className='w-12 h-12 mb-2 text-yellow-500' />
          <h2 className='text-lg font-semibold mb-1'>Open Folder</h2>
          <p className='text-sm'>Open a project folder to explore</p>
        </div>
        <div className='flex flex-col items-center'>
          <Github className='w-12 h-12 mb-2 text-purple-500' />
          <h2 className='text-lg font-semibold mb-1'>Clone Git Repository</h2>
          <p className='text-sm'>Clone a repository to get started</p>
        </div>
      </div>
      <div className='mt-12 flex items-center'>
        <Coffee className='w-5 h-5 mr-2 text-orange-400' />
        <span>
          Pro Tip: Use the terminal below to run commands and interact with your
          project.
        </span>
      </div>
    </div>
  );
};

export default NoEditorPreviewComponent;
