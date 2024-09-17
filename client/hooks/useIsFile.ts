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
      // PHP
      ".php": "PHP",
      // Go
      ".go": "Go",
      // Rust
      ".rs": "Rust",
      // C / C++
      ".c": "C",
      ".cpp": "C++",
      ".h": "Header",
      // Java
      ".java": "Java",
      // Kotlin
      ".kt": "Kotlin",
      ".kts": "Kotlin Script",
      // Ruby
      ".rb": "Ruby",
      // Swift
      ".swift": "Swift",
      // R
      ".r": "R",
      ".rmd": "R Markdown",
      // Shell scripts
      ".sh": "Shell",
      // SQL
      ".sql": "SQL",
      // Docker
      ".dockerfile": "Dockerfile",
      // Gitignore
      ".gitignore": "Gitignore",
      // LaTeX
      ".tex": "LaTeX",
      // Haskell
      ".hs": "Haskell",
      // Scala
      ".scala": "Scala",
      // Elm
      ".elm": "Elm",
      // Julia
      ".jl": "Julia",
      // F#
      ".fs": "F#",
      ".fsi": "F# Interactive",
      // Groovy
      ".groovy": "Groovy",
      // Clojure
      ".clj": "Clojure",
      // PowerShell
      ".ps1": "PowerShell",
    };

    const matchingExtension = Object.keys(fileExtensionsMap).find((extension) =>
      path.endsWith(extension)
    );

    return {
      isFile: !!matchingExtension,
      extension: matchingExtension ? fileExtensionsMap[matchingExtension] : null,
    };
  }, [path]);
};

export default useIsFile;
