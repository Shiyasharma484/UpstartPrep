const express = require("express");
const router = express.Router();
const configCtrl = require("../controllers/configurationController");
//-----------------------------------------------------------------
router.get("/:id", configCtrl.Configurations);
router.get("/", configCtrl.Configurations);
router.delete("/:id", configCtrl.Delete);
router.post("/", configCtrl.Create);
router.put("/", configCtrl.Update);
router.put("/:id", configCtrl.UpdateBykey);

//-----------------------------------------------------------------
module.exports = router;
