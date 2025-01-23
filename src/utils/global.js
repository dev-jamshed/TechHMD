const { z } = require("zod");
const { Types } = require("mongoose");

const ValidMongoId = z.string().refine(
    (val) => Types.ObjectId.isValid(val),
    {
        message: 'Invalid ObjectId',
    }
);

const ZodWrapper = (object) => {
    return z.object(object);
};

module.exports = {
    ValidMongoId,
    ZodWrapper
};