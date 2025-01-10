import Traffic from '../models/traffic.model.js';
import geoip from 'geoip-lite';
import asyncHandler from '../utils/asyncHandler.js';

export const captureTraffic = asyncHandler(async (req, res, next) => {
  if (req.method !== 'GET' || req.originalUrl.includes('/traffic')) {
    return next();
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : 'Unknown';
  const page = req.originalUrl;

  const trafficData = new Traffic({
    ip,
    country,
    page,
    timestamp: new Date(),
  });

  await trafficData.save();
  next();
});
