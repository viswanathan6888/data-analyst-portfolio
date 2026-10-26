/**
 * Vercel Serverless Function: GET /api/comments?videoId=VIDEO_ID
 * Securely proxies YouTube commentThreads API requests using server-side YOUTUBE_API_KEY
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

  const { videoId } = req.query;
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;

  if (!videoId || typeof videoId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(videoId.trim())) {
    return res.status(400).json({ error: 'Valid 11-character videoId query parameter is required.' });
  }

  const cleanVideoId = videoId.trim();

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server-side YOUTUBE_API_KEY environment variable is not configured.'
    });
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
        return res.status(200).json({
          commentsDisabled: true,
          message: 'Comments are disabled for this video.',
          comments: []
        });
      }

      return res.status(response.status).json({
        error: data.error?.message || 'YouTube Data API commentThreads error'
      });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(200).json([]);
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

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
