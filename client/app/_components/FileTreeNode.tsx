import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FilePlus2,
  Folder,
  FolderPlus,
} from "lucide-react";
import React, { useCallback, useState } from "react";

type FileStructure = {
  [key: string]: FileStructure;
};

type FileTreeNodeProps = {
  name: string;
  tree: FileStructure;
  onSelect: (path: string) => void;
  path: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  setCreatingType: React.Dispatch<
    React.SetStateAction<"file" | "folder" | null>
  >;
  searchTerm: string;
};

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  name,
  tree,
  onSelect,
  path,
  setCurrentPath,
  setCreatingType,
  searchTerm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = tree !== null;

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCreateFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPath(path);
    setCreatingType("file");
  };

  const handleCreateFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPath(path);
    setCreatingType("folder");
  };

  const matchesSearch = useCallback(() => {
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [name, path, searchTerm]);

  const hasMatchingChildren = useCallback(() => {
    if (isFolder) {
      return Object.entries(tree).some(([childName, childTree]) => {
        const childPath = `${path}/${childName}`;
        return (
          childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          childPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof childTree === "object" && Object.keys(childTree).length > 0)
        );
      });
    }
    return false;
  }, [isFolder, tree, path, searchTerm]);

  if (searchTerm && !matchesSearch() && !hasMatchingChildren()) {
    return null;
  }

  return (
    <li className='py-1'>
      <div className='flex justify-between'>
        <div
          className='flex items-center cursor-pointer hover:bg-[#2e2e2e] duration-300 ease-in-out p-1 rounded-md w-full'
          onClick={() => onSelect(path)}
        >
          {isFolder && (
            <span onClick={toggleOpen} className='mr-1'>
              {isOpen || (searchTerm && hasMatchingChildren()) ? (
                <ChevronDown size={16} className='text-gray-400' />
              ) : (
                <ChevronRight size={16} className='text-gray-400' />
              )}
            </span>
          )}
          {isFolder ? (
            <Folder size={16} className='mr-2 text-blue-500' />
          ) : (
            <FileCode2 size={16} className='mr-2 ml-1.5 text-yellow-400' />
          )}
          <span>{name}</span>
        </div>

        {isFolder && (
          <div className='flex space-x-1 mt-1'>
            <button
              onClick={handleCreateFile}
              className='p-1 hover:bg-gray-600 rounded'
            >
              <FilePlus2 size={14} className='text-gray-400' />
            </button>
            <button
              onClick={handleCreateFolder}
              className='p-1 hover:bg-gray-600 rounded'
            >
              <FolderPlus size={14} className='text-gray-400' />
            </button>
          </div>
        )}
      </div>

      {isFolder && (isOpen || (searchTerm && hasMatchingChildren())) && (
        <ul className='pl-4'>
          {Object.entries(tree).map(([childName, childTree]) => (
            <FileTreeNode
              key={childName}
              name={childName}
              tree={childTree}
              onSelect={onSelect}
              path={`${path}/${childName}`}
              setCurrentPath={setCurrentPath}
              setCreatingType={setCreatingType}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTreeNode;
