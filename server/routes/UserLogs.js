const express = require("express");
const router = express.Router();
const controller = require("../controllers/userLogsController");

router.post("/", controller.createUserLogs);
router.get("/:id", controller.getUserLogsByUserID);
router.get("/", controller.getUserLogsByDate);

module.exports = router;
