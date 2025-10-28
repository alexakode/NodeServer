const db = require("../initDatabase");

function getLatestProjects() {
    return db.prepare(
        `SELECT project_name, deadline
            FROM projects
            ORDER BY updated_at DESC
            LIMIT 5;`
    ).all();
}

module.exports = { getLatestProjects };