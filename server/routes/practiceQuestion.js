const express = require("express");
const router = express.Router();
const controller = require("../controllers/practiceQuestionController");

router.post("/", controller.createPracticeQuestion);
router.get("/:id", controller.getPracticeQuestionBySetID);
router.get(
  "/question/:question_id",
  controller.getPracticeQuestionByQuestionID
);
router.get("/get/all", controller.getAllPracticeQuestion);
router.put("/:id", controller.updateByID);
router.delete("/:practice_set_id/:question_id", controller.DeleteById);
module.exports = router;
