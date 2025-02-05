const express = require("express");
const router = express.Router();
const userController = require("../controllers/groupController");

router.post("/", userController.CreateGroup);
router.get("/:id", userController.GetGroupByID);
router.get("/get/all", userController.GetAllGroup);
router.put("/:id", userController.updateGroupByID);
router.delete("/:id", userController.DeleteById);

module.exports = router;
