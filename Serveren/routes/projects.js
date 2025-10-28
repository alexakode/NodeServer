const express = require('express');
const router = express.Router();
const getProjectsWithEmployee = require('../queries/projectsWithEmployee');
const { getProjectsByEmployee } = require('../queries/projectsByEmployee');
router.get("/", (req, res) => {
    const data = getProjectsWithEmployee();
    res.json(data);
});

router.get("/:id", (req, res) => {
    const employeeId = req.params.id;
    const data = getProjectsByEmployeeId(employeeId);
    res.json(data);
})
module.exports = router;