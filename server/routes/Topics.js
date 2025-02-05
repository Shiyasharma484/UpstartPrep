const express = require("express");
const router = express.Router();
const topics = require("../controllers/topicsController");

router.post("/", topics.createtopics);
router.get("/:id", topics.gettopicsByID);
router.get("/get/all", topics.getAlltopics);
router.put("/:id", topics.updatetopicsByID);
router.delete("/:id", topics.DeleteById);
module.exports = router;
