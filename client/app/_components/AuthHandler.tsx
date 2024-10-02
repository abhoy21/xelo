"use client";

import { base64Encode } from "@/hooks/encoder";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthHandler: React.FC = () => {
  const [userData, setUserData] = useState<{
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  } | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const handleUserData = () => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const githubId = urlParams.get("githubId");
      const accessToken = urlParams.get("access_token");

      if (githubId && accessToken) {
        localStorage.setItem("GitHubId", githubId);
        localStorage.setItem("github_access_token", accessToken);

        setUserData({
          login: "Stored User",
          id: parseInt(githubId),
          avatar_url: "",
          html_url: "",
        });

        const encodedId = base64Encode(githubId);
        console.log(encodedId);

        push(`/dashboard/${encodedId}`);

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      } else {
        const storedGitHubId = localStorage.getItem("GitHubId");
        const storedAccessToken = localStorage.getItem("github_access_token");

        if (storedGitHubId && storedAccessToken) {
          setUserData({
            login: "Stored User",
            id: parseInt(storedGitHubId),
            avatar_url: "",
            html_url: "",
          });
        }
      }
    };

    handleUserData();
  }, [push]);

  useEffect(() => {
    if (userData) {
      const encodedId = base64Encode(userData.id.toString());
      push(`/dashboard/${encodedId}`);
    }
  }, [userData, push]);

  return null;
};

export default AuthHandler;
