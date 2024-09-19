"use client";
import useIsFile from "@/hooks/useIsFile";
import { Editor } from "@monaco-editor/react";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import NoEditorPreviewComponent from "./NoEditorPreviewComponent";

type CodeEditorProps = {
  selectedFile: string;
  socket: Socket | null;
};

const CodeEditorComponent: React.FC<CodeEditorProps> = ({
  selectedFile,
  socket,
}) => {
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");

  const { isFile, extension } = useIsFile(selectedFile);
  const isSaved = selectedFileContent === code;

  useEffect(() => {
    if (!isSaved && code && socket && isFile) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 3 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved, socket, isFile]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    if (isFile) {
      setCode(selectedFileContent);
    }
  }, [selectedFileContent, isFile]);

  const getFileContents = useCallback(async () => {
    if (!selectedFile || !isFile) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/content?path=${selectedFile}`,
      );
      const result = await response.json();
      setSelectedFileContent(result.content);
    } catch (error) {
      console.error("Failed to fetch file contents:", error);
    }
  }, [selectedFile, isFile]);

  useEffect(() => {
    if (isFile) getFileContents();
  }, [getFileContents, selectedFile, isFile]);

  return (
    <div className='flex-1 bg-[#1e1e1e] py-2 overflow-auto'>
      {isFile ? (
        <Editor
          height='100%'
          width='100%'
          language={
            extension?.toLowerCase() === "c++"
              ? "cpp"
              : extension?.toLowerCase()
          }
          defaultValue={`// Welcome to your code editor!\n\n// Start by writing or pasting your code here.\n// Explore the features and enjoy coding!\n\n// Tips:\n// 1. Use the sidebar to navigate between files.\n// 2. Save your work frequently.\n// 3. Customize your editor settings in the preferences.`}
          theme='vs-dark'
          value={code}
          onChange={(e) => {
            if (e !== undefined) {
              setCode(e);
            }
          }}
        />
      ) : (
        <NoEditorPreviewComponent />
      )}
    </div>
  );
};

export default CodeEditorComponent;
