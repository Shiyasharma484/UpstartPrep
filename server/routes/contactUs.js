const express = require("express");
const router = express.Router();
const Controller = require("../controllers/contactUsController");

router.post("/", Controller.Create); //Done

router.get("/:id", Controller.GetAll);

module.exports = router;
