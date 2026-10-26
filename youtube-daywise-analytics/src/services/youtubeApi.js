/**
 * Service to interface with YouTube Data API v3 and YouTube Analytics API v2.
 */

// Helper to extract video ID from various YouTube URL formats
export function extractVideoId(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim();
  if (!clean) return null;

  // Direct 11-character video ID (e.g. CobjbCF-Rvw, jNQXAC9IVRw, dQw4w9WgXcQ)
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // Handle youtu.be/ID (with optional query parameters like ?t=30s, ?si=...)
  const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/watch?v=ID (or &v=ID with additional parameters before/after)
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/shorts/ID
  const shortsMatch = clean.match(/(?:youtube\.com|m\.youtube\.com)\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Handle youtube.com/embed/ID
  const embedMatch = clean.match(/(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Handle youtube.com/live/ID
  const liveMatch = clean.match(/(?:youtube\.com|m\.youtube\.com)\/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch) return liveMatch[1];

  // Handle youtube.com/v/ID
  const vMatch = clean.match(/(?:youtube\.com|m\.youtube\.com)\/v\/([a-zA-Z0-9_-]{11})/);
  if (vMatch) return vMatch[1];

  // General fallback regex matching any youtube URL with an 11-char ID
  const generalMatch = clean.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?/\s]{11})/);
  if (generalMatch && /^[a-zA-Z0-9_-]{11}$/.test(generalMatch[1])) {
    return generalMatch[1];
  }

  return null;
}

// Helper to extract channel handle or ID
export function extractChannelIdentifier(input) {
  if (!input) return null;
  const clean = input.trim();

  // Handle @handle
  if (clean.startsWith('@')) return clean;

  // Handle URL with /@handle
  const handleMatch = clean.match(/youtube\.com\/(@[a-zA-Z0-9_.-]+)/);
  if (handleMatch) return handleMatch[1];

  // Handle URL with /channel/UC...
  const channelMatch = clean.match(/youtube\.com\/channel\/(UC[a-zA-Z0-9_-]+)/);
  if (channelMatch) return channelMatch[1];

  // Raw channel ID
  if (/^UC[a-zA-Z0-9_-]{20,}$/.test(clean)) {
    return clean;
  }

  return clean;
}

// Convert ISO 8601 duration (e.g. PT36M9S) into human readable string
export function parseDuration(durationStr) {
  if (!durationStr) return '0:00';
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return durationStr;

  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

/**
 * Convert ISO 8601 duration string to total seconds
 */
export function parseDurationToSeconds(durationStr) {
  if (!durationStr) return 180;
  if (typeof durationStr === 'number') return durationStr;
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 180;

  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Fetch public video information & lifetime statistics from YouTube Data API v3
 */
export async function fetchVideoDetails(videoId, apiKey) {
  if (!videoId) throw new Error('Video ID is required.');

  let item = null;

  // 1. Try server backend proxy endpoint first (/api/video?id=...)
  // This bypasses client-side browser ad-blockers, CORS restrictions, and client API quota limits
  try {
    const backendRes = await fetch(`/api/video?id=${encodeURIComponent(videoId)}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (backendRes.ok) {
      const backendData = await backendRes.json();
      if (backendData && (backendData.id || backendData.items)) {
        item = backendData.items ? backendData.items[0] : backendData;
      }
    }
  } catch (backendErr) {
    // If backend proxy is not reachable, continue to direct YouTube API
  }

  // 2. Fallback to direct YouTube Data API v3 query if backend proxy didn't return item
  if (!item) {
    if (!apiKey) throw new Error('YouTube API Key is missing. Please provide a valid API key.');

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(apiKey)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error?.message || `YouTube API returned status ${response.status}`;
        if (data.error?.code === 400 && data.error?.message?.includes('API key not valid')) {
          throw new Error('The provided YouTube API Key is invalid or expired.');
        }
        if (data.error?.code === 403) {
          throw new Error(`YouTube API quota exceeded or access forbidden: ${errorMsg}`);
        }
        throw new Error(errorMsg);
      }

      if (!data.items || data.items.length === 0) {
        throw new Error(`No YouTube video found with ID "${videoId}". Please check the URL.`);
      }

      item = data.items[0];
    } catch (directErr) {
      console.error('fetchVideoDetails direct YouTube API error:', directErr);
      throw directErr;
    }
  }

  const snippet = item.snippet || {};
  const content = item.contentDetails || {};
  const stats = item.statistics || {};
  const rawViewCount = stats.viewCount !== undefined ? String(stats.viewCount) : '0';
  const parsedViewCount = parseInt(rawViewCount, 10) || 0;

  return {
    id: item.id,
    title: snippet.title || 'Untitled Video',
    description: snippet.description || '',
    publishedAt: snippet.publishedAt,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle || 'Unknown Channel',
    thumbnails: snippet.thumbnails || {},
    bestThumbnailUrl: snippet.thumbnails?.maxres?.url || 
                       snippet.thumbnails?.standard?.url || 
                       snippet.thumbnails?.high?.url || 
                       snippet.thumbnails?.medium?.url || 
                       snippet.thumbnails?.default?.url,
    duration: content.duration,
    formattedDuration: parseDuration(content.duration),
    viewCount: parsedViewCount,
    likeCount: parseInt(stats.likeCount || 0, 10),
    commentCount: parseInt(stats.commentCount || 0, 10),
    favoriteCount: parseInt(stats.favoriteCount || 0, 10),
    statistics: {
      viewCount: rawViewCount,
      likeCount: String(stats.likeCount || 0),
      commentCount: String(stats.commentCount || 0),
      favoriteCount: String(stats.favoriteCount || 0)
    },
    lastFetchedAt: new Date().toISOString(),
    isLive: snippet.liveBroadcastContent === 'live',
    defaultLanguage: snippet.defaultLanguage || snippet.defaultAudioLanguage || 'Unknown'
  };
}

/**
 * Fetch channel details from YouTube Data API v3
 */
export async function fetchChannelDetails(channelIdOrHandle, apiKey) {
  if (!channelIdOrHandle || !apiKey) return null;

  try {
    let url = '';
    if (channelIdOrHandle.startsWith('@')) {
      url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${encodeURIComponent(channelIdOrHandle)}&key=${encodeURIComponent(apiKey)}`;
    } else {
      url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${encodeURIComponent(channelIdOrHandle)}&key=${encodeURIComponent(apiKey)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (response.ok && data.items && data.items.length > 0) {
      const channel = data.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        customUrl: channel.snippet.customUrl,
        avatar: channel.snippet.thumbnails?.default?.url || channel.snippet.thumbnails?.medium?.url,
        subscriberCount: parseInt(channel.statistics?.subscriberCount || 0, 10),
        videoCount: parseInt(channel.statistics?.videoCount || 0, 10)
      };
    }
  } catch (e) {
    console.warn('Could not fetch channel details:', e);
  }
  return null;
}

/**
 * Query YouTube Analytics API v2 for day-wise time-series reports
 * Requires OAuth 2.0 Access Token with 'https://www.googleapis.com/auth/yt-analytics.readonly'
 */
export async function fetchYouTubeAnalyticsReport({
  videoId,
  channelId = 'MINE',
  startDate,
  endDate,
  accessToken
}) {
  if (!accessToken) {
    throw new Error('Google OAuth 2.0 Access Token is required to query the YouTube Analytics API.');
  }
  if (!videoId) {
    throw new Error('Video ID is required.');
  }

  // Default to today if endDate not specified
  const effectiveEndDate = endDate || new Date().toISOString().split('T')[0];
  const effectiveStartDate = startDate || '2026-10-17';

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

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || `YouTube Analytics API Error (${response.status})`;
    if (response.status === 401) {
      throw new Error('OAuth token has expired or is invalid. Please sign in again.');
    }
    if (response.status === 403) {
      throw new Error('Access Denied: You must be the owner or authorized manager of this YouTube channel to access private daily analytics.');
    }
    throw new Error(errorMsg);
  }

  if (!data.rows || data.rows.length === 0) {
    return [];
  }

  // Map columns to typed daily objects
  const colNames = (data.columnHeaders || []).map(h => h.name);
  const dayIdx = colNames.indexOf('day');
  const viewsIdx = colNames.indexOf('views');
  const watchTimeIdx = colNames.indexOf('estimatedMinutesWatched');
  const durationIdx = colNames.indexOf('averageViewDuration');
  const likesIdx = colNames.indexOf('likes');
  const commentsIdx = colNames.indexOf('comments');
  const sharesIdx = colNames.indexOf('shares');
  const subsGainedIdx = colNames.indexOf('subscribersGained');
  const subsLostIdx = colNames.indexOf('subscribersLost');

  let runningCumulativeViews = 0;
  let runningCumulativeLikes = 0;
  let runningCumulativeComments = 0;

  const today = new Date().toISOString().split('T')[0];

  return data.rows.map((row, index) => {
    const dateStr = row[dayIdx];
    const views = parseInt(row[viewsIdx] || 0, 10);
    const watchMinutes = parseFloat(row[watchTimeIdx] || 0);
    const avgDuration = parseInt(row[durationIdx] || 0, 10);
    const likes = parseInt(row[likesIdx] || 0, 10);
    const comments = parseInt(row[commentsIdx] || 0, 10);
    const shares = parseInt(row[sharesIdx] || 0, 10);
    const subsGained = parseInt(row[subsGainedIdx] || 0, 10);
    const subsLost = parseInt(row[subsLostIdx] || 0, 10);

    runningCumulativeViews += views;
    runningCumulativeLikes += likes;
    runningCumulativeComments += comments;

    // Check if within YouTube 24-48h processing lag window
    const dateObj = new Date(dateStr);
    const todayObj = new Date(today);
    const diffDays = Math.round((todayObj - dateObj) / (1000 * 60 * 60 * 24));
    const isPendingProcessing = diffDays <= 1;

    return {
      date: dateStr,
      dayIndex: index + 1,
      dayLabel: `Day ${index + 1}`,
      views,
      cumulativeViews: runningCumulativeViews,
      likes,
      cumulativeLikes: runningCumulativeLikes,
      comments,
      cumulativeComments: runningCumulativeComments,
      estimatedMinutesWatched: Math.round(watchMinutes),
      averageViewDurationSeconds: avgDuration,
      shares,
      subscribersGained: subsGained,
      subscribersLost: subsLost,
      netSubscribers: subsGained - subsLost,
      isPendingProcessing,
      status: isPendingProcessing ? 'Processing' : 'Finalized',
      latencyNote: isPendingProcessing
        ? 'Pending YouTube Analytics Rollup (24-48h Processing Delay)'
        : 'Finalized by YouTube Analytics'
    };
  });
}

/**
 * Official YouTube API evaluation for individual viewer email addresses:
 * 
 * - YouTube Data API v3 does not expose viewer email addresses.
 * - YouTube Analytics API v2 dimensions are strictly aggregated (e.g. day, country, age group).
 * - Channel-owner OAuth 2.0 authorization grants access ONLY to the owner's own data and aggregated analytics.
 *   Under Google's Terms of Service and privacy policies, viewer identities and email addresses are never disclosed.
 * - Authorized compliant solution: Voluntary opt-in via Google Forms or Google Sheets.
 */
export function checkViewerEmailApiSupport() {
  return {
    isSupportedByYouTubeApi: false,
    reason:
      'Official YouTube APIs (Data API v3 & Analytics API v2) provide aggregated metrics only. Individual viewer identities and email addresses are never exposed by Google under any OAuth scope.',
    recommendedAlternative:
      'Creators can place a voluntary Google Form opt-in link in the video description or pinned comment, then connect the Google Sheet responses.',
    officialDocsUrl: 'https://developers.google.com/youtube/analytics/data_model'
  };
}

/**
 * Fetch genuine YouTube comments for a video via YouTube Data API v3
 * Filters and maps to commenter name, profile image, comment text, and published timestamp.
 */
export async function fetchVideoComments(videoId, apiKey) {
  if (!videoId) return { comments: [], commentsDisabled: false };

  // 1. Try secure backend proxy endpoint first (/api/comments?videoId=...)
  // Keeps YouTube API key hidden securely on server side
  try {
    const backendRes = await fetch(`/api/comments?videoId=${encodeURIComponent(videoId)}`, {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (backendRes.ok) {
      const backendData = await backendRes.json();
      if (backendData && backendData.commentsDisabled) {
        return { comments: [], commentsDisabled: true };
      }
      if (Array.isArray(backendData)) {
        return { comments: backendData, commentsDisabled: false };
      }
    }
  } catch (backendErr) {
    // If backend proxy not reachable, continue to direct if apiKey provided
  }

  if (!apiKey) return { comments: [], commentsDisabled: false };

  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${encodeURIComponent(videoId)}&maxResults=100&order=time&key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const isCommentsDisabled =
        data.error?.errors?.[0]?.reason === 'commentsDisabled' ||
        (typeof data.error?.message === 'string' && data.error.message.toLowerCase().includes('disabled comments'));

      if (isCommentsDisabled) {
        return { comments: [], commentsDisabled: true };
      }

      console.warn('YouTube commentThreads API returned:', data.error?.message);
      return { comments: [], commentsDisabled: false, error: data.error?.message };
    }

    if (!data.items || data.items.length === 0) {
      return { comments: [], commentsDisabled: false };
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

    return { comments, commentsDisabled: false };
  } catch (err) {
    console.warn('Network error fetching YouTube comments:', err);
    return { comments: [], commentsDisabled: false };
  }
}

/**
 * Fetches the exact, current video title directly from the YouTube Data API v3
 * using videos.list with part=snippet.
 * Uses snippet.title directly. Never uses filenames, channel names, descriptions, or placeholders.
 * Returns 'Title unavailable' on API error or unavailable video.
 */
export async function fetchVideoTitleDirect(videoId, apiKey) {
  if (!videoId || typeof videoId !== 'string' || videoId.trim() === '') {
    return 'Title unavailable';
  }

  const cleanId = videoId.trim();
  const key = apiKey || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_YOUTUBE_API_KEY) || 
    (typeof process !== 'undefined' && process.env?.YOUTUBE_API_KEY) || 
    '';

  // 1. Try server backend proxy endpoint first (/api/video?id=...)
  if (typeof window !== 'undefined' && window.location) {
    try {
      const backendRes = await fetch(`/api/video?id=${encodeURIComponent(cleanId)}`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' }
      });
      if (backendRes.ok) {
        const backendData = await backendRes.json();
        const snippet = backendData?.snippet || backendData?.items?.[0]?.snippet;
        if (snippet && typeof snippet.title === 'string' && snippet.title.trim() !== '') {
          return snippet.title.trim();
        }
      }
    } catch {
      // Continue to direct YouTube API query
    }
  }

  // 2. Direct YouTube Data API v3 query: videos?part=snippet&id=...
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(cleanId)}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[YouTube Data API v3] HTTP ${res.status} when fetching title for video "${cleanId}".`);
      return 'Title unavailable';
    }
    const data = await res.json();
    if (!data.items || data.items.length === 0) {
      console.warn(`[YouTube Data API v3] No video items found for video ID "${cleanId}".`);
      return 'Title unavailable';
    }
    const title = data.items[0]?.snippet?.title;
    if (typeof title === 'string' && title.trim() !== '') {
      return title.trim();
    }
    return 'Title unavailable';
  } catch (err) {
    console.warn(`[YouTube Data API v3] Exception fetching title for video "${cleanId}":`, err.message);
    return 'Title unavailable';
  }
}

/**
 * Batch fetches exact, current video titles directly from YouTube Data API v3
 * using videos.list with part=snippet for multiple video IDs.
 * Returns a Map of videoId -> snippet.title (or 'Title unavailable').
 */
export async function fetchVideoTitlesBatch(videoIds = [], apiKey) {
  const titleMap = new Map();
  if (!videoIds || videoIds.length === 0) return titleMap;

  const validIds = [...new Set(videoIds.filter(id => id && typeof id === 'string' && id.trim() !== ''))];
  if (validIds.length === 0) return titleMap;

  const key = apiKey || 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_YOUTUBE_API_KEY) || 
    (typeof process !== 'undefined' && process.env?.YOUTUBE_API_KEY) || 
    '';

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(validIds.join(','))}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          const id = item.id;
          const title = item.snippet?.title;
          if (id && typeof title === 'string' && title.trim() !== '') {
            titleMap.set(id, title.trim());
          }
        }
      }
    }
  } catch (err) {
    console.warn('[YouTube Data API v3] Batch title fetch error:', err.message);
  }

  // Ensure every requested ID has an entry; assign 'Title unavailable' for any unfetched
  for (const id of validIds) {
    if (!titleMap.has(id)) {
      titleMap.set(id, 'Title unavailable');
    }
  }

  return titleMap;
}

/**
 * Generates the complete day-wise timeline starting from the video's original publication date
 * through the latest available analytics date.
 * 
 * - Starts at snippet.publishedAt (Day 1)
 * - Numbers dates sequentially: Day 1, Day 2, Day 3 ... Day N
 * - Integrates genuine authorized YouTube Analytics API v2 report data when available
 * - For dates/videos without channel authorization, marks daily metrics as null / N/A without fabricating values
 * - Preserves verified daily dataset for default initial video (CobjbCF-Rvw)
 */
export function generateTimelineCalendar({
  publishedAt,
  latestDate,
  apiReportRows = [],
  verifiedDailyAnalytics = null,
  isDefaultVideo = false
}) {
  if (!publishedAt) return [];

  // Extract clean YYYY-MM-DD from publication date
  const cleanPubDate = publishedAt.split('T')[0];
  const todayStr = latestDate || new Date().toISOString().split('T')[0];

  const startDate = new Date(cleanPubDate + 'T00:00:00Z');
  const endDate = new Date(todayStr + 'T00:00:00Z');

  // If published date is in the future for any reason, clamp to today
  const effectiveStart = startDate > endDate ? endDate : startDate;

  // Build lookup maps for fast access
  const apiMap = new Map();
  if (Array.isArray(apiReportRows) && apiReportRows.length > 0) {
    for (const row of apiReportRows) {
      if (row.date) {
        apiMap.set(row.date, row);
      }
    }
  }

  const verifiedMap = new Map();
  if (isDefaultVideo && Array.isArray(verifiedDailyAnalytics)) {
    for (const row of verifiedDailyAnalytics) {
      if (row.date) {
        verifiedMap.set(row.date, row);
      }
    }
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeline = [];

  let current = new Date(effectiveStart);
  let dayIdx = 1;
  let prevViews = null;
  let runningCumulativeViews = 0;

  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    const dayName = dayNames[current.getUTCDay()];

    const apiRow = apiMap.get(dateStr);
    const verifiedRow = verifiedMap.get(dateStr);

    let views = null;
    let likes = null;
    let shares = null;
    let comments = null;
    let estimatedMinutesWatched = null;
    let averageViewDurationSeconds = null;
    let averageViewPercentage = null;
    let subscribersGained = null;
    let subscribersLost = null;
    let netSubscribers = null;
    let isUnavailable = true;
    let status = 'Unavailable (Requires Channel OAuth)';
    let latencyNote = 'Historical daily breakdown protected by YouTube Analytics API (Requires Channel Owner OAuth)';

    if (apiRow) {
      isUnavailable = false;
      views = apiRow.views !== undefined && apiRow.views !== null ? Number(apiRow.views) : null;
      likes = apiRow.likes !== undefined && apiRow.likes !== null ? Number(apiRow.likes) : null;
      shares = apiRow.shares !== undefined && apiRow.shares !== null ? Number(apiRow.shares) : null;
      comments = apiRow.comments !== undefined && apiRow.comments !== null ? Number(apiRow.comments) : null;
      estimatedMinutesWatched = apiRow.estimatedMinutesWatched !== undefined && apiRow.estimatedMinutesWatched !== null ? Number(apiRow.estimatedMinutesWatched) : null;
      averageViewDurationSeconds = apiRow.averageViewDurationSeconds !== undefined && apiRow.averageViewDurationSeconds !== null ? Number(apiRow.averageViewDurationSeconds) : null;
      averageViewPercentage = apiRow.averageViewPercentage !== undefined && apiRow.averageViewPercentage !== null ? Number(apiRow.averageViewPercentage) : null;
      subscribersGained = apiRow.subscribersGained !== undefined && apiRow.subscribersGained !== null ? Number(apiRow.subscribersGained) : null;
      subscribersLost = apiRow.subscribersLost !== undefined && apiRow.subscribersLost !== null ? Number(apiRow.subscribersLost) : null;
      netSubscribers = apiRow.netSubscribers !== undefined && apiRow.netSubscribers !== null ? Number(apiRow.netSubscribers) : (subscribersGained !== null && subscribersLost !== null ? subscribersGained - subscribersLost : null);
      status = apiRow.status || 'Finalized';
      latencyNote = apiRow.latencyNote || 'Authorized YouTube Analytics API v2';
    } else if (verifiedRow) {
      isUnavailable = false;
      views = verifiedRow.views !== undefined && verifiedRow.views !== null ? Number(verifiedRow.views) : null;
      likes = verifiedRow.likes !== undefined && verifiedRow.likes !== null ? Number(verifiedRow.likes) : null;
      shares = verifiedRow.shares !== undefined && verifiedRow.shares !== null ? Number(verifiedRow.shares) : null;
      comments = verifiedRow.comments !== undefined && verifiedRow.comments !== null ? Number(verifiedRow.comments) : null;
      estimatedMinutesWatched = verifiedRow.estimatedMinutesWatched !== undefined && verifiedRow.estimatedMinutesWatched !== null ? Number(verifiedRow.estimatedMinutesWatched) : null;
      averageViewDurationSeconds = verifiedRow.averageViewDurationSeconds !== undefined && verifiedRow.averageViewDurationSeconds !== null ? Number(verifiedRow.averageViewDurationSeconds) : null;
      averageViewPercentage = verifiedRow.averageViewPercentage !== undefined && verifiedRow.averageViewPercentage !== null ? Number(verifiedRow.averageViewPercentage) : null;
      subscribersGained = verifiedRow.subscribersGained !== undefined && verifiedRow.subscribersGained !== null ? Number(verifiedRow.subscribersGained) : null;
      subscribersLost = verifiedRow.subscribersLost !== undefined && verifiedRow.subscribersLost !== null ? Number(verifiedRow.subscribersLost) : null;
      netSubscribers = verifiedRow.netSubscribers !== undefined && verifiedRow.netSubscribers !== null ? Number(verifiedRow.netSubscribers) : null;
      status = verifiedRow.status || 'Finalized';
      latencyNote = verifiedRow.latencyNote || 'Verified Analytics Dataset';
    }

    let growthRate = null;
    if (views !== null && prevViews !== null && prevViews > 0) {
      growthRate = Number((((views - prevViews) / prevViews) * 100).toFixed(2));
    }
    if (views !== null) {
      prevViews = views;
      runningCumulativeViews += views;
    }

    const dayLabel = dayIdx === 1 ? 'Day 1 (Launch)' : `Day ${dayIdx}`;

    timeline.push({
      date: dateStr,
      dayIndex: dayIdx,
      dayLabel,
      dayName,
      views,
      cumulativeViews: views !== null ? runningCumulativeViews : null,
      likes,
      shares,
      comments,
      estimatedMinutesWatched,
      averageViewDurationSeconds,
      averageViewPercentage,
      subscribersGained,
      subscribersLost,
      netSubscribers,
      growthRate,
      isUnavailable,
      status,
      latencyNote
    });

    current.setUTCDate(current.getUTCDate() + 1);
    dayIdx++;
  }

  return timeline;
}


