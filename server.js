const express = require("express");
const app = express();
const port = 3000;

// Middleware for JSON-parsing
app.use(express.json());

// Importer controller
const { handleAddEmployee } = require("./controllers/employeeSqlController");

// Rute for å legge til ansatt
app.post("/employees", handleAddEmployee);

// Start server
app.listen(port, () => {
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
