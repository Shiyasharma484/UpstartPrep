const express = require("express");
const router = express.Router();
const controller = require("../controllers/scheduleLearnController");

router.post("/", controller.createSchedule);
router.get("/:id", controller.getScheduleByID);
router.get("/user/:id", controller.getScheduleByUserID);
router.get("/bulk/:event_id", controller.bulkScore);
router.get("/get/all/:id", controller.getAllSchedule);
router.get("/get/all/", controller.getAllSchedule);
router.put("/:id", controller.updateScheduleByID);
router.delete("/:id", controller.DeleteById);

router.get("/event/:event_id/:event_type", controller.getScheduleByEventID);
router.get("/eventtype/:event_type", controller.getScheduleByEvent);
router.get("/date/current", controller.getScheduleByCurrentdate);
router.get("/group/:id", controller.getScheduleByGroup);
router.get("/single/:id", controller.getScheduleByIndividual);

module.exports = router;
