import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateYouTubeExcelWorkbook } from './src/services/excelExportService.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS, LAST_PROCESSED_DATE } from './src/services/dataSnapshot.js';
import { generateTimelineCalendar, parseDuration, REPORTING_TIMEZONE, getCurrentReportingDate } from './src/services/youtubeApi.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API route: GET /api/video
app.get('/api/video', async (req, res) => {
  const { id } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(id.trim())) {
    console.warn(`[Local Server /api/video] Invalid or missing video ID parameter: "${id}"`);
    return res.status(400).json({ error: 'Valid 11-character YouTube Video ID is required.' });
  }

  const cleanId = id.trim();

  if (!apiKey) {
    console.error(`[Local Server /api/video] YOUTUBE_API_KEY is not configured.`);
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured.' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`[Local Server /api/video] API error for video ${cleanId}: Status ${response.status} - ${data.error?.message}`);
      return res.status(response.status).json({ error: data.error?.message || 'YouTube Data API error' });
    }

    if (!data.items || data.items.length === 0) {
      console.warn(`[Local Server /api/video] Video not found: ${cleanId}`);
      return res.status(404).json({ error: `Video with ID "${cleanId}" was not found or is private/deleted.` });
    }

    const item = data.items[0];
    const returnedVideoId = item.id;
    const channelId = item.snippet?.channelId || 'Unknown';
    const channelTitle = item.snippet?.channelTitle || 'Unknown';

    // Development logging without API keys (Requirement 8)
    console.log(`[Local Server /api/video] Requested Video ID: ${cleanId} | Returned Video ID: ${returnedVideoId} | Channel: "${channelTitle}" (${channelId}) | API Status: ${response.status}`);

    if (returnedVideoId !== cleanId) {
      console.error(`[Local Server /api/video] Mismatch: requested ${cleanId} but API returned ${returnedVideoId}`);
      return res.status(400).json({ error: `Video ID mismatch: requested "${cleanId}" but API returned "${returnedVideoId}".` });
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.json(item);
  } catch (error) {
    console.error(`[Local Server /api/video] Error for video ${cleanId}:`, error);
    return res.status(500).json({ error: error.message });
  }
});

// API route: GET /api/comments
app.get('/api/comments', async (req, res) => {
  const { videoId } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!videoId || typeof videoId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(videoId.trim())) {
    console.warn(`[Local Server /api/comments] Invalid videoId parameter: "${videoId}"`);
    return res.status(400).json({ error: 'Valid 11-character videoId query parameter is required.' });
  }

  const cleanVideoId = videoId.trim();

  if (!apiKey) {
    console.error(`[Local Server /api/comments] YOUTUBE_API_KEY is not configured.`);
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured.' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${encodeURIComponent(cleanVideoId)}&maxResults=100&order=time&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const isCommentsDisabled =
        data.error?.errors?.[0]?.reason === 'commentsDisabled' ||
        (typeof data.error?.message === 'string' && data.error.message.toLowerCase().includes('disabled comments'));

      if (isCommentsDisabled) {
        console.log(`[Local Server /api/comments] Requested Video ID: ${cleanVideoId} | Status: Comments Disabled (HTTP ${response.status})`);
        return res.status(200).json({
          commentsDisabled: true,
          message: 'Comments are disabled for this video.',
          comments: []
        });
      }

      console.error(`[Local Server /api/comments] Error for video ${cleanVideoId}: Status ${response.status} - ${data.error?.message}`);
      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Data API commentThreads error'
      });
    }

    if (!data.items || data.items.length === 0) {
      console.log(`[Local Server /api/comments] Requested Video ID: ${cleanVideoId} | Returned 0 comments | Status: ${response.status}`);
      return res.json([]);
    }

    const comments = data.items.map((item) => {
      const top = item.snippet?.topLevelComment?.snippet || {};
      return {
        id: item.id,
        videoId: item.snippet?.videoId || cleanVideoId,
        authorDisplayName: top.authorDisplayName,
        authorProfileImageUrl: top.authorProfileImageUrl,
        authorChannelUrl: top.authorChannelUrl,
        textDisplay: top.textDisplay,
        textOriginal: top.textOriginal,
        likeCount: top.likeCount || 0,
        publishedAt: top.publishedAt,
        publishedDate: top.publishedAt ? top.publishedAt.split('T')[0] : ''
      };
    }).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const channelId = data.items[0]?.snippet?.channelId || 'N/A';
    console.log(`[Local Server /api/comments] Requested Video ID: ${cleanVideoId} | Channel: ${channelId} | Returned: ${comments.length} comments | Status: ${response.status}`);

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.json(comments);
  } catch (error) {
    console.error(`[Local Server /api/comments] Error for video ${cleanVideoId}:`, error);
    return res.status(500).json({ error: error.message });
  }
});

// API route: GET /api/analytics
app.get('/api/analytics', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authorization header with Bearer token is required for YouTube Analytics API.'
    });
  }

  const { videoId, startDate = '2026-10-17', endDate, channelId = 'MINE' } = req.query;
  if (!videoId) {
    return res.status(400).json({ error: 'videoId query parameter is required.' });
  }

  const effectiveEndDate = endDate || getCurrentReportingDate(REPORTING_TIMEZONE);
  const metrics = 'views,estimatedMinutesWatched,averageViewDuration,likes,comments,shares,subscribersGained,subscribersLost';
  const channelParam = channelId === 'MINE' ? 'channel==MINE' : `channel==${channelId}`;

  const queryParams = new URLSearchParams({
    ids: channelParam,
    startDate: startDate,
    endDate: effectiveEndDate,
    metrics: metrics,
    dimensions: 'day',
    filters: `video==${videoId}`,
    sort: 'day'
  });

  try {
    const url = `https://youtubeanalytics.googleapis.com/v2/reports?${queryParams.toString()}`;
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
        Accept: 'application/json'
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'YouTube Analytics API error' });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// API route: GET /api/analytics-status (Status of date progression and analytics rollup)
app.get('/api/analytics-status', (req, res) => {
  const currentReportingDate = getCurrentReportingDate(REPORTING_TIMEZONE);
  const isTodayProcessed = currentReportingDate <= LAST_PROCESSED_DATE;

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  return res.json({
    currentReportingDate,
    reportingTimezone: REPORTING_TIMEZONE,
    latestAnalyticsDate: LAST_PROCESSED_DATE,
    todayDate: currentReportingDate,
    todayStatus: isTodayProcessed ? 'Finalized' : 'Pending',
    processingDelay: '24-48h YouTube Analytics batch aggregation'
  });
});

// API route: GET /api/export-excel (Downloads formatted .xlsx report)
app.get('/api/export-excel', async (req, res) => {
  try {
    const { videoId } = req.query;

    if (!videoId || typeof videoId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(videoId.trim())) {
      console.warn(`[Local Server /api/export-excel] Invalid or missing videoId query parameter: "${videoId}"`);
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
          console.warn('[Local Server /api/export-excel] Live stats fetch fallback:', fetchErr);
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

      console.log(`[Local Server /api/export-excel] Requested Video ID: ${cleanId} | Title: "${targetVideo.title}" | Views: ${targetVideo.viewCount} | Days: ${targetDaily.length} | Today: ${todayStr} | Channel: ${targetVideo.channelId} | Verified Dataset Used`);
    } else {
      // Fetch genuine video metadata for the requested video from YouTube Data API v3
      if (!apiKey) {
        return res.status(500).json({ error: 'Server-side YOUTUBE_API_KEY environment variable is not configured.' });
      }

      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error(`[Local Server /api/export-excel] YouTube API error for video ${cleanId}: Status ${response.status} - ${data.error?.message}`);
        return res.status(response.status).json({ error: data.error?.message || 'YouTube Data API error' });
      }

      if (!data.items || data.items.length === 0) {
        console.warn(`[Local Server /api/export-excel] Video not found: ${cleanId}`);
        return res.status(404).json({ error: `Video with ID "${cleanId}" not found or is private/deleted.` });
      }

      const item = data.items[0];
      const returnedVideoId = item.id;
      const snippet = item.snippet || {};
      const content = item.contentDetails || {};
      const stats = item.statistics || {};

      console.log(`[Local Server /api/export-excel] Requested Video ID: ${cleanId} | Returned Video ID: ${returnedVideoId} | Channel: "${snippet.channelTitle}" (${snippet.channelId}) | API Status: ${response.status}`);

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
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Server Excel export error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Serve frontend static build in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`YouTube Day-Wise Analytics server running on http://localhost:${PORT}`);
});
