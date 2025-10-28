const express = require("express");
const router = express.Router();
const path = require("path");
const employeeSqlController = require(path.join(
  __dirname,
  "../controller/employeesSqlController"
));
// const Roles-list
// const { authorizeRole } = require(path.join(__dirname, '../middleware/authorizeRole'));
const {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
  handleUpdateEmployee,
  handleDeleteEmployee,
} = employeeSqlController;
router.post("/employees", handleAddEmployee);
router.get("/employees", handleGetAllEmployees);
router.get("/employees/:id", handleGetEmployeeById);
router.put("/employees/:id", handleUpdateEmployee);
router.delete("/employees/:id", handleDeleteEmployee);
module.exports = router;
