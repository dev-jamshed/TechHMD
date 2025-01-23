const express = require("express");
const router = express.Router();
const { verifyRecaptchaToken } = require("../controllers/admin/recaptcha.controller.js");

router.post('/verify/:token', verifyRecaptchaToken);

module.exports = router;
