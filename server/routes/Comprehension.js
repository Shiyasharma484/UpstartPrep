const express = require("express");
const router = express.Router();
const controller = require("../controllers/comprehensionController");

router.post("/", controller.createComprehension);
router.get("/:id", controller.getComprehensionByID);
router.get("/get/all", controller.getAllComprehension);
router.put("/:id", controller.updateComprehensionByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
