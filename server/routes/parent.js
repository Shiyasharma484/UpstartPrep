const express = require("express");
const router = express.Router();
const controller = require("../controllers/parentController");

router.post("/", controller.createParent);
router.get("/:id", controller.getParentByID);
router.get("/get/all", controller.getAllParent);
router.get("/child/:id", controller.getAllChildByParent);
router.put("/:id", controller.updateByID);
router.delete("/:id", controller.DeleteById);
module.exports = router;
