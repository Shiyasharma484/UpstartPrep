const express = require("express");
const router = express.Router();
const controller = require("../controllers/lessonController");

router.post("/", controller.createLessons);
router.get("/:id", controller.getLessonssByID);
router.get("/get/all", controller.getAllLessons);
router.put("/:id", controller.updateLessonsByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
