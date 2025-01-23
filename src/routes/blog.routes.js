const express = require("express");
const { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } = require("../controllers/admin/blog.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const { blogSchema } = require("../schemas/blog/blog.schema.js");
const { verifyJwt } = require("../middlewares/verifyJwt.middleware.js");
const { COVER, PARAM, PARAM_AND_BODY, PRODUCTION } = require('../utils/constants/global.js');
const { validateRequest } = require("../middlewares/validation.middleware.js");
const { ValidMongoId, ZodWrapper } = require('../utils/global.js');

const router = express.Router();

router.post('/create', verifyJwt, upload.single(COVER), validateRequest(blogSchema), createBlog);
router.get('/:id', validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), getBlog);
router.get('/', getBlogs);

router.put('/:id', verifyJwt, upload.single(COVER), validateRequest({ ...ZodWrapper({ id: ValidMongoId }), ...blogSchema }, PARAM_AND_BODY), updateBlog);
router.delete('/:id', verifyJwt, validateRequest(ZodWrapper({ id: ValidMongoId }), PARAM), deleteBlog);

module.exports = router;
