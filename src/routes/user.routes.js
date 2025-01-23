const express = require("express");
const { registerController, loginController, getAdmin, logout } = require("../controllers/admin/user.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { registerSchema } = require("../schemas/user/register.schema.js");
const { loginSchema } = require("../schemas/user/login.schema.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");

const router = express.Router();

router.post('/register', upload.single('avatar'), validateRequest(registerSchema), registerController);
router.get('/', verifyJwt, getAdmin);

router.post('/login', validateRequest(loginSchema), loginController);
router.get('/logout', verifyJwt, logout);

module.exports = router;
