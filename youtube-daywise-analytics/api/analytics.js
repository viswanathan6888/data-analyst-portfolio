/**
 * Vercel Serverless Function: GET /api/analytics
 * Securely proxies YouTube Analytics API v2 requests using the Channel Owner's OAuth Bearer Token
 */

import { REPORTING_TIMEZONE, getCurrentReportingDate } from '../src/services/youtubeApi.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authorization header with Bearer token is required for YouTube Analytics API.'
    });
  }

  const { videoId, startDate, endDate, channelId = 'MINE' } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'videoId query parameter is required.' });
  }

  const effectiveStartDate = startDate || '2026-10-17';
  const effectiveEndDate = endDate || getCurrentReportingDate(REPORTING_TIMEZONE);

  const metrics = 'views,estimatedMinutesWatched,averageViewDuration,likes,comments,shares,subscribersGained,subscribersLost';
  const channelParam = channelId === 'MINE' ? 'channel==MINE' : `channel==${channelId}`;

  const queryParams = new URLSearchParams({
    ids: channelParam,
    startDate: effectiveStartDate,
    endDate: effectiveEndDate,
    metrics: metrics,
    dimensions: 'day',
    filters: `video==${videoId}`,
    sort: 'day'
  });

  const url = `https://youtubeanalytics.googleapis.com/v2/reports?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
        Accept: 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Analytics API error',
        details: data.error
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
