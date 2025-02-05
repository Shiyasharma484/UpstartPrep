const express = require("express");
const router = express.Router();
const controller = require("../controllers/consultationRequestsController");

router.post("/", controller.createConsultationRequests);
router.get("/:id", controller.getConsultationRequestsID);
router.get("/get/all", controller.getAllConsultationRequests);
router.put("/:id", controller.updateConsultationRequestsByID);
// router.delete("/:id", controller.DeleteById);
module.exports = router;
