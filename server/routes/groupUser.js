const express = require("express");
const router = express.Router();
const controller = require("../controllers/groupUserController");

router.post("/", controller.createGroupUser);
// router.get("/:id", controller.getVideoBankByID);
// router.get("/get/all", controller.getAllVideoBank);
// router.put("/:id", controller.updateVideoBankByID);
// router.delete("/:id", controller.DeleteById);
module.exports = router;
