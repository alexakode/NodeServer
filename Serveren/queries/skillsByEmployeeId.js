const db = require("../initDatabase");

function getSkillsByEmployeeId(employeeId) {
    return db.prepare(
        `SELECT skills.name AS skill
            FROM employee_skills
            INNER JOIN skills ON employee_skills.skill_id = skills.id
            WHERE employee_skills.employee_id = ?;`
    ).all(employeeId);
}

module.exports = { getSkillsByEmployeeId };