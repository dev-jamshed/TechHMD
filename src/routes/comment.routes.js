const express = require("express");
const { createComment, deleteComment, getComment, getComments, getPostComments, updateComment } = require("../controllers/admin/comment.controller.js");
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { commentSchema } = require("../schemas/blog/comment.schema.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');
const { PARAM, PARAM_AND_BODY } = require("../utils/constants/global.js");

const router = express.Router();

router.post('/create', verifyJwt, validateRequest(commentSchema), createComment);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getComment);
router.get('/', verifyJwt, getComments);
router.get('/:postId', validateRequest(ZodWrapper({ postId: ValidMongoId }), PARAM), getPostComments);
router.put('/:id', verifyJwt, validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...commentSchema }, PARAM_AND_BODY), updateComment);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteComment);

module.exports = router;
