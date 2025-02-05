const express = require("express");
const router = express.Router();
const userController = require("../controllers/rolesController");
const { checkrole, checkrolealready } = require("../models/user");

//
//USING THESE----------------------------------STARTS
router.post("/admin/", userController.GetAllRolesMadeByAdminForDashboardUsers);

router.delete("/:id", checkrole, userController.DeleteRoleById);
router.post("/", checkrolealready, userController.CreateRole);
router.get("/:id", checkrole, userController.GetRoleById);
router.put("/:id", userController.UpdateRoleById);
//USING THESE----------------------------------ENDS
//
router.get("/allNamesAndIds/all", userController.GetAllRolesNamesAndIds);
router.get("/get/all", userController.GetAllRoles);

//
module.exports = router;
