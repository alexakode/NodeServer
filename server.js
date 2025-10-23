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
