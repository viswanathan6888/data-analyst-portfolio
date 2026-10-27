/**
 * Vercel Serverless Function: GET /api/export-excel?videoId=VIDEO_ID
 * Server-side fallback for generating and downloading the YouTube Analytics Excel report (.xlsx)
 */

import { generateYouTubeExcelWorkbook } from '../src/services/excelExportService.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS } from '../src/services/dataSnapshot.js';
import { generateTimelineCalendar, parseDuration, REPORTING_TIMEZONE, getCurrentReportingDate } from '../src/services/youtubeApi.js';

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

    if (!videoId || typeof videoId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(videoId.trim())) {
      console.warn(`[API /api/export-excel] Invalid or missing videoId query parameter: "${videoId}"`);
      return res.status(400).json({ error: 'Valid 11-character videoId query parameter is required.' });
    }

    const cleanId = videoId.trim();
    const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

    let targetVideo = null;
    let targetDaily = [];

    if (cleanId === 'CobjbCF-Rvw') {
      // Default initial video verified dataset with live Data API v3 statistics
      targetVideo = { ...VERIFIED_VIDEO_METADATA };

      if (apiKey) {
        try {
          const vUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
          const vRes = await fetch(vUrl);
          if (vRes.ok) {
            const vData = await vRes.json();
            if (vData.items && vData.items.length > 0) {
              const liveStats = vData.items[0].statistics || {};
              const liveSnippet = vData.items[0].snippet || {};
              targetVideo = {
                ...targetVideo,
                title: liveSnippet.title || targetVideo.title,
                viewCount: parseInt(liveStats.viewCount || targetVideo.viewCount, 10),
                likeCount: parseInt(liveStats.likeCount || targetVideo.likeCount, 10),
                commentCount: parseInt(liveStats.commentCount || targetVideo.commentCount, 10),
                statistics: { ...targetVideo.statistics, ...liveStats }
              };
            }
          }
        } catch (fetchErr) {
          console.warn('[API /api/export-excel] Live stats fetch fallback:', fetchErr);
        }
      }

      const publishedAt = targetVideo.publishedAt || VERIFIED_VIDEO_METADATA.publishedAt;
      const todayStr = getCurrentReportingDate(REPORTING_TIMEZONE);
      targetDaily = generateTimelineCalendar({
        publishedAt,
        latestDate: todayStr,
        apiReportRows: [],
        verifiedDailyAnalytics: VERIFIED_DAILY_ANALYTICS,
        isDefaultVideo: true,
        reportingTimezone: REPORTING_TIMEZONE
      });

      console.log(`[API /api/export-excel] Requested Video ID: ${cleanId} | Title: "${targetVideo.title}" | Views: ${targetVideo.viewCount} | Days: ${targetDaily.length} | Today: ${todayStr} | Channel: ${targetVideo.channelId} | Verified Dataset Used`);
    } else {
      // Fetch genuine video metadata for the requested video from YouTube Data API v3
      if (!apiKey) {
        return res.status(500).json({ error: 'Server-side YOUTUBE_API_KEY environment variable is not configured.' });
      }

      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error(`[API /api/export-excel] YouTube API error for video ${cleanId}: Status ${response.status} - ${data.error?.message}`);
        return res.status(response.status).json({ error: data.error?.message || 'YouTube Data API error' });
      }

      if (!data.items || data.items.length === 0) {
        console.warn(`[API /api/export-excel] Video not found: ${cleanId}`);
        return res.status(404).json({ error: `Video with ID "${cleanId}" not found or is private/deleted.` });
      }

      const item = data.items[0];
      const returnedVideoId = item.id;
      const snippet = item.snippet || {};
      const content = item.contentDetails || {};
      const stats = item.statistics || {};

      console.log(`[API /api/export-excel] Requested Video ID: ${cleanId} | Returned Video ID: ${returnedVideoId} | Channel: "${snippet.channelTitle}" (${snippet.channelId}) | API Status: ${response.status}`);

      if (returnedVideoId !== cleanId) {
        return res.status(400).json({ error: `Video ID mismatch: requested "${cleanId}" but API returned "${returnedVideoId}".` });
      }

      targetVideo = {
        id: item.id,
        title: snippet.title || 'YouTube Video',
        channelId: snippet.channelId || '',
        channelTitle: snippet.channelTitle || 'Unknown Channel',
        publishedAt: snippet.publishedAt,
        duration: content.duration,
        formattedDuration: parseDuration(content.duration),
        viewCount: parseInt(stats.viewCount || 0, 10),
        likeCount: parseInt(stats.likeCount || 0, 10),
        commentCount: parseInt(stats.commentCount || 0, 10),
        statistics: stats
      };

      const publishedAt = targetVideo.publishedAt || new Date().toISOString();
      const todayStr = getCurrentReportingDate(REPORTING_TIMEZONE);
      targetDaily = generateTimelineCalendar({
        publishedAt,
        latestDate: todayStr,
        apiReportRows: [],
        verifiedDailyAnalytics: null,
        isDefaultVideo: false,
        reportingTimezone: REPORTING_TIMEZONE
      });
    }

    const workbook = await generateYouTubeExcelWorkbook({
      videoData: targetVideo,
      dailyData: targetDaily,
      trackedVideosList: [{ videoData: targetVideo, dailyData: targetDaily }]
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `YouTube_Analytics_Report_${cleanId}_${getCurrentReportingDate(REPORTING_TIMEZONE)}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Vercel serverless Excel export error:', error);
    return res.status(500).json({ error: error.message });
  }
}
