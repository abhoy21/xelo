import {
  ChevronDown,
  ChevronRight,
  File,
  FilePlus2,
  Folder,
  FolderPlus,
  Plus,
} from "lucide-react";
import React, { useState } from "react";

type FileStructure = {
  [key: string]: FileStructure;
};

type FileTreeProps = {
  tree: FileStructure;
  onSelect: (path: string) => void;
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
};

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  name,
  tree,
  onSelect,
  path,
  setCurrentPath,
  setCreatingType,
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

  return (
    <li className='py-1'>
      <div className='flex justify-between'>
        <div
          className='flex items-center cursor-pointer hover:bg-gray-700 p-1 rounded-md w-full'
          onClick={() => onSelect(path)}
        >
          {isFolder && (
            <span onClick={toggleOpen} className='mr-1'>
              {isOpen ? (
                <ChevronDown size={16} className='text-gray-400' />
              ) : (
                <ChevronRight size={16} className='text-gray-400' />
              )}
            </span>
          )}
          {isFolder ? (
            <Folder size={16} className='mr-2 text-blue-500' />
          ) : (
            <File size={16} className='mr-2 text-yellow-400' />
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

      {isFolder && isOpen && (
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
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileTree: React.FC<FileTreeProps> = ({ tree, onSelect }) => {
  const [newItemName, setNewItemName] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [creatingType, setCreatingType] = useState<"file" | "folder" | null>(
    null,
  );

  const handleCreate = async () => {
    if (!newItemName || !currentPath || !creatingType) return;

    const itemPath =
      currentPath === "root"
        ? `/app/user/${newItemName}`
        : `/app/user/${currentPath}/${newItemName}`;
    console.log("Creating:", { path: itemPath, type: creatingType });
    console.log("File Path:", itemPath);

    try {
      const response = await fetch(
        "http://localhost:9000/create_file_or_folder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: itemPath, type: creatingType }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.statusText}. Details: ${errorText}`);
      }

      console.log(`${creatingType} created successfully at ${itemPath}`);
      setNewItemName("");
      setCurrentPath("");
      setCreatingType(null);
    } catch (error) {
      console.error("Failed to create file or folder:", error);
    }
  };

  return (
    <div className='w-64 bg-[#252525] p-2 overflow-auto border-r border-[#393939]'>
      <div className='mb-2 font-bold flex justify-between items-center text-gray-400'>
        <span className='text-lg'>EXPLORER</span>
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
      <ul>
        {Object.entries(tree).map(([name, subTree]) => (
          <FileTreeNode
            key={name}
            name={name}
            tree={subTree}
            onSelect={onSelect}
            path={`/${name}`}
            setCurrentPath={setCurrentPath}
            setCreatingType={setCreatingType}
          />
        ))}
      </ul>
      {creatingType && (
        <div className='flex items-center mt-2'>
          <input
            type='text'
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={`Enter ${creatingType} name`}
            className='bg-gray-700 text-white px-1 py-0.5 text-sm w-full'
          />
          <button
            onClick={handleCreate}
            className='ml-1 p-1 hover:bg-gray-600 rounded'
          >
            <Plus size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileTree;
