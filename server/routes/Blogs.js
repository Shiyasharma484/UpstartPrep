const express = require("express");
const router = express.Router();
const controller = require("../controllers/blogsController");

router.post("/", controller.CreateBlogs);

router.get("/:id", controller.GetBlogByID);
router.get("/get/all", controller.GetAllBlog);
router.put("/:id", controller.UpdateByBlogId);
router.delete("/:id", controller.DeleteById);
module.exports = router;
