const express = require("express");
const router = express.Router();
const userController = require("../controllers/permissionController");
//
router.get("/role/:id", userController.GetRoleModulesPermissionsByRoleId);
router.get("/user/:id", userController.GetRolesModulesPermissionsByUserId);
router.get("/all", userController.GetAllPermissions);

module.exports = router;
