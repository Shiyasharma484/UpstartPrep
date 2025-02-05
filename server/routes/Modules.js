const express = require("express");
const router = express.Router();
const userController = require("../controllers/modulesController");
//
//

router.get("/enable/:id", userController.EnableModuleById);
router.get("/disable/:id", userController.DisableModuleById);
router.get("/parent/:id", userController.GetModuleByParentId);
//dn knw below
// router.get("/home", userController.GetHomeBanners);

// router.get("/single/:id", userController.GetSingleBannerById);

// //dn knw below functionality

// router.delete("/delete/:id", userController.DeleteBannerById);
//
//USING THESE----------------------------------STARTS
router.get("/allNamesAndIds", userController.GetAllModulesNamesAndIds);
router.get("/all", userController.GetAllModules);
router.delete("/:id", userController.DeleteModuleById);
router.post("/", userController.CreateModule);
router.get("/single/:id", userController.GetModuleById);
router.put("/update/:id", userController.UpdateModuleById);

//USING THESE----------------------------------ENDS
//DELETE THESE--starts
router.post("/checkmodulealready", userController.checkmodulealready);
//DELETE THESE--ends
//
module.exports = router;
