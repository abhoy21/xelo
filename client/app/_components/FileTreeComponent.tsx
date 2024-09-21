import React, { useState } from "react";
import FileCreateForm from "./FileCreateForm";
import FileSearchBar from "./FileSearchBar";
import FileTreeHeader from "./FileTreeHeader";
import FileTreeNode from "./FileTreeNode";

type FileStructure = {
  [key: string]: FileStructure;
};

type FileTreeProps = {
  tree: FileStructure;
  onSelect: (path: string) => void;
};

const FileTree: React.FC<FileTreeProps> = ({ tree, onSelect }) => {
  const [newItemName, setNewItemName] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [creatingType, setCreatingType] = useState<"file" | "folder" | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = async () => {
    if (!newItemName || !currentPath || !creatingType) return;

    const itemPath =
      currentPath === "root"
        ? `/app/user/${newItemName}`
        : `/app/user/${currentPath}/${newItemName}`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create_file_or_folder`,
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

      setNewItemName("");
      setCurrentPath("");
      setCreatingType(null);
    } catch (error) {
      console.error("Failed to create file or folder:", error);
    }
  };

  return (
    <div className='w-64 bg-[#1a1a1a] p-2 overflow-auto border-r border-[#393939] pr-6'>
      <FileTreeHeader
        setCreatingType={setCreatingType}
        setCurrentPath={setCurrentPath}
      />
      <FileSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FileCreateForm
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        creatingType={creatingType}
        handleCreate={handleCreate}
      />

      <ul>
        {Object.entries(tree).map(([name, subtree]) => (
          <FileTreeNode
            key={name}
            name={name}
            tree={subtree}
            onSelect={onSelect}
            path={name}
            setCurrentPath={setCurrentPath}
            setCreatingType={setCreatingType}
            searchTerm={searchTerm}
          />
        ))}
      </ul>
    </div>
  );
};

export default FileTree;
