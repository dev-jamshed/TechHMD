import asyncHandler from "../../utils/asyncHandler.js";
import { STATUS_CODES } from "../../utils/constants/statusCodes.js";
import sendResponse from "../../utils/responseHandler.js";
import Traffic from "../../models/traffic.model.js";
import checkNotFound from "../../utils/checkNotFound.js";

// Get daily traffic
export const getDailyTraffic = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyTraffic = await Traffic.aggregate([
    {
      $match: {
        timestamp: { $gte: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const totalUsersToday = await Traffic.countDocuments({
    timestamp: { $gte: today },
  });

  checkNotFound("daily traffic", dailyTraffic);

  sendResponse(res, STATUS_CODES.SUCCESS, { dailyTraffic, totalUsersToday }, "Daily traffic data fetched successfully");
});

// Get weekly traffic
export const getWeeklyTraffic = asyncHandler(async (req, res) => {
  const weeklyTraffic = await Traffic.aggregate([
    {
      $group: {
        _id: { $isoWeek: "$timestamp" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  checkNotFound("weekly traffic", weeklyTraffic);

  sendResponse(res, STATUS_CODES.SUCCESS, weeklyTraffic, "Weekly traffic data fetched successfully");
});

// Get monthly traffic
export const getMonthlyTraffic = asyncHandler(async (req, res) => {
  const monthlyTraffic = await Traffic.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  checkNotFound("monthly traffic", monthlyTraffic);

  sendResponse(res, STATUS_CODES.SUCCESS, monthlyTraffic, "Monthly traffic data fetched successfully");
});
