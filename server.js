const express = require("express");
const app = express();
const http = require("http");
const { server } = require("socket.io");
const db = require("./initDatabase");
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);
// Middleware for JSON-parsing
app.use(express.json());

// Importer controller
const { handleAddEmployee } = require("./controllers/employeeSqlController");

// Rute for å legge til ansatt
app.post("/employees", handleAddEmployee);
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("chatmsg", (msg) => {
    console.log("Message received:", msg);
    io.emit("chatmsg", msg); // Broadcast message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
process.on("SIGINT", () => {
  try {
    db.close();
    console.log("Shutting down server...");
  } catch (error) {
    console.error("Error occurred while shutting down server:", error);
  } finally {
    process.exit(0);
  }
});
