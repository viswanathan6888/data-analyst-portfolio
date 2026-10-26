import React, { useState } from 'react';
import {
  Activity,
  Info,
  Plus,
  BatteryCharging,
  ThumbsUp,
  Share2,
  Calendar,
  Clock,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  Eye,
  CheckCircle2,
  Flame,
  Moon,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  FileSpreadsheet,
  Download,
  Loader2
} from 'lucide-react';
import DailyViewsChart from './DailyViewsChart';
import LiveViewsTrendChart from './LiveViewsTrendChart';
import { downloadYouTubeExcelReport } from '../services/excelExportService.js';
import { format, parseISO } from 'date-fns';

export default function DashboardGrid({
  videoData,
  dailyData = [],
  comments = [],
  commentsDisabled = false,
  selectedDate,
  onSelectDate,
  autoRefreshInterval,
  onManualRefresh,
  lastRefreshedAt,
  lastSyncStatus = 'success',
  newViewsGained = 0,
  previousLifetimeViews = null,
  isLoading,
  trackedVideosList = []
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadExcel = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await downloadYouTubeExcelReport({
        videoData,
        dailyData,
        trackedVideosList
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.warn('Client Excel export fallback to server endpoint:', err);
      window.open(`/api/export-excel?videoId=${videoData?.id || 'CobjbCF-Rvw'}`, '_blank');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsExporting(false);
    }
  };
  const selectedIndex = dailyData.findIndex((d) => d.date === selectedDate);
  const selectedRecord = (selectedIndex >= 0 ? dailyData[selectedIndex] : null) || dailyData[1] || dailyData[0] || null;
  const activeIndex = selectedIndex >= 0 ? selectedIndex : (dailyData.length > 1 ? 1 : 0);
  const activeDate = selectedRecord?.date || selectedDate || (dailyData.length > 0 ? dailyData[0].date : null);

  // Overall Lifetime Metrics (mapped strictly from YouTube Data API v3 statistics)
  const rawTotalViews = videoData?.statistics?.viewCount ?? videoData?.viewCount;
  const totalViews = rawTotalViews !== undefined && rawTotalViews !== null
    ? Number(rawTotalViews)
    : null;

  const rawTotalLikes = videoData?.statistics?.likeCount ?? videoData?.likeCount;
  const totalLikes = rawTotalLikes !== undefined && rawTotalLikes !== null
    ? Number(rawTotalLikes)
    : null;

  const rawTotalComments = videoData?.statistics?.commentCount ?? videoData?.commentCount;
  const totalComments = rawTotalComments !== undefined && rawTotalComments !== null
    ? Number(rawTotalComments)
    : null;

  const totalShares = (dailyData && dailyData.length > 0)
    ? dailyData.reduce((acc, d) => acc + (d.shares || 0), 0)
    : null;

  const totalDailyViews = (dailyData && dailyData.length > 0)
    ? dailyData.reduce((acc, d) => acc + (Number(d.views) || 0), 0)
    : null;

  const pendingRollupViews = (totalViews !== null && totalDailyViews !== null)
    ? Math.max(0, totalViews - totalDailyViews)
    : 0;

  const lifetimeEngagementRate = (totalViews && totalViews > 0 && totalLikes !== null)
    ? (((totalLikes + (totalComments || 0)) / totalViews) * 100).toFixed(2)
    : null;

  // Format selected date / header label
  let formattedFullDate = activeDate || 'All Recent Comments';
  let formattedShortDate = activeDate || 'Latest';
  if (activeDate) {
    try {
      const parsed = parseISO(activeDate);
      formattedFullDate = format(parsed, 'EEEE, MMM d, yyyy');
      formattedShortDate = format(parsed, 'MMM d, yyyy');
    } catch (e) {}
  } else if (!dailyData || dailyData.length === 0) {
    formattedFullDate = 'All Recent Comments';
    formattedShortDate = 'Latest';
  }

  // Filter comments:
  // If dailyData has dates and activeDate is selected, filter by date.
  // If dailyData is empty (or no activeDate), display all video comments!
  const filteredComments = (dailyData && dailyData.length > 0 && activeDate)
    ? (comments || [])
        .filter((c) => (c.publishedAt || '').split('T')[0] === activeDate)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    : (comments || []).slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Selected Date Metrics
  const selectedViews = selectedRecord?.views !== undefined ? Number(selectedRecord.views) : null;
  const selectedViewsPct = (totalViews && totalViews > 0 && selectedViews !== null)
    ? ((selectedViews / totalViews) * 100).toFixed(1)
    : null;
  const selectedLikes = selectedRecord?.likes !== undefined ? Number(selectedRecord.likes) : null;
  const selectedShares = selectedRecord?.shares !== undefined ? Number(selectedRecord.shares) : null;
  const selectedCommentsCount = (dailyData && dailyData.length > 0)
    ? filteredComments.length
    : (totalComments !== null ? totalComments : filteredComments.length);

  // Selected Date Engagement Rate
  const dailyEngagementRate = (selectedViews !== null && selectedViews > 0 && selectedLikes !== null)
    ? (((selectedLikes + filteredComments.length) / selectedViews) * 100).toFixed(2)
    : null;

  // Growth Calculation vs Previous Day
  const previousRecord = (dailyData && activeIndex > 0) ? dailyData[activeIndex - 1] : null;
  const previousViews = previousRecord ? Number(previousRecord.views || 0) : null;
  const viewsDiff = (previousViews !== null && selectedViews !== null) ? selectedViews - previousViews : null;
  const growthPct = (previousViews && previousViews > 0 && viewsDiff !== null)
    ? ((viewsDiff / previousViews) * 100).toFixed(1)
    : null;

  // Peak views in dataset
  const maxDailyViews = dailyData.length > 0 ? Math.max(...dailyData.map((d) => Number(d.views || 0)), 1) : 1;
  const dailyPeakPct = selectedViews !== null ? Math.min(100, Math.round((selectedViews / maxDailyViews) * 100)) : 0;

  // Historical average daily views baseline
  const avgDailyViews = dailyData.length > 0
    ? Math.round(dailyData.reduce((acc, d) => acc + Number(d.views || 0), 0) / dailyData.length)
    : null;

  // Real YouTube Views Performance Calculations for Gauge Glows
  // 1. Growth Gauge Performance (Day-over-Day views growth vs previous equivalent period)
  const getGrowthPerformance = () => {
    if (activeIndex === 0 || viewsDiff === null || previousViews === null) {
      return {
        status: 'insufficient',
        label: 'Performance baseline requires prior period data (Launch Day)',
        color: '#94a3b8',
        glowClass: 'gauge-glow-neutral'
      };
    }
    const growth = Number(growthPct);
    if (growth >= 5.0) {
      return {
        status: 'good',
        label: `Good Performance (+${growth}% views growth vs previous day)`,
        color: '#10b981',
        glowClass: `gauge-glow-good ${growth >= 20 ? 'gauge-glow-high' : ''}`
      };
    }
    if (growth <= -5.0) {
      return {
        status: 'bad',
        label: `Bad Performance (${growth}% views drop vs previous day)`,
        color: '#ef4444',
        glowClass: `gauge-glow-bad ${growth <= -30 ? 'gauge-glow-high' : ''}`
      };
    }
    return {
      status: 'average',
      label: `Stable Performance (${growth >= 0 ? '+' : ''}${growth}% views within ±5% corridor)`,
      color: '#fbbf24',
      glowClass: 'gauge-glow-average'
    };
  };

  // 2. Selected Views Gauge Performance (Actual views vs video average daily baseline)
  const getViewsPerformance = () => {
    if (dailyData.length < 2) {
      return {
        status: 'insufficient',
        label: 'Performance cannot yet be determined (insufficient historical baseline)',
        color: '#94a3b8',
        glowClass: 'gauge-glow-neutral'
      };
    }
    const ratio = selectedViews / (avgDailyViews || 1);
    if (ratio >= 1.05) {
      return {
        status: 'good',
        label: `Good Performance (${Math.round(ratio * 100)}% of video daily average baseline)`,
        color: '#10b981',
        glowClass: `gauge-glow-good ${ratio >= 1.5 ? 'gauge-glow-high' : ''}`
      };
    }
    if (ratio <= 0.90) {
      return {
        status: 'bad',
        label: `Below Baseline Performance (${Math.round(ratio * 100)}% of video daily average baseline)`,
        color: '#ef4444',
        glowClass: `gauge-glow-bad ${ratio <= 0.4 ? 'gauge-glow-high' : ''}`
      };
    }
    return {
      status: 'average',
      label: `Average Performance (${Math.round(ratio * 100)}% of video daily average baseline)`,
      color: '#fbbf24',
      glowClass: 'gauge-glow-average'
    };
  };

  // 3. Engagement Rate Gauge Performance (Views-to-engagement vs lifetime benchmark)
  const getEngagementPerformance = () => {
    if (dailyEngagementRate === null || selectedViews === 0) {
      return {
        status: 'insufficient',
        label: 'Performance cannot yet be determined (insufficient engagement data)',
        color: '#94a3b8',
        glowClass: 'gauge-glow-neutral'
      };
    }
    const rate = Number(dailyEngagementRate);
    const baseline = Number(lifetimeEngagementRate) || 0.69;
    if (rate >= 0.70) {
      return {
        status: 'good',
        label: `Good Engagement (${rate}% vs ${baseline}% lifetime baseline)`,
        color: '#10b981',
        glowClass: `gauge-glow-good ${rate >= 0.75 ? 'gauge-glow-high' : ''}`
      };
    }
    if (rate < 0.60) {
      return {
        status: 'bad',
        label: `Below Average Engagement (${rate}% vs ${baseline}% lifetime baseline)`,
        color: '#ef4444',
        glowClass: `gauge-glow-bad ${rate <= 0.5 ? 'gauge-glow-high' : ''}`
      };
    }
    return {
      status: 'average',
      label: `Average Engagement (${rate}% vs ${baseline}% lifetime baseline)`,
      color: '#fbbf24',
      glowClass: 'gauge-glow-average'
    };
  };

  const growthPerf = getGrowthPerformance();
  const viewsPerf = getViewsPerformance();
  const engPerf = getEngagementPerformance();

  // Clean comment HTML
  const cleanCommentText = (text) => {
    if (!text) return '';
    return text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  };

  const formatCommentTime = (isoString) => {
    if (!isoString) return '';
    try {
      const parsed = parseISO(isoString);
      return format(parsed, 'MMM d, h:mm a');
    } catch {
      return isoString.replace('T', ' ').substring(0, 16);
    }
  };

  return (
    <div className="flex-1 min-h-0 w-full p-2.5 sm:p-3 grid grid-cols-12 gap-2.5 sm:gap-3 overflow-hidden">
      
      {/* ========================================================= */}
      {/* COLUMN 1: Activity, Activity Goal, Battery ({dailyData.length > 0 ? 'Daily Comments' : 'Recent Comments'}) */}
      {/* ========================================================= */}
      <div className="col-span-12 md:col-span-3 xl:col-span-2 flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
        
        {/* 1. Excel Report Download Section (Replaces Activity Panel) */}
        <div className="h-[25%] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="text-xs font-semibold text-white">Excel Report</span>
            </div>
            <span className="text-[9px] text-[#00f2fe] font-mono px-1.5 py-0.5 rounded bg-[#071324] border border-[#00f2fe]/30 shadow-[0_0_6px_rgba(0,242,254,0.15)]">
              .XLSX
            </span>
          </div>

          <div className="my-auto">
            <div className="flex items-center justify-between text-[10px] text-[#6296b8] uppercase font-semibold tracking-wider">
              <span>9-Column Daily Export</span>
              <span className="text-[#00d2c4] font-mono normal-case">
                {dailyData.length > 0 ? `${dailyData.length} Days Tracked` : 'Lifetime Export'}
              </span>
            </div>
            
            <button
              type="button"
              onClick={handleDownloadExcel}
              disabled={isExporting}
              className="mt-1.5 w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#00f2fe]/20 via-[#00d2c4]/20 to-[#05d5b3]/20 hover:from-[#00f2fe]/30 hover:to-[#05d5b3]/30 border border-[#00f2fe]/50 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition shadow-[0_0_10px_rgba(0,242,254,0.2)] hover:shadow-[0_0_14px_rgba(0,242,254,0.35)] active:scale-[0.98] disabled:opacity-50"
              title="Download formatted Excel (.xlsx) report: 9 columns (Day #, Tracking Date, Day of Week, Daily Views, Daily Likes, Daily Shares, Daily Comments, Growth Rate %, Avg Watch Duration)"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00f2fe]" />
                  <span className="text-[11px] font-mono">Generating...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-300 font-mono">Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#00f2fe]" />
                  <span className="text-[11px] font-medium tracking-wide">Download Report</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[10px] text-[#8fa3bf] flex items-center justify-between pt-1 border-t border-[#18345c]/50">
            <span className="text-[#6296b8] text-[9.5px]">9 Columns • Views & Growth</span>
            <span className="font-mono text-[#00d2c4] font-semibold text-[9.5px]">
              Filters & Freeze
            </span>
          </div>
        </div>

        {/* 2. Live YouTube Views Trend Line Chart (Replacing Activity Goal panel in exact same size, width, height & position) */}
        <LiveViewsTrendChart
          dailyData={dailyData}
          selectedDate={selectedDate}
          selectedRecord={selectedRecord}
          lastRefreshedAt={lastRefreshedAt}
          lastSyncStatus={lastSyncStatus}
          isLoading={isLoading}
          onManualRefresh={onManualRefresh}
          lifetimeViews={totalViews}
        />

        {/* 3. Battery Panel: Comments for Selected Date & Total Comments */}
        <div className="h-[28%] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <BatteryCharging className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="text-xs font-semibold text-white">Comments</span>
            </div>
            <span className="text-[9px] text-[#5fa5c8] font-mono">
              {formattedShortDate}
            </span>
          </div>

          <div className="flex items-center space-x-3 my-auto">
            {/* Battery Indicator with active cells */}
            <div className="relative w-8 h-12 rounded-lg border-2 border-[#00f2fe] p-1 flex flex-col justify-end space-y-1 shadow-[0_0_10px_rgba(0,242,254,0.25)]">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#00f2fe] rounded-t-sm" />
              <div className={`w-full h-1.5 rounded-xs ${selectedCommentsCount > 0 ? 'bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]' : 'bg-[#102342]'}`} />
              <div className={`w-full h-1.5 rounded-xs ${selectedCommentsCount > 5 ? 'bg-[#00d2c4]' : 'bg-[#102342]'}`} />
              <div className={`w-full h-1.5 rounded-xs ${selectedCommentsCount > 15 ? 'bg-[#00d2c4]' : 'bg-[#102342]'}`} />
              <div className={`w-full h-1.5 rounded-xs ${selectedCommentsCount > 25 ? 'bg-[#05d5b3]' : 'bg-[#102342]'}`} />
            </div>

            <div>
              <div className="text-xl lg:text-2xl font-black text-white font-mono leading-none">
                {selectedCommentsCount}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#00d2c4] tracking-wider mt-1">
                Daily Comments
              </div>
              <div className="text-[9px] text-[#6296b8] font-mono mt-0.5">
                Lifetime: {totalComments !== null ? Number(totalComments).toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* COLUMN 2: Metric Column (Total Views, Likes, Engagement, Shares) */}
      {/* ========================================================= */}
      <div className="col-span-12 md:col-span-3 xl:col-span-2 flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
        
        {/* 1. Total Views Panel */}
        <div className="flex-1 bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="text-xs font-semibold text-white">Total Views</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[9px] text-[#5fa5c8] font-mono" title={`YouTube Data API v3 statistics.viewCount (Updated: ${lastRefreshedAt || 'Live'}) • Status: ${lastSyncStatus}`}>
              {newViewsGained > 0 && (
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  +{newViewsGained.toLocaleString()} new
                </span>
              )}
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : lastSyncStatus === 'error' ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span>API v3</span>
            </div>
          </div>
          <div className="my-auto">
            <div className="text-xl lg:text-2xl font-black text-white font-mono tracking-tight">
              {totalViews !== null ? Number(totalViews).toLocaleString() : 'N/A'}
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#6296b8] mt-0.5">
              <span className="uppercase font-semibold tracking-wider">Lifetime Plays</span>
              <span 
                className="font-mono text-[#8fa3bf] text-[9.5px]" 
                title={totalDailyViews !== null ? `Day-Wise Sum: ${totalDailyViews.toLocaleString()}` : 'Day-wise sum requires channel OAuth'}
              >
                {totalDailyViews !== null ? `Tracked: ${totalDailyViews.toLocaleString()}` : 'Tracked: N/A (Requires OAuth)'}
                {totalDailyViews !== null && pendingRollupViews === 0 && <span className="text-emerald-400 font-bold ml-1">✓ Synced</span>}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Likes Panel (Shows Selected Date Likes & Lifetime) */}
        <div className="flex-1 bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-[#00d2c4]" />
              <span className="text-xs font-semibold text-white">Likes</span>
            </div>
            <span className="text-[9px] text-[#00d2c4] font-mono">
              {formattedShortDate}
            </span>
          </div>
          <div className="my-auto">
            <div className="text-xl lg:text-2xl font-black text-white font-mono tracking-tight">
              {selectedLikes !== null ? Number(selectedLikes).toLocaleString() : 'N/A'}
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#6296b8] mt-0.5">
              <span className="uppercase font-semibold tracking-wider">Daily Likes</span>
              <span className="font-mono text-[#8fa3bf]">Lifetime: {totalLikes !== null ? Number(totalLikes).toLocaleString() : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* 3. Engagement Rate Panel (Shows Selected Date Engagement & Lifetime) */}
        <div className="flex-[1.4] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span className="text-xs font-semibold text-white">Engagement</span>
            </div>
            <span className="text-[9px] text-[#00f2fe] font-mono">
              {formattedShortDate}
            </span>
          </div>

          <div className="flex items-center space-x-3 my-auto">
            {/* Circular arc for daily engagement with Real Performance-Driven Neon Glow Ring */}
            <div
              className="relative w-14 h-14 shrink-0 flex items-center justify-center group/gauge"
              title={engPerf.label}
            >
              {/* Dynamic Performance Glow Ring: Green (Good), Red (Bad), Yellow (Average), Neutral (Insufficient) */}
              <div
                className={`gauge-performance-ring ${engPerf.glowClass}`}
                aria-hidden="true"
              />

              <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 60 60">
                {/* Performance Outer Accent Ring */}
                <circle
                  cx="30"
                  cy="30"
                  r="28.5"
                  fill="none"
                  stroke={engPerf.color}
                  strokeWidth="1"
                  strokeOpacity="0.45"
                  className="transition-colors duration-500"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  className="stroke-[#102342]"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  className="stroke-[#00f2fe]"
                  strokeWidth="5"
                  strokeDasharray="150.79"
                  strokeDashoffset={dailyEngagementRate ? 150.79 * (1 - Math.min(100, Number(dailyEngagementRate) * 20) / 100) : 50}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.7))' }}
                />
              </svg>
              <Flame className="w-5 h-5 text-[#00f2fe] absolute" />
            </div>

            <div>
              <div className="text-lg lg:text-xl font-black text-white font-mono">
                {dailyEngagementRate !== null ? `${dailyEngagementRate}%` : 'N/A'}
              </div>
              <div className="text-[10px] text-[#6296b8] uppercase font-semibold">
                Daily Rate
              </div>
              <div className="text-[9px] text-[#8fa3bf] font-mono mt-0.5">
                Lifetime: {lifetimeEngagementRate !== null ? `${lifetimeEngagementRate}%` : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Shares Panel (RENAMED FROM CONNECTION - Shows Selected Date Shares & Lifetime) */}
        <div className="flex-1 bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition">
          <div className="flex items-center justify-between text-[#8fa3bf]">
            <div className="flex items-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#00d2c4]" />
              <span className="text-xs font-semibold text-white">Shares</span>
            </div>
            <span className="text-[9px] text-[#00d2c4] font-mono">
              {formattedShortDate}
            </span>
          </div>

          <div className="flex items-center space-x-3 my-auto">
            {/* Stair Signal Bars reflecting daily share activity */}
            <div className="flex items-end space-x-1 h-7">
              <div className={`w-1.5 h-2 rounded-xs ${selectedShares !== null && selectedShares > 0 ? 'bg-[#05d5b3]' : 'bg-[#102342]'}`} />
              <div className={`w-1.5 h-3.5 rounded-xs ${selectedShares !== null && selectedShares > 20 ? 'bg-[#05d5b3]' : 'bg-[#102342]'}`} />
              <div className={`w-1.5 h-5 rounded-xs ${selectedShares !== null && selectedShares > 80 ? 'bg-[#00d2c4]' : 'bg-[#102342]'}`} />
              <div className={`w-1.5 h-7 rounded-xs ${selectedShares !== null && selectedShares > 150 ? 'bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]' : 'bg-[#102342]'}`} />
            </div>

            <div>
              <div className="text-lg lg:text-xl font-black text-white font-mono">
                {selectedShares !== null ? `${selectedShares} Shares` : 'Daily N/A'}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#6296b8]">
                <span className="uppercase font-semibold">Daily Metric</span>
                <span className="font-mono text-[#8fa3bf] ml-2">Lifetime: {totalShares !== null ? totalShares.toLocaleString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* COLUMN 3: Center Column (Location, Bar Chart, Sleep Time, Growth) */}
      {/* ========================================================= */}
      <div className="col-span-12 md:col-span-6 xl:col-span-5 flex flex-col gap-2.5 sm:gap-3 h-full min-h-0">
        
        {/* 1. Video Details Panel (Compact & Reduced Height) */}
        <div className="h-[14%] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-2 sm:p-2.5 flex items-center justify-between transition gap-2.5">
          <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
            <div className="flex items-center space-x-1.5 text-[#8fa3bf] mb-0.5">
              <Sparkles className="w-3 h-3 text-[#00f2fe] shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Video Details
              </span>
            </div>

            <div className="min-w-0 pr-1">
              <h2 className="text-xs sm:text-[13px] font-bold text-white truncate leading-tight" title={videoData?.title}>
                {videoData?.title || 'YouTube Video Analytics'}
              </h2>
              <div className="flex items-center space-x-1.5 text-[10px] text-[#8fa3bf] mt-0.5 font-mono truncate">
                <span className="text-[#00d2c4] font-semibold">{videoData?.channelTitle || 'YouTube Channel'}</span>
                <span>•</span>
                <span>{videoData?.formattedDuration || '36 min'}</span>
                <span>•</span>
                <span className="text-[#6296b8]">Published: {videoData?.publishedAt?.split('T')[0] || '2026-10-17'}</span>
              </div>
            </div>
          </div>

          {/* Video Thumbnail */}
          <div className="relative shrink-0 h-full aspect-video rounded-lg overflow-hidden bg-[#070e1c] border border-[#1b3e70] shadow-[0_0_8px_rgba(0,242,254,0.2)]">
            <img
              src={
                videoData?.bestThumbnailUrl || (videoData?.id ? `https://i.ytimg.com/vi/${videoData.id}/hqdefault.jpg` : 'https://i.ytimg.com/vi/CobjbCF-Rvw/hqdefault.jpg')
              }
              alt={videoData?.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (videoData?.id) { e.currentTarget.src = `https://i.ytimg.com/vi/${videoData.id}/hqdefault.jpg`; }
              }}
            />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]" />
          </div>
        </div>

        {/* 2. Center Panel: Daily YouTube Views Bar Chart (Taller with freed space) */}
        <div className="h-[62%] min-h-0 flex flex-col">
          <DailyViewsChart
            dailyData={dailyData}
            selectedDate={activeDate}
            onSelectDate={onSelectDate}
            selectedRecord={selectedRecord}
            lifetimeViews={totalViews}
          />
        </div>

        {/* 3. Bottom Row: Sleep Time (Selected Views) & Growth (RENAMED FROM BED TIME) */}
        <div className="h-[24%] grid grid-cols-2 gap-2.5 sm:gap-3 min-h-0">
          
          {/* Selected Date Views Panel (originally Sleep Time) */}
          <div className="bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between transition">
            <div className="flex items-center justify-between text-[#8fa3bf]">
              <div className="flex items-center space-x-1.5">
                <Moon className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span className="text-[11px] sm:text-xs font-semibold text-white truncate">
                  Selected Views
                </span>
              </div>
              <span className="text-[9px] text-[#00f2fe] font-mono">
                {selectedRecord?.dayLabel ? selectedRecord.dayLabel.split(' ')[0] : 'Day'}
              </span>
            </div>

            <div className="flex items-center space-x-2.5 my-auto">
              {/* Circular Ring with % of Lifetime & Real Performance-Driven Neon Glow Ring */}
              <div
                className="relative w-11 h-11 shrink-0 flex items-center justify-center group/gauge"
                title={viewsPerf.label}
              >
                {/* Dynamic Performance Glow Ring: Green (Good), Red (Bad), Yellow (Average), Neutral (Insufficient) */}
                <div
                  className={`gauge-performance-ring ${viewsPerf.glowClass}`}
                  aria-hidden="true"
                />

                <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 50 50">
                  {/* Performance Outer Accent Ring */}
                  <circle
                    cx="25"
                    cy="25"
                    r="23.5"
                    fill="none"
                    stroke={viewsPerf.color}
                    strokeWidth="1"
                    strokeOpacity="0.45"
                    className="transition-colors duration-500"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className="stroke-[#102342]"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className="stroke-[#00f2fe]"
                    strokeWidth="4"
                    strokeDasharray="125.66"
                    strokeDashoffset={125.66 * (1 - Math.min(100, Number(selectedViewsPct)) / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.7))' }}
                  />
                </svg>
                <span className="text-[10px] font-bold text-[#00f2fe] font-mono absolute">
                  {selectedViewsPct !== null ? `${selectedViewsPct}%` : 'N/A'}
                </span>
              </div>

              <div className="min-w-0">
                <div className="text-base sm:text-lg font-black text-white font-mono leading-none truncate">
                  {selectedViews !== null ? Number(selectedViews).toLocaleString() : 'N/A'}
                </div>
                <div className="text-[10px] text-[#6296b8] uppercase font-semibold truncate mt-0.5">
                  {formattedShortDate}
                </div>
                <div className="text-[9px] text-[#8fa3bf] font-mono truncate">
                  {selectedViewsPct !== null ? `${selectedViewsPct}% of Lifetime Views` : 'Requires Channel OAuth'}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Panel (RENAMED FROM BED TIME - Daily Views Growth vs Previous Day) */}
          <div className="bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between transition">
            <div className="flex items-center justify-between text-[#8fa3bf]">
              <div className="flex items-center space-x-1.5">
                {viewsDiff === null ? (
                  <Activity className="w-3.5 h-3.5 text-[#00d2c4]" />
                ) : viewsDiff >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-[#05d5b3]" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="text-[11px] sm:text-xs font-semibold text-white truncate">
                  Growth
                </span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                viewsDiff === null
                  ? 'bg-[#071324] text-[#00f2fe] border-[#18345c]'
                  : viewsDiff >= 0
                    ? 'bg-[#062420] text-[#05d5b3] border-[#05d5b3]/40'
                    : 'bg-[#291708] text-amber-400 border-amber-500/40'
              }`}>
                {viewsDiff === null ? 'Day 1' : viewsDiff >= 0 ? 'Surge' : 'Drop'}
              </span>
            </div>

            <div className="flex items-center space-x-2.5 my-auto">
              {/* Circular Ring indicating positive/negative growth & Real Performance-Driven Neon Glow Ring */}
              <div
                className="relative w-11 h-11 shrink-0 flex items-center justify-center group/gauge"
                title={growthPerf.label}
              >
                {/* Dynamic Performance Glow Ring: Green (Good), Red (Bad), Yellow (Average), Neutral (Insufficient) */}
                <div
                  className={`gauge-performance-ring ${growthPerf.glowClass}`}
                  aria-hidden="true"
                />

                <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 50 50">
                  {/* Performance Outer Accent Ring */}
                  <circle
                    cx="25"
                    cy="25"
                    r="23.5"
                    fill="none"
                    stroke={growthPerf.color}
                    strokeWidth="1"
                    strokeOpacity="0.45"
                    className="transition-colors duration-500"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className="stroke-[#102342]"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    className={viewsDiff === null ? 'stroke-[#00f2fe]' : viewsDiff >= 0 ? 'stroke-[#05d5b3]' : 'stroke-amber-400'}
                    strokeWidth="4"
                    strokeDasharray="125.66"
                    strokeDashoffset={growthPct !== null ? 125.66 * (1 - Math.min(100, Math.abs(Number(growthPct))) / 100) : 0}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{
                      filter: viewsDiff >= 0
                        ? 'drop-shadow(0 0 6px rgba(5, 213, 179, 0.7))'
                        : 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.7))'
                    }}
                  />
                </svg>
                {viewsDiff === null ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00f2fe] absolute" />
                ) : viewsDiff >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-[#05d5b3] absolute" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-amber-400 absolute" />
                )}
              </div>

              <div className="min-w-0">
                <div className={`text-base sm:text-lg font-black font-mono leading-none truncate ${
                  viewsDiff === null ? 'text-white' : viewsDiff >= 0 ? 'text-[#05d5b3]' : 'text-amber-400'
                }`}>
                  {growthPct !== null
                    ? `${Number(growthPct) >= 0 ? '+' : ''}${growthPct}%`
                    : (dailyData.length > 0 ? 'Launch Base' : 'N/A')}
                </div>

                <div className="text-[10px] text-[#6296b8] font-mono truncate mt-0.5">
                  {viewsDiff !== null ? (
                    `${viewsDiff >= 0 ? '+' : ''}${Number(viewsDiff).toLocaleString()} views`
                  ) : (
                    dailyData.length > 0 ? 'First recorded date' : 'OAuth Required'
                  )}
                </div>

                {previousViews !== null && (
                  <div className="text-[9px] text-[#8fa3bf] font-mono truncate">
                    Prev: {Number(previousViews).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* COLUMN 4: Comments Panel for Selected Date (newest first) */}
      {/* ========================================================= */}
      <div className="col-span-12 xl:col-span-3 flex flex-col h-full min-h-0 bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 sm:p-3.5 transition overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#18345c] shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#071324] border border-[#1b3e70] text-[#00f2fe] shadow-[0_0_8px_rgba(0,242,254,0.3)] shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                YouTube Comments
              </h3>
              <p className="text-[10px] text-[#8fa3bf] font-mono truncate">
                {formattedFullDate}
              </p>
            </div>
          </div>

          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border shrink-0 ${
            filteredComments.length > 0
              ? 'bg-[#0a1f3d] text-[#00f2fe] border-[#00f2fe]/40 shadow-[0_0_8px_rgba(0,242,254,0.25)]'
              : 'bg-[#091528] text-[#5fa5c8] border-[#18345c]'
          }`}>
            {filteredComments.length} {filteredComments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>

        {/* Scrollable Comments List (internal scrollbar only, ZERO page scrolling) */}
        <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-1 custom-scrollbar">
          {filteredComments.length === 0 ? (
            <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-4 text-[#8fa3bf]">
              <div className={`w-10 h-10 rounded-full bg-[#071324] border border-[#18345c] flex items-center justify-center mb-2 ${commentsDisabled ? 'text-amber-400' : 'text-[#5fa5c8]'}`}>
                <MessageSquare className="w-5 h-5 stroke-[1.5]" />
              </div>
              <p className="text-xs font-semibold text-white">
                {commentsDisabled ? 'Comments Disabled' : 'No comments found'}
              </p>
              <p className="text-[10px] text-[#6296b8] mt-1 max-w-[180px]">
                {commentsDisabled
                  ? 'Comments are disabled for this video by the creator.'
                  : (dailyData.length > 0 && activeDate
                      ? `No comments published on ${activeDate}.`
                      : 'No comments currently available for this video.')}
              </p>
            </div>
          ) : (
            filteredComments.map((comment, idx) => (
              <div
                key={comment.id || idx}
                className="p-2.5 rounded-xl bg-[#071324] border border-[#142d4d] text-xs hover:border-[#1f4273] transition"
              >
                {/* Author Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    {comment.authorProfileImageUrl ? (
                      <img
                        src={comment.authorProfileImageUrl}
                        alt={comment.authorDisplayName}
                        className="w-4 h-4 rounded-full object-cover shrink-0 border border-[#1b3e70]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-[#102342] text-[#00f2fe] flex items-center justify-center text-[9px] font-bold shrink-0">
                        {(comment.authorDisplayName || 'U')[1]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="font-semibold text-white truncate text-[11px]">
                      {comment.authorDisplayName || 'Viewer'}
                    </span>
                  </div>

                  <span className="text-[9px] text-[#5fa5c8] font-mono shrink-0 ml-1">
                    #{idx + 1}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-[#c7d7eb] text-[11px] leading-relaxed whitespace-pre-wrap break-words">
                  {cleanCommentText(comment.textOriginal || comment.textDisplay)}
                </p>

                {/* Timestamp & Likes */}
                <div className="flex items-center justify-between text-[10px] text-[#6296b8] mt-1.5 pt-1 border-t border-[#12243d]">
                  <span className="font-mono text-[9px]">
                    {formatCommentTime(comment.publishedAt)}
                  </span>
                  {comment.likeCount > 0 && (
                    <span className="flex items-center space-x-1 text-[#00d2c4] font-mono text-[9px]">
                      <ThumbsUp className="w-2.5 h-2.5" />
                      <span>{comment.likeCount}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 mt-2 border-t border-[#18345c] flex items-center justify-between text-[9px] text-[#6296b8] font-mono shrink-0">
          <span>YouTube Data API v3</span>
          <span>Newest First</span>
        </div>

      </div>

    </div>
  );
}
