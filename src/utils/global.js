import { z } from "zod";
import { Types } from "mongoose"

export const ValidMongoId = z.string().refine(
    (val) => Types.ObjectId.isValid(val),
    {
        message: 'Invalid ObjectId',
    }
);

export const ZodWrapper = (object) => {
    return z.object(object)
}