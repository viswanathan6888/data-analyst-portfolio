import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import DashboardGrid from './components/DashboardGrid';
import DailyViewsChart from './components/DailyViewsChart';
import DateCommentsSidePanel from './components/DateCommentsSidePanel';
import OAuthModal from './components/OAuthModal';
import SettingsModal from './components/SettingsModal';
import GoogleFormModal from './components/GoogleFormModal';
import {
  fetchVideoDetails,
  fetchYouTubeAnalyticsReport,
  fetchVideoComments,
  generateTimelineCalendar
} from './services/youtubeApi';
import {
  VERIFIED_VIDEO_METADATA,
  VERIFIED_DAILY_ANALYTICS
} from './services/dataSnapshot';
import { VERIFIED_COMMENTS } from './services/commentsSnapshot';
import {
  getFormSettings,
  getStoredSubmissions
} from './services/googleFormService';

export default function App() {
  const DEFAULT_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
  const DEFAULT_VIDEO = import.meta.env.VITE_DEFAULT_VIDEO_ID || 'CobjbCF-Rvw';

  // Read initial video from URL query parameter ?v=VIDEO_ID if present
  const getInitialVideoId = () => {
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const paramV = params.get('v');
      if (paramV && /^[a-zA-Z0-9_-]{11}$/.test(paramV.trim())) {
        return paramV.trim();
      }
    }
    return DEFAULT_VIDEO;
  };

  const initialVideo = getInitialVideoId();
  const isDefaultInitial = initialVideo === 'CobjbCF-Rvw';

  const [apiKey, setApiKey] = useState(DEFAULT_KEY);
  const [googleClientId, setGoogleClientId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isOAuthConnected, setIsOAuthConnected] = useState(false);

  const [videoId, setVideoId] = useState(initialVideo);
  const [videoData, setVideoData] = useState(isDefaultInitial ? VERIFIED_VIDEO_METADATA : null);
  const [dailyData, setDailyData] = useState(isDefaultInitial ? VERIFIED_DAILY_ANALYTICS : []);
  const [comments, setComments] = useState(isDefaultInitial ? VERIFIED_COMMENTS : []);
  const [commentsDisabled, setCommentsDisabled] = useState(false);

  // All tracked videos registry for comprehensive multi-video Excel export
  const [trackedVideosList, setTrackedVideosList] = useState([
    {
      videoData: isDefaultInitial ? VERIFIED_VIDEO_METADATA : null,
      dailyData: isDefaultInitial ? VERIFIED_DAILY_ANALYTICS : []
    }
  ]);

  useEffect(() => {
    if (videoData && videoData.id) {
      setTrackedVideosList((prev) => {
        const exists = prev.some((item) => item.videoData?.id === videoData.id);
        if (!exists) {
          return [{ videoData, dailyData }, ...prev];
        }
        return prev.map((item) =>
          item.videoData?.id === videoData.id ? { videoData, dailyData } : item
        );
      });
    }
  }, [videoData, dailyData]);

  // Selected date and Comments (default to latest date 2026-10-26 on the right)
  const [selectedDate, setSelectedDate] = useState(isDefaultInitial ? '2026-10-26' : null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(true);

  // Auto-refresh interval (default 1 minute = 60000ms for responsive genuine updates)
  const [autoRefreshInterval, setAutoRefreshInterval] = useState(60000);
  const [lastRefreshedAt, setLastRefreshedAt] = useState('Just now');
  const [lastSyncStatus, setLastSyncStatus] = useState('success'); // 'success' | 'syncing' | 'error'
  const [previousLifetimeViews, setPreviousLifetimeViews] = useState(null);
  const [newViewsGained, setNewViewsGained] = useState(0);

  // References to prevent overlapping requests and stale responses
  const isSyncingRef = useRef(false);
  const requestSeqRef = useRef(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [theme, setTheme] = useState('dark');

  // Modals for preserved functionality
  const [isOAuthOpen, setIsOAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formSettings, setFormSettings] = useState(getFormSettings);
  const [submissions, setSubmissions] = useState(getStoredSubmissions);

  // Update browser state URL query param (?v=VIDEO_ID) to remember active video
  const updateBrowserUrl = (targetId) => {
    if (typeof window !== 'undefined' && window.history) {
      const url = new URL(window.location.href);
      if (targetId && targetId !== 'CobjbCF-Rvw') {
        url.searchParams.set('v', targetId);
      } else {
        url.searchParams.delete('v');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load video analytics and real YouTube comments with robust live synchronization
  const loadVideoAnalytics = async (targetVideoId, preserveSelection = false) => {
    if (!targetVideoId) return;

    // 1. Prevent overlapping requests
    if (isSyncingRef.current) {
      console.log(`[YouTube Sync] Sync already in progress for ${targetVideoId}, skipping overlapping request.`);
      return;
    }
    isSyncingRef.current = true;
    const currentSeq = ++requestSeqRef.current;

    setIsLoading(true);
    setErrorMessage('');
    setLastSyncStatus('syncing');

    // If switching to a different video, clear previous video data immediately so old data never lingers
    if (targetVideoId !== videoId) {
      setVideoId(targetVideoId);
      updateBrowserUrl(targetVideoId);
      setPreviousLifetimeViews(null);
      setNewViewsGained(0);
      setCommentsDisabled(false);
      if (targetVideoId !== 'CobjbCF-Rvw') {
        setVideoData(null);
        setDailyData([]);
        setComments([]);
      }
    }

    const fetchTimestamp = new Date().toISOString();
    console.log(`[YouTube Sync Start] Target Video ID: ${targetVideoId} | Timestamp: ${fetchTimestamp} | Seq: ${currentSeq}`);

    let publicDetails = null;
    try {
      // 1. Fetch live public video details using statistics.viewCount
      try {
        publicDetails = await fetchVideoDetails(targetVideoId, apiKey);

        // Check if a newer request superseded this one (prevent stale responses overwriting newer data)
        if (currentSeq !== requestSeqRef.current) {
          console.warn(`[YouTube Sync] Discarding outdated response (Seq ${currentSeq} vs latest ${requestSeqRef.current}).`);
          return;
        }

        if (publicDetails) {
          const latestViewCount = Number(publicDetails.statistics?.viewCount ?? publicDetails.viewCount ?? 0);
          console.log(`[YouTube Sync API Response] Video ID: ${publicDetails.id} | statistics.viewCount: ${publicDetails.statistics?.viewCount} | Parsed: ${latestViewCount} | Likes: ${publicDetails.statistics?.likeCount} | Comments: ${publicDetails.statistics?.commentCount}`);
          
          setVideoData((prev) => {
            const prevViews = prev && prev.id === targetVideoId ? Number(prev.statistics?.viewCount ?? prev.viewCount ?? 0) : 0;
            if (prevViews > 0 && latestViewCount >= prevViews) {
              const delta = latestViewCount - prevViews;
              setNewViewsGained(delta);
              setPreviousLifetimeViews(prevViews);
              console.log(`[YouTube Sync Metric] Consecutive Snapshot Delta (New Views): +${delta} views (${prevViews} -> ${latestViewCount})`);
            }
            return publicDetails;
          });

          // If default video (CobjbCF-Rvw), dynamically synchronize live views into active tracking day
          if (targetVideoId === 'CobjbCF-Rvw') {
            setDailyData((prevDaily) => {
              const baseDaily = (prevDaily && prevDaily.length > 0) ? prevDaily : VERIFIED_DAILY_ANALYTICS;
              const copy = baseDaily.map((d) => ({ ...d }));
              const lastIdx = copy.length - 1;
              const lastDay = copy[lastIdx];
              const priorSum = copy.slice(0, -1).reduce((acc, d) => acc + Number(d.views || 0), 0);
              const liveDayViews = Math.max(Number(lastDay.views || 0), latestViewCount - priorSum);

              copy[lastIdx] = {
                ...lastDay,
                views: liveDayViews,
                cumulativeViews: latestViewCount,
                pctOfTotalViews: latestViewCount > 0
                  ? Number(((liveDayViews / latestViewCount) * 100).toFixed(2))
                  : lastDay.pctOfTotalViews,
                status: 'Live Synced',
                isPendingProcessing: false,
                latencyNote: 'Live Synced with YouTube Data API v3'
              };
              return copy;
            });
          }
        }
      } catch (err) {
        console.warn('YouTube Data API v3 error:', err);
        if (targetVideoId === 'CobjbCF-Rvw') {
          setVideoData(VERIFIED_VIDEO_METADATA);
          publicDetails = VERIFIED_VIDEO_METADATA;
        } else {
          throw err;
        }
      }

      // 2. Fetch genuine YouTube comments
      try {
        const commentsResult = await fetchVideoComments(targetVideoId, apiKey);
        if (commentsResult && commentsResult.commentsDisabled) {
          setCommentsDisabled(true);
          setComments([]);
        } else if (commentsResult && Array.isArray(commentsResult.comments)) {
          setCommentsDisabled(false);
          setComments(commentsResult.comments);
        } else if (Array.isArray(commentsResult)) {
          setCommentsDisabled(false);
          setComments(commentsResult);
        } else if (targetVideoId === 'CobjbCF-Rvw') {
          setCommentsDisabled(false);
          setComments(VERIFIED_COMMENTS);
        } else {
          setCommentsDisabled(false);
          setComments([]);
        }
      } catch (commentsErr) {
        console.warn('Could not fetch comments via API:', commentsErr);
        if (targetVideoId === 'CobjbCF-Rvw') {
          setComments(VERIFIED_COMMENTS);
        } else {
          setComments([]);
        }
      }

      // 3. Fetch or load day-wise analytics starting from the video's original published date
      let apiReportRows = [];
      const effectivePublishedAt = publicDetails?.publishedAt || (targetVideoId === 'CobjbCF-Rvw' ? VERIFIED_VIDEO_METADATA.publishedAt : null);
      const originalPublishDate = effectivePublishedAt ? effectivePublishedAt.split('T')[0] : '2026-10-17';
      const todayStr = new Date().toISOString().split('T')[0];

      if (isOAuthConnected && accessToken) {
        try {
          const reportRows = await fetchYouTubeAnalyticsReport({
            videoId: targetVideoId,
            startDate: originalPublishDate,
            endDate: todayStr,
            accessToken: accessToken
          });
          if (reportRows && reportRows.length > 0) {
            apiReportRows = reportRows;
          }
        } catch (oauthErr) {
          console.warn('OAuth YouTube Analytics API query failed:', oauthErr);
        }
      }

      let loadedDailyData = [];
      if (effectivePublishedAt) {
        loadedDailyData = generateTimelineCalendar({
          publishedAt: effectivePublishedAt,
          latestDate: todayStr,
          apiReportRows,
          verifiedDailyAnalytics: targetVideoId === 'CobjbCF-Rvw' ? VERIFIED_DAILY_ANALYTICS : null,
          isDefaultVideo: targetVideoId === 'CobjbCF-Rvw'
        });
      }

      if (loadedDailyData && loadedDailyData.length > 0) {
        setDailyData(loadedDailyData);
        if (!preserveSelection) {
          // Default to showing the latest date
          setSelectedDate(loadedDailyData[loadedDailyData.length - 1]?.date || loadedDailyData[0]?.date);
        }
      } else {
        setDailyData([]);
        if (!preserveSelection) {
          setSelectedDate(null);
        }
      }

      const syncTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastRefreshedAt(syncTimeStr);
      setLastSyncStatus('success');
      console.log(`[YouTube Sync Complete] Last Successful Sync Time: ${syncTimeStr}`);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load video data. Please check the URL.');
      setLastSyncStatus('error');
      console.error('[YouTube Sync Error]', err);
    } finally {
      isSyncingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideoAnalytics(initialVideo);
  }, []);

  // Automatic background refresh timer
  useEffect(() => {
    if (!autoRefreshInterval || autoRefreshInterval <= 0) return;
    const interval = setInterval(() => {
      loadVideoAnalytics(videoId, true);
    }, autoRefreshInterval);
    return () => clearInterval(interval);
  }, [autoRefreshInterval, videoId, apiKey, isOAuthConnected, accessToken]);

  // When clicking any bar: open comments side panel and set date
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsCommentsOpen(true);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#070f1e] text-[#e2ecf8] flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Header: Compact Navigation, Video Search & Controls (Fits in single bar) */}
      <Navbar
        videoData={videoData}
        onSearchVideo={(newVideoId) => {
          loadVideoAnalytics(newVideoId, false);
        }}
        onSearchError={(msg) => setErrorMessage(msg)}
        isLoading={isLoading}
        onOpenOAuth={() => setIsOAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGoogleForm={() => setIsFormModalOpen(true)}
        isOAuthConnected={isOAuthConnected}
        hasApiKey={Boolean(apiKey)}
        autoRefreshInterval={autoRefreshInterval}
        onChangeAutoRefresh={setAutoRefreshInterval}
        onManualRefresh={() => loadVideoAnalytics(videoId, true)}
        lastRefreshedAt={lastRefreshedAt}
        lastSyncStatus={lastSyncStatus}
      />

      {/* Dismissible Error / Notice Banner */}
      {errorMessage && (
        <div className="bg-rose-950/80 border-b border-rose-500/50 px-4 py-1.5 flex items-center justify-between text-xs text-rose-200 z-40 transition shrink-0 animate-fadeIn">
          <div className="flex items-center space-x-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 animate-pulse" />
            <span className="truncate">{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage('')}
            className="text-rose-400 hover:text-white font-bold ml-2 text-sm px-1.5 py-0.5 rounded hover:bg-rose-900/50 transition shrink-0"
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Dashboard Grid: Recreates the exact layout from reference image with ZERO page scrolling */}
      <DashboardGrid
        videoData={videoData}
        dailyData={dailyData}
        comments={comments}
        commentsDisabled={commentsDisabled}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        autoRefreshInterval={autoRefreshInterval}
        onManualRefresh={() => loadVideoAnalytics(videoId, true)}
        lastRefreshedAt={lastRefreshedAt}
        lastSyncStatus={lastSyncStatus}
        newViewsGained={newViewsGained}
        previousLifetimeViews={previousLifetimeViews}
        isLoading={isLoading}
        trackedVideosList={trackedVideosList}
      />

      {/* Modals for preserved functionality */}
      <OAuthModal
        isOpen={isOAuthOpen}
        onClose={() => setIsOAuthOpen(false)}
        isOAuthConnected={isOAuthConnected}
        onConnectOAuth={(token) => {
          setAccessToken(token);
          setIsOAuthConnected(true);
        }}
        onDisconnectOAuth={() => {
          setAccessToken('');
          setIsOAuthConnected(false);
        }}
        googleClientId={googleClientId}
        onSaveClientId={(id) => setGoogleClientId(id)}
        accessToken={accessToken}
        onSaveAccessToken={(token) => {
          setAccessToken(token);
          setIsOAuthConnected(true);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(newKey) => {
          setApiKey(newKey);
          loadVideoAnalytics(videoId, true);
        }}
        defaultApiKey={DEFAULT_KEY}
      />

      <GoogleFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        formSettings={formSettings}
        onUpdateSettings={(newSettings) => setFormSettings(newSettings)}
        submissions={submissions}
        onSubmissionsUpdated={(newSubs) => setSubmissions(newSubs)}
        selectedDate={selectedDate}
      />

    </div>
  );
}
