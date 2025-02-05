const express = require("express");
const router = express.Router();
const skills = require("../controllers/skillsController");

router.post("/", skills.createSkills);
router.get("/:id", skills.getSkillsByID);
router.get("/get/all", skills.getAllSkills);
router.put("/:id", skills.updateSkillsByID);
router.delete("/:id", skills.DeleteById);
module.exports = router;
