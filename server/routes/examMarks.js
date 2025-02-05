const express = require("express");
const router = express.Router();
const controller = require("../controllers/examMarksController");

router.post("/", controller.createexamMarks);
router.get("/:exam_id", controller.getexamMarksByExamID);
router.get("/schedule/:schedule_id", controller.getexamMarksByScheduleID);
router.get("/student/:student_id", controller.getexamMarksByStudentID);
router.get("/get/all", controller.getAllExamMarks);
router.put("/:id", controller.updateByID);
// router.delete("/:id", controller.DeleteById);
module.exports = router;
