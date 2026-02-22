const express = require("express");
const router = express.Router();
const c = require("../controllers/reference.controller");

router.get("/", c.getReferences);
router.get("/:id", c.getReferenceById);
router.post("/", c.createReference);
router.put("/:id", c.updateReference);
router.delete("/:id", c.deleteReference);

module.exports = router;
