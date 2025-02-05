const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionBankController");

router.post("/", controller.createQuestionBank);
router.get("/:id", controller.getQuestionBankByID);
router.get("/get/all", controller.getAllQuestionBank);
router.put("/:id", controller.updateQuestionBankByID);
router.delete("/:id", controller.DeleteById);

router.get("/questiontypes/:parent_id", controller.getQuestionTypesByParentID);
router.post("/skills/instructor", controller.getQuestionBankBySkills);
router.post("/search", controller.searchQuestions);

router.get("/section/:id", controller.getQuestionBySectionID);

module.exports = router;
