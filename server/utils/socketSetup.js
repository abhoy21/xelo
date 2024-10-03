const { Server: SocketServer } = require("socket.io");
const pty = require("node-pty");
const fs = require("fs").promises;
const chokidar = require("chokidar");

let io;
let ptyProcess;
let refreshTimeout = null;

exports.setupSocketIO = (server) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "DELETE"],
    },
  });

  ptyProcess = pty.spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 60,
    cwd: process.env.INIT_CWD,
    env: process.env,
  });

  // Handle data from the terminal
  ptyProcess.onData((data) => {
    io.emit("terminal:data", data);

    // Emit refresh event if a file is created or modified
    if (data.includes("touch") || data.includes("mkdir")) {
      io.emit("file:refresh");
    }
  });

  // Set up socket connection handling
  io.on("connection", (socket) => {
    console.log(`Socket connected`, socket.id);

    socket.emit("file:refresh");

    socket.on("file:change", async ({ path, content }) => {
      const safePath = `/app/user/${path}`;
      console.log(`Attempting to save file at: ${safePath}`); // Log before writing
      try {
        await fs.writeFile(safePath, content);
        console.log(`File saved: ${safePath}`);
        io.emit("file:refresh");
      } catch (error) {
        console.error(`Error saving file ${safePath}:`, error);
      }
    });

    socket.on("terminal:write", (data) => {
      ptyProcess.write(data);
    });
  });

  // Set up file watching with chokidar

  const debounceRefresh = (path) => {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      io.emit("file:refresh", path);
    }, 300);
  };

  chokidar.watch("/app/user").on("all", (event, path) => {
    console.log(`File change detected: ${event} on ${path}`);
    debounceRefresh(path);
  });

  return io;
};

// Function to get the Socket.IO instance
exports.getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
