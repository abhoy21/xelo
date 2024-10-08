const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const { getIO } = require("../utils/socketSetup");
const { exec } = require("child_process");
const path = require("path");

const prisma = new PrismaClient();

exports.getRepos = async (req, res) => {
  try {
    const { githubId } = req.query;

    if (!githubId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userRepos = await prisma.user.findUnique({
      where: { githubId: githubId },
      select: {
        id: true,
        repositories: {
          select: {
            id: true,
            name: true,
            language: true,
            createdAt: true,
          },
        },
      },
    });

    if (!userRepos) {
      return res.status(404).json({ error: "User Repositories not found" });
    }

    return res.status(200).json({ userRepos });
  } catch (error) {
    console.error("Error fetching User", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

exports.createRepo = async (req, res) => {
  try {
    const { githubId, access_token, repoName, repoDescription, isPrivate } =
      req.body;

    if (!githubId || !access_token || !repoName) {
      return res.status(400).json({
        error: "GitHub ID, access token, and repository name are required",
      });
    }

    console.log("Validating access token and API accessibility...");

    console.log("Attempting to create repository:", repoName);

    const response = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: repoName,
        description: repoDescription || "",
        private: isPrivate,
        auto_init: true,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    console.log("GitHub API response:", response.data);

    const repoUrl = response.data.html_url;

    const newRepo = await prisma.repository.create({
      data: {
        name: repoName,
        language: response.data.language || null,
        url: repoUrl,
        user: {
          connect: { githubId },
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Repository created successfully", repo: newRepo });
  } catch (error) {
    console.error("Error creating repository:", error);

    if (error.response) {
      switch (error.response.status) {
        case 404:
          return res.status(404).json({
            error: "User not found or invalid access token",
            details:
              error.response.data.message ||
              "The specified user could not be found.",
          });
        case 401:
          return res.status(401).json({
            error: "Unauthorized access - invalid token",
            details:
              error.response.data.message ||
              "The provided access token is invalid or has insufficient permissions.",
          });
        case 422:
          return res.status(422).json({
            error: "Validation failed",
            details: error.response.data.errors
              ? error.response.data.errors[0].message
              : "Check your input.",
          });
        default:
          return res.status(error.response.status).json({
            error:
              error.response.data.message ||
              "An error occurred while creating the repository.",
          });
      }
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

exports.deleteRepo = async (req, res) => {
  try {
    const { githubId, access_token, repoName } = req.body;

    if (!githubId || !access_token || !repoName) {
      return res.status(400).json({
        error: "GitHub ID, access token, and repository name are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        githubId: githubId,
      },
    });

    if (!user || !user.username) {
      return res.status(404).json({
        error: "User not found",
        details:
          "The specified GitHub ID does not correspond to a user in the database.",
      });
    }

    const githubUsername = user.username;

    console.log("Attempting to delete repository:", repoName);

    const githubDeleteResponse = await axios.delete(
      `https://api.github.com/repos/${githubUsername}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (githubDeleteResponse.status === 204) {
      console.log("Repository deleted from GitHub");

      const deletedRepo = await prisma.repository.delete({
        where: {
          name_userId: {
            name: repoName,
            userId: user.id,
          },
        },
      });

      return res.status(200).json({
        message: "Repository deleted successfully",
        repo: deletedRepo,
      });
    } else {
      return res.status(githubDeleteResponse.status).json({
        error: "Failed to delete repository from GitHub",
        details:
          githubDeleteResponse.data.message ||
          "An error occurred while attempting to delete the repository.",
      });
    }
  } catch (error) {
    console.error("Error deleting repository:", error);

    if (error.response) {
      switch (error.response.status) {
        case 404:
          return res.status(404).json({
            error: "Repository not found",
            details:
              error.response.data.message ||
              "The specified repository could not be found on GitHub.",
          });
        case 401:
          return res.status(401).json({
            error: "Unauthorized access - invalid token",
            details:
              error.response.data.message ||
              "The provided access token is invalid or has insufficient permissions.",
          });
        default:
          return res.status(error.response.status).json({
            error:
              error.response.data.message ||
              "An error occurred while deleting the repository.",
          });
      }
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

exports.cloneRepo = async (req, res) => {
  const { repoName, access_token } = req.body;

  console.log(`Cloning repository: ${repoName}`);

  try {
    const repository = await prisma.repository.findFirst({
      where: { name: repoName },
    });

    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const repoUrl = repository.url;

    // Get UNIQUE_USER_ID from environment variable
    const uniqueUserId = process.env.UNIQUE_USER_ID;
    if (!uniqueUserId) {
      return res.status(500).json({ message: "UNIQUE_USER_ID is not defined" });
    }

    // Construct the path for cloning inside the user's directory
    const appDir = process.env.APP_DIR;
    const repoPath = path.join(appDir, repoName);

    // Check if the repository already exists
    try {
      await fs.access(repoPath);
      return res.status(200).json({
        message: `Repository already cloned: ${repoName}`,
        repoPath,
      });
    } catch (err) {
      // Repository does not exist; proceed to clone it
      await executeGitCommand(`git clone ${repoUrl} ${repoPath}`, appDir);
      return res.status(200).json({
        message: `Repository cloned successfully: ${repoName}`,
        repoPath,
      });
    }
  } catch (error) {
    console.error("Error cloning repository:", error);
    return res.status(500).json({ message: "Error cloning repository" });
  }
};

exports.runGitSaveCommands = async (req, res) => {
  console.log("Request body for save", req.body);

  const { repoName, accessToken } = req.body;

  if (!repoName || !accessToken) {
    return res
      .status(400)
      .json({ error: "Repository name and access token are required." });
  }
  const uniqueUserId = process.env.UNIQUE_USER_ID; // Updated line
  if (!uniqueUserId) {
    return res.status(500).json({ message: "UNIQUE_USER_ID is not defined" });
  }

  // Construct the path for cloning inside the user's directory
  const appDir = process.env.APP_DIR; // Should be '/app/uniqueuserid'
  const repoPath = path.join(appDir, repoName); // Use uniqueUserId here if necessary

  try {
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    const { login, email } = userResponse.data;

    await setGitConfig("user.name", login, repoPath);
    await setGitConfig("user.email", email || "you@example.com", repoPath);

    await executeGitCommand("git add .", repoPath);
    await executeGitCommand('git commit -m "Automated commit"', repoPath);
    await executeGitCommand("git push origin main", repoPath);

    return res.status(200).json({
      message: "Git commands executed and changes pushed successfully.",
    });
  } catch (error) {
    console.error("Error during Git operations:", error);
    return res.status(500).json({ error: error.message });
  }
};

const setGitConfig = (key, value, cwd) => {
  return new Promise((resolve, reject) => {
    exec(
      `git config --global ${key} "${value}"`,
      { cwd, shell: "/bin/bash" },
      (error) => {
        if (error) {
          console.error(`Error setting git config ${key}: ${error.message}`);
          return reject(`Error setting git config ${key}: ${error.message}`);
        }
        resolve();
      },
    );
  });
};

const executeGitCommand = (command, cwd) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command "${command}": ${stderr}`);
        return reject(`Error executing command "${command}": ${stderr}`);
      }
      console.log(`Output of "${command}": ${stdout}`);
      resolve(stdout);
    });
  });
};
