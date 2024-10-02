"use client";

import { base64Encode } from "@/hooks/encoder";
import {
  ChartNoAxesGantt,
  FolderGit2,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

type Repository = {
  id: number;
  name: string;
  language: string;
  createdAt: string;
};

type RepositoryCardProps = {
  repo: Repository;
};

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const [isCloning, setIsCloning] = useState(false);
  const [cloneMessage, setCloneMessage] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const moreIconRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const encodedId = base64Encode(repo.name);
  const formattedDate = new Date(repo.createdAt).toLocaleDateString("en-GB");

  const cloneRepository = async () => {
    try {
      setIsCloning(true);
      setCloneMessage(null);

      const accessToken = localStorage.getItem("github_access_token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getRepoData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repoName: repo.name,
            access_token: accessToken,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("project_name", repo.name);

        setCloneMessage(data.message);
        router.push(`/editor/${encodedId}`);
      } else {
        setCloneMessage(data.error || "Failed to clone the repository.");
      }
    } catch (error) {
      console.error("Error cloning repository:", error);
      setCloneMessage("An error occurred while cloning.");
    } finally {
      setIsCloning(false);
    }
  };

  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowContextMenu((prev) => !prev);
  };

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  };

  const handleDeleteRepository = async () => {
    try {
      const githubId = localStorage.getItem("GitHubId");
      const access_token = localStorage.getItem("github_access_token");

      if (!githubId || !access_token) {
        console.error("GitHub ID or access token is missing.");
        setCloneMessage("GitHub ID or access token is missing.");
        return;
      }

      console.log(`Deleting repository: ${repo.name}`);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteRepo`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            githubId,
            access_token,
            repoName: repo.name,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setCloneMessage(data.message);
      } else {
        setCloneMessage(data.error || "Failed to delete the repository.");
      }
    } catch (error) {
      console.error("Error deleting repository:", error);
      setCloneMessage("An error occurred while deleting.");
    } finally {
      handleCloseContextMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node) &&
        moreIconRef.current &&
        !moreIconRef.current.contains(event.target as Node)
      ) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={cardRef} className='relative overflow-hidden'>
      <div className='bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg p-6 hover:border-blue-500 transition-colors'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center'>
            <FolderGit2 className='w-5 h-5 mr-2 text-blue-500' />
            <h3 className='text-lg font-semibold'>{repo.name}</h3>
          </div>
          <div className='relative'>
            <div ref={moreIconRef}>
              {showContextMenu ? (
                <X
                  className='w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors'
                  onClick={handleMoreClick}
                />
              ) : (
                <MoreHorizontal
                  className='w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors'
                  onClick={handleMoreClick}
                />
              )}
            </div>
            {showContextMenu && (
              <div
                ref={contextMenuRef}
                className='absolute z-[75] bg-[#1a1a1a] border border-blue-600 rounded-md shadow-lg right-8 -translate-y-12 mt-1'
                style={{ width: "200px" }}
              >
                <button
                  onClick={cloneRepository}
                  className='flex items-center gap-2 px-4 py-4 text-center w-full text-gray-200 hover:bg-[#1f1f1f] border-b border-gray-800 rounded-t-md'
                >
                  <ChartNoAxesGantt className='h-7 w-7 text-blue-500' />
                  <span>Open Project</span>
                </button>
                <button
                  onClick={handleDeleteRepository}
                  className='flex items-center gap-2 px-4 py-4 text-center w-full text-gray-200 hover:bg-[#1f1f1f] rounded-b-md'
                >
                  <Trash2 className='h-7 w-7 text-red-500' />
                  <span>Delete Repository</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <p className='text-sm text-gray-400 mb-2'>{formattedDate}</p>
        <div className='flex items-center text-sm text-gray-400'>
          {repo.language}
        </div>
      </div>

      {cloneMessage && (
        <div className='mt-2 text-sm text-center'>
          <p
            className={
              cloneMessage.includes("Failed") || cloneMessage.includes("error")
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {cloneMessage}
          </p>
        </div>
      )}

      {isCloning && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
          <Loader />
        </div>
      )}
    </div>
  );
}
