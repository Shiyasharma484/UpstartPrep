const express = require("express");
const router = express.Router();
const customerCtrl = require("../controllers/customerController");
const { checkcustomer, checkcustomeralready } = require("../models/customer");
const { GenuineTokenLogout } = require("../helpers/customer");
//
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
//
router.post("/login", customerCtrl.Login); //login customer
router.post("/login/social", customerCtrl.LoginSocial); //login customer social media
router.get("/logout", GenuineTokenLogout, customerCtrl.Logout); //log out
//
//NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
router.post("/checkcustomeralready", customerCtrl.checkcustomeralready);

router.post("/checkoldpassword/:id", customerCtrl.CheckOldPassword); //checkcustomer

router.put("/passwordupdate/:id", customerCtrl.PasswordUpdate); //checkcustomer

router.post("/verifyA/:id", customerCtrl.VerifyCodeAccountVerification); //for social media   //checkcustomer
router.post("/verifyP/:id", customerCtrl.VerifyCodeForgotPassword); //for social media //checkcustomer
//
//CUSTOMER EMAIL ___________________________________________________STARTS
router.get("/verificationCode/:id", customerCtrl.CustomerVerificationCodeEmail); //checkcustomer
router.get("/verify/:id", customerCtrl.CustomerAccountVerificationCodeEmail); //checkcustomer
router.get("/changedpassword/:id", customerCtrl.CustomerPasswordChangedEmail); //checkcustomer
router.get("/created/:id", customerCtrl.CustomerCreated); //checkcustomer
//CUSTOMER EMAIL ___________________________________________________ENDS
//
//USING THESE----------------------------------STARTS
router.get("/", customerCtrl.GetAllCustomers);
router.get("/:id", customerCtrl.GetCustomer); //checkcustomer
router.put("/:id", customerCtrl.UpdateCustomer); //checkcustomer, checkcustomeralready
router.delete("/:id", customerCtrl.DeleteCustomer); //checkcustomer
router.post("/", customerCtrl.CreateCustomer); //checkcustomeralready
router.post("/s", customerCtrl.CreateCustomerS); //for social media //checkcustomeralready
//USING THESE----------------------------------ENDS
//DELETE THESE--starts
//DELETE THESE--ends
//

module.exports = router;
