/**
 * Vercel Serverless Function: GET /api/export-excel?videoId=VIDEO_ID
 * Server-side fallback for generating and downloading the YouTube Analytics Excel report (.xlsx)
 */

import { generateYouTubeExcelWorkbook } from '../src/services/excelExportService.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS } from '../src/services/dataSnapshot.js';
import { generateDayWiseAnalyticsModel } from '../src/services/youtubeApi.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { videoId } = req.query;
    const cleanId = (videoId && typeof videoId === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(videoId.trim()))
      ? videoId.trim()
      : 'CobjbCF-Rvw';

    let targetVideo = VERIFIED_VIDEO_METADATA;
    let targetDaily = VERIFIED_DAILY_ANALYTICS;

    const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

    // If an arbitrary non-default video is requested, fetch genuine video metadata
    if (cleanId !== 'CobjbCF-Rvw') {
      if (apiKey) {
        try {
          const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              const item = data.items[0];
              const snippet = item.snippet || {};
              const content = item.contentDetails || {};
              const stats = item.statistics || {};
              targetVideo = {
                id: item.id,
                title: snippet.title || 'YouTube Video',
                channelTitle: snippet.channelTitle || 'Unknown Channel',
                publishedAt: snippet.publishedAt,
                duration: content.duration,
                formattedDuration: content.duration,
                viewCount: parseInt(stats.viewCount || 0, 10),
                likeCount: parseInt(stats.likeCount || 0, 10),
                commentCount: parseInt(stats.commentCount || 0, 10),
                statistics: stats
              };
            }
          }
        } catch (fetchErr) {
          console.warn('[Excel Export] Direct video details query failed:', fetchErr);
        }
      }
      targetDaily = generateDayWiseAnalyticsModel(targetVideo);
    }

    const workbook = await generateYouTubeExcelWorkbook({
      videoData: targetVideo,
      dailyData: targetDaily,
      trackedVideosList: [{ videoData: targetVideo, dailyData: targetDaily }]
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `YouTube_Analytics_Report_${cleanId}_${new Date().toISOString().split('T')[0]}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Vercel serverless Excel export error:', error);
    return res.status(500).json({ error: error.message });
  }
}
