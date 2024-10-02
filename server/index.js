const http = require("http");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { setupSocketIO } = require("./utils/socketSetup");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(routes);

setupSocketIO(server);

server.listen(9000, () => console.log("Docker server listening on port 9000"));
