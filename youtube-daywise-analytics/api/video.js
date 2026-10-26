/**
 * Vercel Serverless Function: GET /api/video?id=VIDEO_ID
 * Securely proxies YouTube Data API v3 calls using server-side YOUTUBE_API_KEY
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(id.trim())) {
    console.warn(`[API /api/video] Invalid or missing video ID parameter: "${id}"`);
    return res.status(400).json({ error: 'Valid 11-character YouTube Video ID is required.' });
  }

  const cleanId = id.trim();

  if (!apiKey) {
    console.error(`[API /api/video] Server-side YOUTUBE_API_KEY environment variable is not configured.`);
    return res.status(500).json({
      error: 'Server-side YOUTUBE_API_KEY environment variable is not configured.'
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`[API /api/video] YouTube Data API error for video ${cleanId}: Status ${response.status} - ${data.error?.message}`);
      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Data API error'
      });
    }

    if (!data.items || data.items.length === 0) {
      console.warn(`[API /api/video] Video not found: requested video ID "${cleanId}" returned 0 items.`);
      return res.status(404).json({ error: `Video with ID "${cleanId}" was not found or is private/deleted.` });
    }

    const item = data.items[0];
    const returnedVideoId = item.id;
    const channelId = item.snippet?.channelId || 'Unknown';
    const channelTitle = item.snippet?.channelTitle || 'Unknown';

    // Server-side logging without logging API keys (Requirement 8)
    console.log(`[API /api/video] Requested Video ID: ${cleanId} | Returned Video ID: ${returnedVideoId} | Channel: "${channelTitle}" (${channelId}) | API Status: ${response.status}`);

    // Validation: Mismatch check (Requirement 6)
    if (returnedVideoId !== cleanId) {
      console.error(`[API /api/video] Video ID mismatch: requested "${cleanId}" but API returned "${returnedVideoId}"`);
      return res.status(400).json({
        error: `Video ID mismatch: requested "${cleanId}" but API returned "${returnedVideoId}".`
      });
    }

    // Never cache stale dynamic data across different videos; require revalidation
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(200).json(item);
  } catch (error) {
    console.error(`[API /api/video] Server error for video ${cleanId}:`, error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
