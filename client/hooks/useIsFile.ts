import { useMemo } from "react";

const useIsFile = (path: string) => {
  return useMemo(() => {
    const fileExtensionsMap: { [key: string]: string } = {
      // JavaScript
      ".js": "JavaScript",
      ".jsx": "JavaScript",
      // TypeScript
      ".ts": "TypeScript",
      ".tsx": "TypeScript",
      // JSON
      ".json": "JSON",
      // HTML
      ".html": "HTML",
      // CSS
      ".css": "CSS",
      // Markdown
      ".md": "Markdown",
      // Python
      ".py": "Python",
      // YAML
      ".yaml": "YAML",
      ".yml": "YAML",
      // Environment files
      ".env": "Environment",
      // TOML
      ".toml": "TOML",
      // C / C++
      ".c": "C",
      ".cpp": "C++",
      ".h": "Header",

      ".rmd": "R Markdown",
      // Shell scripts
      ".sh": "Shell",
      // SQL
      ".sql": "SQL",
      // Docker
      ".dockerfile": "Dockerfile",
      // Gitignore
      ".gitignore": "Gitignore",
  
 
    };

    const matchingExtension = Object.keys(fileExtensionsMap).find((extension) =>
      path.endsWith(extension)
    );

    return {
      isFile: !!matchingExtension,
      extension: matchingExtension ? fileExtensionsMap[matchingExtension] : undefined,
    };
  }, [path]);
};

export default useIsFile;
