"use client";

import { DashboardHeader } from "./DashboardHeader";

import { useEffect, useState } from "react";
import { DashboardSearchBar } from "./DashboardSearch";
import { DashboardTopBar } from "./DashboardTopBar";
import { RepositoryList } from "./RepositoryList";

type Repository = {
  id: number;
  name: string;
  language: string;
  createdAt: string;
};

type UserRepositories = {
  userRepos: {
    id: number;
    repositories: Repository[];
  };
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState<UserRepositories | null>(
    null,
  );

  useEffect(() => {
    const fetchReposData = async () => {
      const githubId = localStorage.getItem("GitHubId");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/repos?githubId=${githubId}`,
        );

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchReposData();
  }, []);

  const filteredRepositories =
    repositories?.userRepos?.repositories.filter(
      (repo: Repository) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.language?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className='min-h-screen bg-[#131313] text-[#d4d4d4] font-sans'>
      <DashboardTopBar />
      <main className='container mx-auto py-8 px-4'>
        <DashboardHeader />
        <DashboardSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <RepositoryList repositories={filteredRepositories || []} />
      </main>
    </div>
  );
}
