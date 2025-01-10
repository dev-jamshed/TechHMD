import express from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/admin/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { blogSchema } from "../schemas/blog/blog.schema.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { COVER, PARAM, PARAM_AND_BODY, PRODUCTION } from '../utils/constants/global.js'
import { validateRequest } from "../middlewares/validation.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js'

const router = express.Router();

router.post('/create', verifyJwt, upload.single(COVER), validateRequest(blogSchema), createBlog);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getBlog);
router.get('/', getBlogs);

router.put('/:id', verifyJwt, upload.single(COVER), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...blogSchema }, PARAM_AND_BODY), updateBlog);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteBlog);

export default router;
