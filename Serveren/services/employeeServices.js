const db = require("../initDatabase");

function addEmployee(firstName, lastName, jobTitle) {
  const stmt = db.prepare(
    `INSERT INTO employees (first_name, last_name, job_title) VALUES (?, ?, ?)`
  );
  return stmt.run(firstName, lastName, jobTitle);
}
function getAllEmployees() {
  const stmt = db.prepare(`SELECT * FROM employees`);
  return stmt.all();
}
function getEmployeeById(id) {
  const stmt = db.prepare(`SELECT * FROM employees WHERE id = ?`);
  return stmt.get(id);
}
function updateEmployee(id, { firstName, lastName, jobTitle }) {
  const stmt = db.prepare(
    `UPDATE employees SET first_name = ?, last_name = ?, job_title = ? WHERE id = ?`
  );
  return stmt.run(firstName, lastName, jobTitle, id);
}
function deleteEmployee(id) {
  const stmt = db.prepare(`DELETE FROM employees WHERE id = ?`);
  return stmt.run(id);
}
module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
