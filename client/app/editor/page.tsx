"use client";

import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import BottomBarComponent from "../_components/BottomBarComponent";
import BreadcrumbsComponent from "../_components/BreadcrumbsComponent";
import CodeEditorComponent from "../_components/CodeEditorComponent";
import FileTree from "../_components/FileTreeComponent";
import TabBarComponent from "../_components/TabBarComponent";
import TerminalComponent from "../_components/terminalComponent";

type FileStructure = {
  [key: string]: FileStructure;
};

const EditorPage = () => {
  const [fileTree, setFileTree] = useState<Record<string, FileStructure>>({});
  const [selectedFile, setSelectedFile] = useState("");

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
    if (socket) {
      socket.on("file:refresh", getFileTree);
      return () => {
        socket.off("file:refresh", getFileTree);
      };
    }
  }, [socket, getFileTree]);

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

export default EditorPage;
