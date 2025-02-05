const express = require("express");
const router = express.Router();
const tags = require("../controllers/tagsController");

router.post("/", tags.createtags);
router.get("/:id", tags.gettagsByID);
router.get("/get/all", tags.getAllTags);
router.put("/:id", tags.updatetagsByID);
router.delete("/:id", tags.DeleteById);
module.exports = router;
