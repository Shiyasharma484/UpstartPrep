const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizController");

router.post("/", controller.createQuiz);
router.get("/:id", controller.getQuizByID);
router.post("/ques/:id", controller.getQuizQuestionsByID);
router.get("/get/all", controller.getAllQuiz);
router.get("/instructor/list/:id", controller.getAllQuizByInstructor);
router.put("/:id", controller.updateQuizByID);
router.delete("/:id", controller.DeleteById);

router.get("/level/:quiz_id", controller.getQuizzesByLevel);

router.post("/taken", controller.QuizTaken);
router.get("/taken/:id", controller.GetQuizTaken);
router.get("/get/:quiz_id", controller.GetQuizTakenByQuizID);
router.get("/schedule/:id", controller.GetQuizTakenByScheduleID);
router.get("/student/:id", controller.GetQuizTakenByStudentID);

router.get("/score/:id", controller.QuizScoreObtained);
router.get("/student/:id", controller.ExamScoreObtainedByStudentID);
router.get("/instructor/:id", controller.ExamScoreObtainedByInstructorID);
router.get("/history/all", controller.QuizHistory);

module.exports = router;
