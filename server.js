require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const { server } = require("socket.io");
const db = require("./initDatabase");
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);
// Middleware for JSON-parsing
const helmet = require("helmet");
app.use(express.json());
const apiLimiter = require("./middleware/rateLimiter");
app.use(apiLimiter);
app.use(helmet());
// Import routes
const employeeSkillsRouter = require("./routes/employeeSkills");
const latestProjectsRouter = require("./routes/latestProjects");
const projectsByEmployeeRouter = require("./routes/projectsByEmployee");
// Use routes
app.use("/employee-skills", employeeSkillsRouter);
app.use("/latest-projects", latestProjectsRouter);
app.use("/projects-by-employee", projectsByEmployeeRouter);
// Importer controller
const { handleAddEmployee } = require("./controllers/employeeSqlController");
const { default: helmet } = require("helmet");

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
