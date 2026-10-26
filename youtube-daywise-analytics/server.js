import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateYouTubeExcelWorkbook } from './src/services/excelExportService.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS } from './src/services/dataSnapshot.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// API route: GET /api/video
app.get('/api/video', async (req, res) => {
  const { id } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!id) {
    return res.status(400).json({ error: 'Video ID parameter is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured.' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(id)}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'YouTube Data API error' });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: `Video with ID "${id}" was not found.` });
    }

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.json(data.items[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// API route: GET /api/comments
app.get('/api/comments', async (req, res) => {
  const { videoId } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!videoId) {
    return res.status(400).json({ error: 'videoId query parameter is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured.' });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${encodeURIComponent(videoId)}&maxResults=100&order=time&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Data API commentThreads error'
      });
    }

    if (!data.items || data.items.length === 0) {
      return res.json([]);
    }

    const comments = data.items.map((item) => {
      const top = item.snippet.topLevelComment.snippet;
      return {
        id: item.id,
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

    return res.json(comments);
  } catch (error) {
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

  const effectiveEndDate = endDate || new Date().toISOString().split('T')[0];
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

// API route: GET /api/export-excel (Downloads formatted .xlsx report)
app.get('/api/export-excel', async (req, res) => {
  try {
    const { videoId } = req.query;
    const targetVideo = VERIFIED_VIDEO_METADATA;
    const targetDaily = VERIFIED_DAILY_ANALYTICS;

    const workbook = await generateYouTubeExcelWorkbook({
      videoData: targetVideo,
      dailyData: targetDaily,
      trackedVideosList: [{ videoData: targetVideo, dailyData: targetDaily }]
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `YouTube_Analytics_Report_${videoId || 'CobjbCF-Rvw'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
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
