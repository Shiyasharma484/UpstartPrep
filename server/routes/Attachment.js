const express = require("express");
const router = express.Router();
const userController = require("../controllers/attactmentController");

router.post("/:folder", userController.CreateAttachment);
router.put("/:folder", userController.Resize);
router.post("/uploadimgurl/url", userController.downloadFromUrl);

router.post("/csv", userController.readCSV);
router.post("/excel", userController.readCSVxls);

router.post("/upload/doc", userController.InsertDoc);
router.post("/upload/image", userController.InsertImage);

module.exports = router;
