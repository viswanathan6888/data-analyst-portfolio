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

  if (!id) {
    return res.status(400).json({ error: 'Video ID parameter is required.' });
  }

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server-side YOUTUBE_API_KEY environment variable is not configured.'
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(id)}&key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Data API error'
      });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: `Video with ID "${id}" was not found.` });
    }

    return res.status(200).json(data.items[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
