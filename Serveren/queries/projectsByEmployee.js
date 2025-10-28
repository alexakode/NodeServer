const db = require ("../initDatabase");

function getProjectsByEmployee(employeeId) {
    return db.prepare(
        `SELECT project_name, deadline
            FROM projects
            WHERE employee_id = ?`
    ).all(employeeId);
}

module.exports = { getProjectsByEmployee };