const express = require("express");
const router = express.Router();
const controller = require("../controllers/examsController");

router.post("/", controller.createExams);
router.get("/:id", controller.getExamsByID);
router.post("/ques/:id", controller.getExamsQuestionsByID);
router.get("/ans/:id", controller.getExamsQuestionsAnswersByID);
router.get("/get/all", controller.getAllExams);
router.get("/instructor/list/:id", controller.getAllExamsByInstructor);
router.put("/:id", controller.updateExamsByID);
router.delete("/:id", controller.DeleteById);

router.post("/taken", controller.ExamTaken);
router.get("/taken/:id", controller.GetExamTaken);
router.get("/get/:exam_id", controller.GetExamTakenByExamID); // Need to be change
router.get("/schedule/:id", controller.GetExamTakenByScheduleID);

// router.get("/section/:section_id", controller.GetExamTakenBySectionID);

// router.get("/score/all", controller.ExamScoreObtained);
router.get("/score/:id", controller.ExamScoreObtained);
router.get("/student/:id", controller.ExamScoreObtainedByStudentID);
router.get("/instructor/:id", controller.ExamScoreObtainedByInstructorID);
router.get("/history/all", controller.ExamHistory);
router.get("/details/:student_id", controller.getDetailsOfStudent);
router.get("/pastpapers/:student_id", controller.getPastPapersByStudentID);
module.exports = router;
