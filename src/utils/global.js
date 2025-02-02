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

export const pipeline = [
  {
    $lookup: {
      from: "services",
      let: { 
        serviceId: {
          $cond: {
            if: { $eq: ["$serviceId", ""] },
            then: null,
            else: { $toObjectId: "$serviceId" }
          }
        }
      },
      pipeline: [
        {
          $match: {
            $expr: { 
              $and: [
                { $ne: ["$$serviceId", null] },
                { $eq: ["$_id", "$$serviceId"] }
              ]
            }
          }
        },
        {
          $project: {
            name: 1
          }
        }
      ],
      as: "service"
    }
  },
  {
    $addFields: {
      service: {
        $arrayElemAt: ["$service", 0]
      }
    }
  },
  {
    $project: {
      serviceId: 0
    }
  }
];