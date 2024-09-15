"use client";

import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import FileTree from "../_components/FileTreeComponent";
import TerminalComponent from "../_components/terminalComponent";

type FileStructure = {
  [key: string]: FileStructure;
};

const HomePage = () => {
  const [fileTree, setFileTree] = useState<Record<string, FileStructure>>({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const isSaved = selectedFileContent === code;

  useEffect(() => {
    const newSocket = io("http://localhost:9000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isSaved && code && socket) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved, socket]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  const getFileTree = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:9000/files");
      const result = await response.json();
      console.log(result.tree);
      setFileTree(result.tree);
    } catch (error) {
      console.error("Failed to fetch file tree:", error);
    }
  }, []);

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    try {
      const response = await fetch(
        `http://localhost:9000/files/content?path=${selectedFile}`,
      );
      const result = await response.json();
      setSelectedFileContent(result.content);
    } catch (error) {
      console.error("Failed to fetch file contents:", error);
    }
  }, [selectedFile]);

  useEffect(() => {
    getFileTree();
  }, [getFileTree]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

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
          setSelectedFileContent("");
          setSelectedFile(path);
        }}
        tree={fileTree}
      />
      <TerminalComponent />
    </div>
  );
};

export default HomePage;
