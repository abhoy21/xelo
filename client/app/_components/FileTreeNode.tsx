import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FilePlus2,
  Folder,
  FolderPlus,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import ContextMenuComponent from "./ContextMenuComponent";

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
  const isFolder = typeof tree === "object" && tree !== null;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(path);
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

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
    setCurrentPath(path);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting file/folder: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setShowContextMenu(false);
    }
  };

  return (
    <li className='py-1' onContextMenu={handleRightClick}>
      <div className='flex justify-between'>
        <div
          className='flex items-center cursor-pointer hover:bg-[#2e2e2e] duration-300 ease-in-out p-1 rounded-md w-full'
          onClick={handleSelect}
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

      {showContextMenu && (
        <ContextMenuComponent
          x={menuPosition.x}
          y={menuPosition.y}
          onDelete={handleDelete}
          onClose={() => setShowContextMenu(false)}
        />
      )}

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
