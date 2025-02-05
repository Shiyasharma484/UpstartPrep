const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/postController");
//
//posts----------------------------starts-----------------------------------
router.get("/", postCtrl.Posts);
router.get("/:id", postCtrl.Posts);
router.get("/user/:id", postCtrl.PostsByUserId);
//
router.delete("/trash/:id", postCtrl.TrashPost);
router.delete("/:id", postCtrl.DeletePost);
//
router.post("/", postCtrl.CreatePost);
router.put("/:id", postCtrl.UpdatePost);
//posts++++++++++++++++++++++++ENDS+++++++++++++++++++++
//
module.exports = router;
