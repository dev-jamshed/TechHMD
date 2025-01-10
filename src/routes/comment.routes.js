import express from "express";
import { createComment, deleteComment, getComment, getComments, getPostComments, updateComment } from "../controllers/admin/comment.controller.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import { commentSchema } from "../schemas/blog/comment.schema.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { ValidMongoId, ZodWrapper } from '../utils/global.js';
import { PARAM, PARAM_AND_BODY } from "../utils/constants/global.js";

const router = express.Router();

router.post('/create', verifyJwt, validateRequest(commentSchema), createComment);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getComment);
router.get('/', verifyJwt, getComments);
router.get('/:postId', validateRequest(ZodWrapper({ postId: ValidMongoId }), PARAM), getPostComments);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...commentSchema }, PARAM_AND_BODY), updateComment);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteComment);

export default router;
