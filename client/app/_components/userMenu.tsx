"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserType = {
  id: number;
  githubId: string;
  name: string;
  username: string;
  avatarUrl: string;
};

export function UserMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const githubId = localStorage.getItem("GitHubId");

      if (!githubId) {
        console.error("GitHub ID not found in local storage.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?githubId=${githubId}`,
        );
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("github_access_token");
    localStorage.removeItem("GitHubId");
    console.log("User signed out");
    setIsOpen(false);
    setUser(null);
    router.push("/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.svg?height=32&width=32"}
              alt={user?.username || "@unknown"}
            />
            <AvatarFallback>{user?.username.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#1a1a1a]'>
        <DialogHeader>
          <DialogTitle className='text-gray-500'>Profile</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col items-center space-y-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.svg?height=80&width=80"}
              alt={user?.username || "@unknown"}
            />
            <AvatarFallback>{user?.username.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <p className='text-lg font-semibold text-gray-200 font-mono'>
            {user?.name || "Guest"}
          </p>{" "}
          <Button onClick={handleSignOut} variant='destructive'>
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
