const path = require("path");
const Database = require("better-sqlite3");

// Lag filsti til databasen
const dbPath = path.join(__dirname, "employees.sqlite");
const db = new Database(dbPath, { verbose: console.log });

// Opprett tabell
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    job_title TEXT,
    UNIQUE(first_name, last_name)
  )
`
).run();
// Jeg har ikke not null på job_title fordi noen ansatte kanskje ikke har en tittel ennå
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )
`
).run();
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS employee_skills (
    employee_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    PRIMARY KEY (employee_id, skill_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
  )
`
).run();
console.log("Table created");
db.prepare(
  `
  DELETE FROM employees
  WHERE id NOT IN (SELECT MIN(id) FROM employees GROUP BY first_name, last_name, job_title);
`
).run();

// Sett inn noen testdata
const insert = db.prepare(`
  INSERT INTO employees (first_name, last_name, job_title)
  VALUES (?, ?, ?)
`);
const employees = [
  ["Ola", "Nordmann", "Software Engineer"],
  ["Kari", "Nordmann", "Project Manager"],
  ["Per", "Hansen", "Data Analyst"],
];
for (const row of employees) {
  insert.run(...row);
}
console.log("Test data inserted");
insert.run("Anna", "Berg", "Frontend Developer");
insert.run("Jonas", "Lunde", "Backend Developer");
insert.run("Sara", "Nguyen", "UX Designer");

console.log("Sample data inserted");

module.exports = db;
