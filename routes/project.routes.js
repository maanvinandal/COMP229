const express = require("express");
const router = express.Router();
const c = require("../controllers/project.controller");

router.get("/", c.getProjects);
router.get("/:id", c.getProjectById);
router.post("/", c.createProject);
router.put("/:id", c.updateProject);
router.delete("/:id", c.deleteProject);

module.exports = router;
