import express from "express";
const router = express.Router();
import { verifyRecaptchaToken } from "../controllers/admin/recaptcha.controller.js"

router.post('/verify/:token', verifyRecaptchaToken);

export default router;
