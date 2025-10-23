const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
} = require("../services/employeeServices");

const handleAddEmployee = (req, res) => {
  const { firstName, lastName, jobTitle } = req.body;

  if (!firstName || !lastName || !jobTitle) {
    return res
      .status(400)
      .json({ error: "First name, last name, and job title are required" });
  }

  try {
    const result = addEmployee(firstName, lastName, jobTitle);
    res.status(201).json({
      message: "Employee added",
      employee: { id: result.lastInsertRowid, firstName, lastName, jobTitle },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add employee" });
  }
};
const handleGetAllEmployees = (req, res) => {
  try {
    const employees = getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};
const handleGetEmployeeById = (req, res) => {
  const { id } = req.params;

  try {
    const employee = getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve employee" });
  }
  res.json({ message: "Employee details", employee });
};
const handleUpdateEmployee = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, jobTitle } = req.body;
  if (!firstName || !lastName || !jobTitle) {
    return res
      .status(400)
      .json({ error: "First name, last name, and job title are required" });
  }
  try {
    const result = updateEmployee(id, { firstName, lastName, jobTitle });
    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({
      message: "Employee updated",
      employee: { id, firstName, lastName, jobTitle },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};
const handleDeleteEmployee = (req, res) => {
  const { id } = req.params;
  try {
    const result = deleteEmployee(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
module.exports = {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeById,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
