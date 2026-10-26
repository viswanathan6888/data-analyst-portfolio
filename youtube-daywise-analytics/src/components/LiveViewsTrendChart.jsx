import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Activity,
  Radio
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function LiveViewsTrendChart({
  dailyData = [],
  selectedDate,
  selectedRecord,
  lastRefreshedAt,
  lastSyncStatus = 'success',
  isLoading = false,
  onManualRefresh,
  lifetimeViews = 0
}) {
  if (!dailyData || dailyData.length === 0) {
    return (
      <div
        aria-label="Live YouTube Views Trend Line Chart"
        className="h-[47%] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition relative overflow-hidden group"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,242,254,0.12)_50%,transparent_100%)] animate-[scanline_4s_linear_infinite]"
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Top Header */}
        <div className="w-full flex items-center justify-between text-[#8fa3bf] shrink-0 z-10">
          <div className="flex items-center space-x-1.5">
            <TrendingUp
              className="w-3.5 h-3.5 text-[#00f2fe]"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,242,254,0.8))' }}
            />
            <span className="text-xs font-semibold text-white">Views Trend</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#071324] border border-[#18345c]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2fe]" />
            </span>
            <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-[#00f2fe]">
              LIVE
            </span>
          </div>
        </div>

        {/* Real Lifetime Views Display */}
        <div className="my-auto z-10">
          <div className="text-[10px] text-[#6296b8] uppercase font-semibold tracking-wider">
            Lifetime Views Monitored
          </div>
          <div
            className="text-lg lg:text-xl font-black font-mono leading-tight tracking-tight text-[#00f2fe]"
            style={{ textShadow: '0 0 12px rgba(0,242,254,0.5)' }}
          >
            {lifetimeViews ? Number(lifetimeViews).toLocaleString() : 'Live Syncing'}
          </div>
          <p className="text-[10px] text-[#8fa3bf] mt-1">
            Day-wise trend requires OAuth • Live view count active
          </p>
        </div>

        {/* Bottom Sync Bar */}
        <div className="w-full pt-1.5 border-t border-[#18345c]/70 flex items-center justify-between text-[9px] text-[#8fa3bf] shrink-0 z-10">
          <div className="flex items-center space-x-1.5 truncate pr-1">
            <span className={`w-1.5 h-1.5 rounded-full inline-block ${isLoading ? 'bg-amber-400 animate-ping' : lastSyncStatus === 'error' ? 'bg-rose-500' : 'bg-emerald-400 shadow-[0_0_6px_#10b981]'}`} />
            <span className="text-[#6296b8] truncate">
              {isLoading ? (
                <span className="text-amber-400 font-mono">Syncing API v3...</span>
              ) : (
                <>Last Sync: <strong className="text-white font-mono font-normal">{lastRefreshedAt || 'Just now'}</strong></>
              )}
            </span>
          </div>

          <button
            onClick={onManualRefresh}
            disabled={isLoading}
            className="px-2 py-0.5 rounded-lg bg-[#142e52] hover:bg-[#1b3d6e] active:scale-95 text-[#00f2fe] border border-[#1f4b85] text-[9px] font-bold transition flex items-center space-x-1 shrink-0"
            title="Poll YouTube API for latest video views"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>
    );
  }

  // Determine active record: selected date or the latest recorded day
  const activeRecord = selectedRecord || dailyData[dailyData.length - 1];
  const activeIndex = dailyData.findIndex((d) => d.date === activeRecord?.date);
  const prevRecord = activeIndex > 0 ? dailyData[activeIndex - 1] : null;

  // Real YouTube views metrics
  const currentViews = Number(activeRecord?.views || 0);
  const prevViews = prevRecord ? Number(prevRecord.views || 0) : null;
  const isLaunchDay = activeIndex === 0;

  // Day-over-Day views delta & percentage
  const viewsDelta = prevViews !== null ? currentViews - prevViews : 0;
  const pctChange = prevViews && prevViews > 0
    ? Number(((viewsDelta / prevViews) * 100).toFixed(1))
    : 0;

  // Increasing vs Decreasing trend evaluation
  const isIncreasing = isLaunchDay ? true : viewsDelta >= 0;
  
  // Theme colors: green/cyan for increasing, red for decreasing
  const trendColor = isIncreasing ? '#00f2fe' : '#ff4b6e';
  const trendBg = isIncreasing ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400';
  const TrendIcon = isIncreasing ? TrendingUp : TrendingDown;
  const ArrowIcon = isIncreasing ? ArrowUpRight : ArrowDownRight;

  // Format active date label
  let formattedDateLabel = activeRecord?.date || '';
  try {
    formattedDateLabel = format(parseISO(activeRecord.date), 'MMM d');
  } catch (e) {}

  // Prepare chronological trend line data using genuine API figures
  const trendChartData = dailyData.map((d, idx) => {
    let shortDate = d.date;
    try {
      shortDate = format(parseISO(d.date), 'MMM d');
    } catch (e) {}

    const prev = idx > 0 ? dailyData[idx - 1] : null;
    const diff = prev ? Number(d.views) - Number(prev.views) : 0;
    const diffPct = prev && Number(prev.views) > 0
      ? Number(((diff / Number(prev.views)) * 100).toFixed(1))
      : 0;

    return {
      date: d.date,
      shortDate,
      views: Number(d.views || 0),
      dayLabel: d.dayLabel,
      diff,
      diffPct,
      isSelected: d.date === activeRecord?.date
    };
  });

  // Calculate dynamic domain bounds for expressive line movement
  const viewsList = trendChartData.map((d) => d.views);
  const minViews = Math.min(...viewsList);
  const maxViews = Math.max(...viewsList);
  const yDomain = [
    Math.max(0, Math.floor(minViews * 0.7)),
    Math.ceil(maxViews * 1.08)
  ];

  // Custom Dot renderer highlighting the active/monitored point with pulsing glow
  const CustomTrendDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    const isCurrentActive = payload.date === activeRecord?.date;

    if (isCurrentActive) {
      return (
        <g key={`dot-active-${payload.date}`}>
          {/* Pulsing live beacon halo */}
          <circle
            cx={cx}
            cy={cy}
            r={7}
            fill={trendColor}
            opacity={0.35}
            className="animate-ping"
          />
          {/* Outer glow ring */}
          <circle
            cx={cx}
            cy={cy}
            r={5}
            fill={trendColor}
            opacity={0.8}
            filter={`drop-shadow(0 0 6px ${trendColor})`}
          />
          {/* Inner core */}
          <circle
            cx={cx}
            cy={cy}
            r={2.5}
            fill="#ffffff"
          />
        </g>
      );
    }

    return (
      <circle
        key={`dot-${payload.date}`}
        cx={cx}
        cy={cy}
        r={2}
        fill={trendColor}
        opacity={0.6}
      />
    );
  };

  // Custom Hover Tooltip
  const CustomTrendTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0c1b32]/95 backdrop-blur-md border border-[#1f4273] p-2 rounded-xl shadow-card-navy text-[10px] text-white pointer-events-none space-y-0.5 z-50">
          <div className="font-semibold text-white flex items-center justify-between gap-2">
            <span>{data.shortDate}</span>
            {data.dayLabel && (
              <span className="text-[9px] px-1 rounded bg-[#071324] text-[#00f2fe] font-mono">
                {data.dayLabel}
              </span>
            )}
          </div>
          <div className="font-bold text-sm font-mono" style={{ color: trendColor }}>
            {data.views.toLocaleString()} Views
          </div>
          <div className="text-[#8fa3bf]">
            {data.diff >= 0 ? `+${data.diff.toLocaleString()}` : data.diff.toLocaleString()} (
            {data.diffPct >= 0 ? `+${data.diffPct}%` : `${data.diffPct}%`})
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      aria-label="Live YouTube Views Trend Line Chart"
      className="h-[47%] bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 flex flex-col justify-between transition relative overflow-hidden group"
    >
      {/* Background Animated Scanning Sweep Effect (Live-monitoring radar) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(0,242,254,0.12)_50%,transparent_100%)] animate-[scanline_4s_linear_infinite]"
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      {/* Top Header: Title, Trend Icon & Live Monitor Beacon */}
      <div className="w-full flex items-center justify-between text-[#8fa3bf] shrink-0 z-10">
        <div className="flex items-center space-x-1.5">
          <TrendIcon
            className="w-3.5 h-3.5 transition-colors"
            style={{
              color: trendColor,
              filter: `drop-shadow(0 0 6px ${trendColor}80)`
            }}
          />
          <span className="text-xs font-semibold text-white">Views Trend</span>
          <span className="text-[9px] text-[#6296b8] font-mono hidden sm:inline">
            ({trendChartData.length}d)
          </span>
        </div>

        {/* Live Monitoring Pulse Status */}
        <div
          className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#071324] border border-[#18345c]"
          title="Active Live Monitoring • Real-time YouTube Analytics Feed"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: trendColor }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: trendColor }}
            />
          </span>
          <span
            className="text-[9px] font-mono uppercase font-bold tracking-wider"
            style={{ color: trendColor }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Metrics Row: Latest Views Count + Trend Direction & Percentage */}
      <div className="w-full flex items-baseline justify-between mt-1 shrink-0 z-10">
        <div>
          <div className="text-[10px] text-[#6296b8] uppercase font-semibold tracking-wider flex items-center space-x-1">
            <span>{activeRecord?.dayLabel || formattedDateLabel}</span>
            <span>•</span>
            <span>Daily Views</span>
          </div>
          <div
            className="text-lg lg:text-xl font-black font-mono leading-tight tracking-tight"
            style={{
              color: trendColor,
              textShadow: `0 0 12px ${trendColor}50`
            }}
          >
            {currentViews.toLocaleString()}
          </div>
        </div>

        {/* Trend Indicator Badge */}
        <div className="flex flex-col items-end">
          <div
            className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-lg border font-mono text-xs font-bold ${trendBg}`}
            style={{
              boxShadow: `0 0 8px ${trendColor}25`
            }}
          >
            <ArrowIcon className="w-3.5 h-3.5" />
            <span>
              {isLaunchDay
                ? 'Launch Base'
                : `${pctChange >= 0 ? `+${pctChange}%` : `${pctChange}%`}`}
            </span>
          </div>
          <span
            className="text-[9px] font-mono font-semibold uppercase tracking-wider mt-0.5"
            style={{ color: trendColor }}
          >
            {isLaunchDay ? 'Baseline' : (isIncreasing ? 'Increasing' : 'Decreasing')}
          </span>
        </div>
      </div>

      {/* Center: Live Trend Area/Line Chart with Glowing Stroke & Fill */}
      <div className="w-full flex-1 min-h-[90px] my-1 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendChartData}
            margin={{ top: 8, right: 6, left: -28, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`trendAreaGradient-${isIncreasing ? 'inc' : 'dec'}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trendColor} stopOpacity={0.45} />
                <stop offset="85%" stopColor={trendColor} stopOpacity={0.03} />
                <stop offset="100%" stopColor={trendColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="shortDate"
              stroke="#4a6380"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6296b8', fontSize: 8.5, fontFamily: 'monospace' }}
              interval="preserveStartEnd"
              dy={3}
            />

            <YAxis
              domain={yDomain}
              stroke="#4a6380"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6296b8', fontSize: 8, fontFamily: 'monospace' }}
              tickFormatter={(val) => {
                if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                return val;
              }}
            />

            <Tooltip content={<CustomTrendTooltip />} />

            <Area
              type="monotone"
              dataKey="views"
              stroke={trendColor}
              strokeWidth={2.5}
              fill={`url(#trendAreaGradient-${isIncreasing ? 'inc' : 'dec'})`}
              dot={<CustomTrendDot />}
              activeDot={{
                r: 5,
                fill: '#ffffff',
                stroke: trendColor,
                strokeWidth: 2.5
              }}
              isAnimationActive={true}
              animationDuration={750}
              animationEasing="ease-out"
              style={{
                filter: `drop-shadow(0 0 6px ${trendColor}90)`
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Sync Bar: Last Update Time & Manual Sync Trigger */}
      <div className="w-full pt-1.5 border-t border-[#18345c]/70 flex items-center justify-between text-[9px] text-[#8fa3bf] shrink-0 z-10">
        <div className="flex items-center space-x-1.5 truncate pr-1">
          <span className={`w-1.5 h-1.5 rounded-full inline-block ${isLoading ? 'bg-amber-400 animate-ping' : lastSyncStatus === 'error' ? 'bg-rose-500' : 'bg-emerald-400 shadow-[0_0_6px_#10b981]'}`} />
          <span className="text-[#6296b8] truncate">
            {isLoading ? (
              <span className="text-amber-400 font-mono">Syncing API v3...</span>
            ) : lastSyncStatus === 'error' ? (
              <span className="text-rose-400 font-mono">Sync Error (Retrying...)</span>
            ) : (
              <>Last Sync: <strong className="text-white font-mono font-normal">{lastRefreshedAt || 'Just now'}</strong></>
            )}
          </span>
        </div>

        <button
          onClick={onManualRefresh}
          disabled={isLoading}
          className="px-2 py-0.5 rounded-lg bg-[#142e52] hover:bg-[#1b3d6e] active:scale-95 text-[#00f2fe] border border-[#1f4b85] text-[9px] font-bold transition flex items-center space-x-1 shrink-0"
          title="Poll YouTube API for latest video views"
        >
          <RefreshCw className={`w-2.5 h-2.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Sync</span>
        </button>
      </div>

    </div>
  );
}
