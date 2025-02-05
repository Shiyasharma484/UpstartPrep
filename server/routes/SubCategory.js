const express = require("express");
const router = express.Router();
const subCategory = require("../controllers/subCategoryController");

router.post("/", subCategory.createSubCategory);
router.get("/:id", subCategory.getSubCategoryByID);
router.get("/get/all", subCategory.getAllSubCategory);
router.put("/:id", subCategory.updateSubCategoryByID);
router.delete("/:id", subCategory.DeleteById);
module.exports = router;
