const express = require("express");
const router = express.Router();
const controller = require("../controllers/examSectionController ");

router.post("/", controller.createExamSection);
router.get("/:exam_id", controller.getExamSectionByExamID);
router.get("/section/:section_id", controller.getExamSectionBySectionID);
router.get("/single/:id", controller.getExamSectionByID);
router.get("/get/all", controller.getAllExamSection);
router.put("/:id", controller.updateExamSectionByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
