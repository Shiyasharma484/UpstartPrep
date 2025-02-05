const express = require("express");
const router = express.Router();
const controller = require("../controllers/examQuestionController");

router.post("/", controller.createExamQuestion);
router.get("/:exam_id", controller.getExamQuestionByExamID);
// router.get("/section/:exam_id", controller.getExamQuestionBySectionID);
router.get("/question/:question_id", controller.getExamQuestionByQuestionID);
router.get("/get/all", controller.getAllExamQuestion);
router.put("/:id", controller.updateByID);
router.delete("/:exam_id/:question_id", controller.DeleteById);
module.exports = router;
