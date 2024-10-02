"use client";
import { Code, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthHandler from "./AuthHandler";
import GitHubSignIn from "./GithubSigninButton";

interface UserData {
  login: string;
  id: number;
  githubId: string;
  avatar_url: string;
  html_url: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("github_access_token");
    const storedGitHubId = localStorage.getItem("GitHubId");

    if (storedAccessToken && storedGitHubId) {
      setUserData({
        login: "Stored User",
        id: parseInt(storedGitHubId),
        githubId: storedGitHubId,
        avatar_url: "",
        html_url: "",
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("github_access_token");
    localStorage.removeItem("GitHubId");
    setUserData(null);
  };

  return (
    <>
      <AuthHandler />
      <header className='px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full z-50 bg-[#131313] bg-opacity-80 backdrop-blur-md'>
        <Link className='flex items-center justify-center' href='/'>
          <Code className='h-6 w-6 text-blue-400' />
          <span className='ml-2 text-lg font-bold'>Xelo: Cloud_IDE</span>
        </Link>
        <nav
          className={`ml-auto flex gap-6 ${
            isMenuOpen ? "flex" : "hidden"
          } md:flex`}
        >
          {["Features", "Docs", "Extensions", "Blog"].map((item) => (
            <Link
              key={item}
              className='text-sm font-medium hover:text-blue-400 transition-colors'
              href={"/"}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className='ml-auto flex items-center'>
          {userData ? (
            <>
              <span className='text-white mr-4'>
                Welcome, {userData.login}!
              </span>
              <button className='text-white' onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <GitHubSignIn />
          )}
        </div>
        <button
          className='ml-4 md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className='h-6 w-6' />
        </button>
      </header>
    </>
  );
}
