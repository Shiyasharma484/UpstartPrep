const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizQuestionController");

router.post("/", controller.createQuizQuestion);
router.get("/:quiz_id", controller.getQuizQuestionByQuizID);
router.get("/question/:question_id", controller.getQuizQuestionByQuestionID);
router.get("/get/all", controller.getAllQuizQuestion);
// router.put("/:id", controller.updateByID);
router.delete("/:quiz_id/:question_id", controller.DeleteById);
module.exports = router;
