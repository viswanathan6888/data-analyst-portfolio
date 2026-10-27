/**
 * Vercel Serverless Function: GET /api/analytics-status
 * Returns current reporting date in Asia/Kolkata timezone, latest finalized date,
 * and current processing status for today.
 */

import { REPORTING_TIMEZONE, getCurrentReportingDate } from '../src/services/youtubeApi.js';
import { LAST_PROCESSED_DATE } from '../src/services/dataSnapshot.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const currentReportingDate = getCurrentReportingDate(REPORTING_TIMEZONE);
  const isTodayProcessed = currentReportingDate <= LAST_PROCESSED_DATE;

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json({
    currentReportingDate,
    reportingTimezone: REPORTING_TIMEZONE,
    latestAnalyticsDate: LAST_PROCESSED_DATE,
    todayDate: currentReportingDate,
    todayStatus: isTodayProcessed ? 'Finalized' : 'Pending',
    processingDelay: '24-48h YouTube Analytics batch aggregation'
  });
}
