import express from "express";
import { registerController, loginController, getAdmin, logout } from "../controllers/admin/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { registerSchema } from "../schemas/user/register.schema.js";
import { loginSchema } from "../schemas/user/login.schema.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

const router = express.Router();

// router.post('/register', upload.single('avatar'), validateRequest(registerSchema), registerController);
router.get('/', verifyJwt, getAdmin);
router.post('/validate-token', verifyJwt, (req, res) => {
    res.status(200).json({ message: "token is valid" })
});

router.post('/login', validateRequest(loginSchema), loginController);
router.get('/logout', verifyJwt, logout);

export default router;
