import { z } from "zod";
import { ValidMongoId } from '../../utils/global.js'

export const commentSchema = z.object({
    blogId: ValidMongoId,
    user: z.object({
        name: z.string().max(64, { message: "name can't exceed 64 characters" }),
    }).optional(),
    comment: z.string().trim().min(1, { message: "Comment can't be empty" }).max(512, { message: "Comment can't exceed 512 characters" }),
})