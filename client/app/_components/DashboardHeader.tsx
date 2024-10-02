"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, PlusCircle } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoName.trim()) {
      setNameError("Repository name is required");
      return;
    }

    const githubId = localStorage.getItem("GitHubId");
    const access_token = localStorage.getItem("github_access_token");

    console.log("GitHub ID:", githubId);
    console.log("Access Token:", access_token);

    if (!githubId || !access_token) {
      console.error("GitHub ID or access token not found in localStorage");
      setNameError("GitHub ID or access token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create_repos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            githubId,
            access_token,
            repoName,
            repoDescription,
            isPrivate,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Repository Created", data);
    } catch (error) {
      console.error("Error creating repository:", error);
      setNameError("Failed to create repository");
    }

    setIsDialogOpen(false);
    setRepoName("");
    setRepoDescription("");
    setIsPrivate(false);
    setNameError("");
  };

  return (
    <div className='flex justify-between items-center mb-8'>
      <h2 className='text-3xl font-bold font-mono'>Your Repositories</h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='text-blue-500 hover:text-gray-100'>
            <Plus className='w-4 h-4 mr-2' />
            New Repository
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-[#1a1a1a] text-white border-none rounded-lg'>
          <DialogHeader>
            <DialogTitle>Create New Repository</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='repoName'>Repository Name *</Label>
              <Input
                id='repoName'
                value={repoName}
                onChange={(e) => {
                  setRepoName(e.target.value);
                  setNameError("");
                }}
                placeholder='Enter repository name'
              />
              {nameError && (
                <p className='text-sm text-red-500 mt-1'>{nameError}</p>
              )}
            </div>
            <div>
              <Label htmlFor='repoDescription'>
                Repository Description (Optional)
              </Label>
              <Textarea
                id='repoDescription'
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
                placeholder='Enter repository description'
              />
            </div>
            <div className='flex items-center'>
              <Label htmlFor='isPrivate' className='mr-2'>
                Private Repository:
              </Label>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  id='isPrivate'
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  className='sr-only peer'
                />
                <div className='w-11 h-6 bg-[#2e2e2e] rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 transition-all duration-200 ease-in-out'>
                  <span
                    className={`absolute left-0 w-6 h-6 bg-blue-500 rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                      isPrivate ? "translate-x-full bg-red-500" : ""
                    }`}
                  ></span>
                </div>
              </label>

              <span className='ml-2 text-sm'>
                {isPrivate ? "Private" : "Public"}
              </span>
            </div>
            <Button type='submit' className='w-full bg-[#0e0e0e]'>
              <PlusCircle className='w-4 h-4 mr-2' />
              Create Repository
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
