const fs = require("fs").promises;
const path = require("node:path");
const { getIO } = require("../utils/socketSetup");

// Function to generate a file tree
const generateFileTree = async (directory) => {
  const tree = {};

  async function buildTree(currentDirectory, currentTree) {
    const files = await fs.readdir(currentDirectory);

    await Promise.all(
      files.map(async (file) => {
        if (file === ".git") return;

        const filePath = path.join(currentDirectory, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
          currentTree[file] = {};
          await buildTree(filePath, currentTree[file]);
        } else {
          currentTree[file] = null;
        }
      }),
    );
  }

  await buildTree(directory, tree);
  return tree;
};

// Get files endpoint
exports.getFiles = async (req, res) => {
  try {
    const appDir = process.env.APP_DIR; // Use APP_DIR for dynamic path
    const fileTree = await generateFileTree(appDir); // Pass the dynamic directory
    return res.json({ tree: fileTree });
  } catch (error) {
    console.error("Error retrieving files:", error);
    return res.status(500).json({ error: "Failed to retrieve files." });
  }
};

// Get file content endpoint
exports.getFileContent = async (req, res) => {
  const requestedPath = req.query.path;
  console.log(`Requested Path: ${requestedPath}`);

  const appDir = process.env.APP_DIR; // Use APP_DIR for dynamic path
  const safePath = path.join(appDir, requestedPath); // Use requestedPath directly

  console.log(`Safe Path: ${safePath}`);

  if (!safePath.startsWith(appDir + "/")) {
    console.log(`Invalid path requested: ${safePath}`);
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    await fs.access(safePath);
    console.log(`File exists: ${safePath}`);

    const content = await fs.readFile(safePath, "utf-8");

    return res.json({ content });
  } catch (error) {
    console.error(`Error reading file ${requestedPath}:`, error);

    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "File not found." });
    } else {
      return res.status(500).json({ error: "Failed to read file." });
    }
  }
};

// Create file or folder endpoint
exports.createFileOrFolder = async (req, res) => {
  const { path: itemPath, type: creatingType } = req.body;

  const appDir = process.env.APP_DIR; // Use APP_DIR for dynamic path
  const safePath = path.join(appDir, itemPath); // Construct safe path

  if (!safePath.startsWith(appDir + "/")) {
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    const parentDir = path.dirname(safePath);
    await fs.mkdir(parentDir, { recursive: true });

    if (creatingType === "file") {
      await fs.writeFile(safePath, "");
      console.log(`File created: ${safePath}`);
    } else if (creatingType === "folder") {
      await fs.mkdir(safePath, { recursive: true });
      console.log(`Folder created: ${safePath}`);
    } else {
      return res.status(400).json({ error: "Invalid type specified." });
    }

    const io = getIO();
    io.emit("file:refresh");
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error creating file or folder:", error);

    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "Directory not found." });
    } else if (error.code === "EACCES") {
      return res.status(403).json({ error: "Permission denied." });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to create file or folder." });
    }
  }
};

// Delete item endpoint
exports.deleteItem = async (req, res) => {
  const { path: itemPath } = req.body;

  const appDir = process.env.APP_DIR; // Use APP_DIR for dynamic path
  const safePath = path.join(appDir, itemPath); // Construct safe path

  if (!safePath.startsWith(appDir + "/")) {
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    const stat = await fs.stat(safePath);

    if (stat.isDirectory()) {
      await fs.rm(safePath, { recursive: true, force: true });
      console.log(`Directory deleted: ${safePath}`);
    } else {
      await fs.unlink(safePath);
      console.log(`File deleted: ${safePath}`);
    }

    const io = getIO();
    io.emit("file:refresh");
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting file or folder:", error);

    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "File or folder not found." });
    } else if (error.code === "EACCES") {
      return res.status(403).json({ error: "Permission denied." });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to delete file or folder." });
    }
  }
};
