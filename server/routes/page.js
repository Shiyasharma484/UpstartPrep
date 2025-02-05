const express = require("express");
const router = express.Router();
const Controller = require("../controllers/pageController");

router.post("/", Controller.Create); //Done

router.get("/:id", Controller.GetAll);
router.put("/:id", Controller.UpdateById);
router.delete("/:id", Controller.DeleteById);

module.exports = router;
