const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server: SocketServer } = require("socket.io");
const pty = require("node-pty");
const fs = require("fs/promises");
const path = require("path");
const chokidar = require("chokidar");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const ptyProcess = pty.spawn("bash", [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.INIT_CWD,
  env: process.env,
});

const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

// io.attach(server);

let refreshTimeout;
const debounceRefresh = (path) => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    io.emit("file:refresh", path);
  }, 300);
};

chokidar.watch("/app/user").on("all", (event, path) => {
  debounceRefresh(path);
});

ptyProcess.onData((data) => {
  io.emit("terminal:data", data);
});

io.on("connection", (socket) => {
  socket.on("file:change", async ({ path, content }) => {
    await fs.writeFile(`/app/user${path}`, content);
  });

  socket.on("terminal:write", (data) => {
    ptyProcess.write(data);
  });
});

app.get("/files", async (req, res) => {
  const fileTree = await generateFileTree("/app/user");
  return res.json({ tree: fileTree });
});

// app.get("/files/content", async (req, res) => {
//   const path = req.query.path;
//   const content = await fs.readFile(`/app/user${path}`, "utf-8");
//   return res.json({ content });
// });

const cache = new Map();
const MAX_CACHE_SIZE = 100 * 1024 * 1024; // 100 MB max cache size
let currentCacheSize = 0;

function setCacheWithLimit(key, value) {
  const valueSize = Buffer.byteLength(value, "utf8");
  if (valueSize > MAX_CACHE_SIZE) {
    console.log(`File too large to cache: ${key} (${valueSize} bytes)`);
    return false;
  }

  while (currentCacheSize + valueSize > MAX_CACHE_SIZE && cache.size > 0) {
    const oldestKey = cache.keys().next().value;
    const oldestValue = cache.get(oldestKey);
    currentCacheSize -= Buffer.byteLength(oldestValue, "utf8");
    cache.delete(oldestKey);
    console.log(`Removed from cache due to size limit: ${oldestKey}`);
  }

  cache[key] = value;
  currentCacheSize += valueSize;
  console.log(`Added to cache: ${key} (${valueSize} bytes)`);
  return true;
}

app.get("/files/content", async (req, res) => {
  const requestedPath = req.query.path;
  console.log(`Requested Path: ${requestedPath}`);

  const safePath = path.join("/app/user", requestedPath);
  console.log(`Safe Path: ${safePath}`);

  if (!safePath.startsWith("/app/user/")) {
    console.log(`Invalid path requested: ${safePath}`);
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    await fs.access(safePath);
    console.log(`File exists: ${safePath}`);

    if (cache.has(safePath)) {
      const content = cache.get(safePath);
      console.log(
        `Serving from cache: ${safePath} (length: ${content.length})`,
      );
      return res.json({ content });
    }

    const content = await fs.readFile(safePath, "utf-8");
    console.log(
      `File read successfully: ${safePath} (length: ${content.length})`,
    );

    const cached = setCacheWithLimit(safePath, content);
    if (cached) {
      console.log(`File cached successfully: ${safePath}`);
    } else {
      console.log(`File not cached (too large or cache full): ${safePath}`);
    }

    return res.json({ content });
  } catch (error) {
    console.error(`Error reading file ${requestedPath}:`, error);

    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "File not found." });
    } else {
      return res.status(500).json({ error: "Failed to read file." });
    }
  }
});

// Add a new endpoint to check cache status
app.get("/cache-status", (req, res) => {
  const cacheEntries = Array.from(cache.entries()).map(([key, value]) => ({
    key,
    contentLength: value.length,
  }));
  res.json({
    cacheSize: cache.size,
    currentCacheSize,
    maxCacheSize: MAX_CACHE_SIZE,
    cacheEntries,
  });
});

app.post("/create_file_or_folder", async (req, res) => {
  const { path: itemPath, type: creatingType } = req.body;
  try {
    if (creatingType === "file") {
      await fs.writeFile(itemPath, "");
    } else {
      await fs.mkdir(itemPath, { recursive: true });
    }

    io.emit("file:refresh");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error creating file or folder:", error);
    res.status(500).json({ error: "Failed to create file or folder" });
  }
});

app.delete("/delete", async (req, res) => {
  const { path: itemPath } = req.body;

  const safePath = path.join("/app/user", itemPath);

  if (!safePath.startsWith("/app/user")) {
    return res.status(400).json({ error: "Invalid file path." });
  }

  try {
    const stat = await fs.stat(safePath);

    if (stat.isDirectory()) {
      // Use fs.rm to remove directories recursively
      await fs.rm(safePath, { recursive: true, force: true });
    } else {
      // Use fs.unlink to remove files
      await fs.unlink(safePath);
    }

    io.emit("file:refresh");
    res.sendStatus(204); // No Content
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
});

server.listen(9000, () => console.log("Docker server listening on port 9000"));

// async function generateFileTree(directory) {
//   const tree = {};

//   async function buildTree(currentDirectory, currentTree) {
//     const files = await fs.readdir(currentDirectory);

//     for (const file of files) {
//       const filePath = path.join(currentDirectory, file);
//       const stat = await fs.stat(filePath);

//       if (stat.isDirectory()) {
//         currentTree[file] = {};
//         await buildTree(filePath, currentTree[file]);
//       } else {
//         currentTree[file] = null;
//       }
//     }
//   }

//   await buildTree(directory, tree);
//   return tree;
// }

async function generateFileTree(directory) {
  const tree = {};

  async function buildTree(currentDirectory, currentTree) {
    const files = await fs.readdir(currentDirectory);

    await Promise.all(
      files.map(async (file) => {
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
}
