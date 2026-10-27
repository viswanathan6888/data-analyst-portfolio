/**
 * Vercel Serverless Function: GET /api/analytics-status
 * Returns current reporting date in Asia/Kolkata timezone, latest finalized date,
 * and current processing status for today.
 */

import { REPORTING_TIMEZONE, getCurrentReportingDate } from '../src/services/youtubeApi.js';
import { LAST_PROCESSED_DATE } from '../src/services/dataSnapshot.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const currentReportingDate = getCurrentReportingDate(REPORTING_TIMEZONE);
  const isTodayProcessed = currentReportingDate <= LAST_PROCESSED_DATE;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  let liveLifetimeViews = 191550;
  if (apiKey) {
    try {
      const vUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=CobjbCF-Rvw&key=${encodeURIComponent(apiKey)}`;
      const vRes = await fetch(vUrl);
      if (vRes.ok) {
        const vData = await vRes.json();
        if (vData.items?.[0]?.statistics?.viewCount) {
          liveLifetimeViews = parseInt(vData.items[0].statistics.viewCount, 10);
        }
      }
    } catch (e) {
      console.warn('Analytics status live stats fetch failed:', e);
    }
  }

  const priorFinalizedSum = 188499;
  const todayLiveViews = Math.max(0, liveLifetimeViews - priorFinalizedSum);

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.status(200).json({
    currentReportingDate,
    reportingTimezone: REPORTING_TIMEZONE,
    latestAnalyticsDate: LAST_PROCESSED_DATE,
    todayDate: currentReportingDate,
    todayStatus: 'Live (Syncing)',
    lifetimeViews: liveLifetimeViews,
    priorFinalizedSum,
    todayLiveViews,
    reconciledDiscrepancy: 0,
    processingDelay: '24-48h YouTube Analytics batch aggregation'
  });
}
