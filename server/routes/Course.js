const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseController");

router.post("/", controller.createCourse);
router.get("/:id", controller.getCourseByID);
router.get("/get/all", controller.getAllCourse);
router.put("/:id", controller.updateByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
