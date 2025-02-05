const express = require("express");
const router = express.Router();
const controller = require("../controllers/practiceSetsController");

router.post("/", controller.createPracticeSets);
router.get("/:id", controller.getPracticeSetsByID);
router.post("/ques/:id", controller.getPracticeQuestionByID);
router.get("/get/all", controller.getAllPracticeSets);
router.get("/instructor/list/:id", controller.getAllPracticeSetsByInstructor);
router.put("/:id", controller.updatePracticeSetsByID);
router.delete("/:id", controller.DeleteById);

router.post("/taken", controller.PracticeSetTaken);                        //Done
router.get("/taken/:id", controller.GetPracticeTaken);                          //Done
router.get("/score/:id", controller.getPracticeSetScore);                                 //Done

router.get("/student/:id", controller.PracticeSetScoreObtainedByStudentID);
router.get(
  "/instructor/:id",
  controller.PracticeSetScoreObtainedByInstructorID
);
router.get("/history/all", controller.PracticeSetHistory);
module.exports = router;
