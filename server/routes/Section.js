const express = require("express");
const router = express.Router();
const sections = require("../controllers/sectionController");

router.post("/", sections.createSection);
router.get("/:id", sections.getSectionByID);
router.get("/get/all", sections.getALLSection);
router.put("/:id", sections.updateSectionByID);
router.delete("/:id", sections.DeleteById);
module.exports = router;
