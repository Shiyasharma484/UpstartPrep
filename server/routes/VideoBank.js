const express = require("express");
const router = express.Router();
const controller = require("../controllers/videoBankController");

router.post("/", controller.createVideoBank);
router.get("/:id", controller.getVideoBankByID);
router.get("/get/all", controller.getAllVideoBank);
router.put("/:id", controller.updateVideoBankByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
