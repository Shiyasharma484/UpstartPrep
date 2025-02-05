const express = require("express");
const router = express.Router();
const controller = require("../controllers/contentController");

router.post("/", controller.createContent);
router.get("/:id", controller.getContentByID);
router.get("/get/all", controller.getAllContent);
router.put("/:id", controller.updateByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
