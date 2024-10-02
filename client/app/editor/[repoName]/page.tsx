"use client";

import BottomBarComponent from "@/app/_components/BottomBarComponent";
import BreadcrumbsComponent from "@/app/_components/BreadcrumbsComponent";
import CodeEditorComponent from "@/app/_components/CodeEditorComponent";
import FileTree from "@/app/_components/FileTreeComponent";
import TabBarComponent from "@/app/_components/TabBarComponent";
import TerminalComponent from "@/app/_components/terminalComponent";
import { useCallback, useEffect, useState } from "react";
import socket from "../../../socket/socket";

type FileStructure = {
  [key: string]: FileStructure;
};

const RepoEditorPage = () => {
  const [fileTree, setFileTree] = useState<Record<string, FileStructure>>({});
  const [selectedFile, setSelectedFile] = useState("");

  const getFileTree = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/files`,
      );
      const result = await response.json();

      setFileTree(result.tree);
    } catch (error) {
      console.error("Failed to fetch file tree:", error);
    }
  }, []);

  useEffect(() => {
    getFileTree();
  }, [getFileTree]);

  useEffect(() => {
    if (!socket) return;

    const handleRefresh = () => {
      getFileTree();
    };

    socket.on("file:refresh", handleRefresh);

    return () => {
      socket.off("file:refresh", handleRefresh);
    };
  }, [getFileTree]);
  console.log("Path of selected file", selectedFile);

  return (
    <div className='flex h-screen text-sm bg-[#1e1e1e] text-gray-300 font-mono'>
      <FileTree
        onSelect={(path) => {
          setSelectedFile(path);
        }}
        tree={fileTree}
      />
      <div className='flex-1 flex flex-col'>
        <div>
          <TabBarComponent
            onSelect={(path) => {
              setSelectedFile(path);
            }}
            selectedFile={selectedFile}
          />
        </div>
        <div className='bg-[#1e1e1e] px-4 py-2 border-b border-[#393939]'>
          <BreadcrumbsComponent tree={fileTree} selectedFile={selectedFile} />
        </div>
        <CodeEditorComponent selectedFile={selectedFile} socket={socket} />
      </div>

      <TerminalComponent />

      <BottomBarComponent selectedFile={selectedFile} />
    </div>
  );
};

export default RepoEditorPage;
