require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
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
if (process.env.NODE_ENV === "production") {
  const helmet = require("helmet");
  const rateLimit = require("express-rate-limit");
  const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use(helmet());
  app.use(rateLimiter);
}
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
