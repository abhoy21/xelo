"use client";
import useIsFile from "@/hooks/useIsFile";
import Editor from "@monaco-editor/react";
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

  const { isFile } = useIsFile(selectedFile);
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
        `http://localhost:9000/files/content?path=${selectedFile}`,
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
          defaultLanguage='javascript'
          defaultValue={`// Welcome! Start coding here...\n\n// Write your code in this editor.`}
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
