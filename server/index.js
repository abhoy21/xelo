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
    methods: ["GET", "POST"],
  },
});

io.attach(server);

chokidar.watch("/app/user").on("all", (event, path) => {
  io.emit("file:refresh", path);
});

ptyProcess.onData((data) => {
  console.log(`Terminal.emit: ${data}`);
  io.emit("terminal:data", data);
});

io.on("connection", (socket) => {
  console.log((`Socket Connected`, socket.id));

  socket.on("terminal:write", (data) => {
    console.log(`Recieved Command: ${data}`);
    ptyProcess.write(data);
  });
});

app.get("/files", async (req, res) => {
  const fileTree = await generateFileTree("/app/user");
  return res.json({ tree: fileTree });
});

app.post("/create_file_or_folder", async (req, res) => {
  console.log("Request Body:", req.body);
  const { path: itemPath, type } = req.body;
  try {
    if (type === "file") {
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

server.listen(9000, () => console.log("Docker server listening on port 9000"));

async function generateFileTree(directory) {
  const tree = {};

  async function buildTree(currentDirectory, currentTree) {
    const files = await fs.readdir(currentDirectory);

    for (const file of files) {
      const filePath = path.join(currentDirectory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        currentTree[file] = {};
        await buildTree(filePath, currentTree[file]);
      } else {
        currentTree[file] = null;
      }
    }
  }

  await buildTree(directory, tree);
  return tree;
}
