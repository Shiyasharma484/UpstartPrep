const express = require("express");
const router = express.Router();
const userController = require("../controllers/imageController");
//
router.post("/post", userController.InsertImagePost); //multiple pics
router.post("/logo", userController.Insertlogo); //multiple pics
module.exports = router;
