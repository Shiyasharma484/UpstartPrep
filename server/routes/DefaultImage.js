const express = require("express");
const router = express.Router();
const controller = require("../controllers/DefaultImageController");
const { ValidateToken } = require("../ApiMiddleware");
router.post("/", ValidateToken, controller.Create);
router.get("/", ValidateToken, controller.GetAll);
router.put("/", ValidateToken, controller.UpdateByUserId);
module.exports = router;
