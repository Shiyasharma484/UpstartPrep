const express = require("express");
const router = express.Router();
const Category = require("../controllers/categoryController");

router.post("/", Category.createCategory);
router.get("/:id", Category.getCategoryByID);
router.get("/get/all", Category.getAllCategories);
router.put("/:id", Category.updateCategoryByID);
router.delete("/:id", Category.DeleteById);
module.exports = router;
