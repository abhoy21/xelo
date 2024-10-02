// Import the GitHub icon
import { Github } from "lucide-react";
import React, { useState } from "react";

const GitHubSignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:9000/github";
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className=' text-white px-4 py-2 hover:scale-105 transition-all flex items-center gap-2'
    >
      {isLoading ? (
        "Signing in..."
      ) : (
        <>
          <span>Sign in with </span>
          <Github className='h-5 w-5' />
        </>
      )}
    </button>
  );
};

export default GitHubSignIn;
