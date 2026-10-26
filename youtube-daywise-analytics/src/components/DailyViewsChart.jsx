import React, { useRef, useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList
} from 'recharts';
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Activity,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function DailyViewsChart({
  dailyData = [],
  selectedDate,
  onSelectDate,
  selectedRecord,
  lifetimeViews = 187130
}) {
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const prevSelectedDateRef = useRef(selectedDate);
  const prevDataLengthRef = useRef(dailyData.length);
  const [containerWidth, setContainerWidth] = useState(600);

  // Measure container width to dynamically size the scrollable canvas & margins
  useEffect(() => {
    const updateWidth = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Fixed slot width per date bar to strictly prevent shrinking or compressing
  const SLOT_WIDTH = 72; // Consistent bar slot width & spacing
  const BAR_SIZE = 38;   // Consistent bar thickness

  // Dynamic side margins allow any bar (from earliest to latest) to slide smoothly into focal center
  const marginLeft = Math.max(30, Math.round(containerWidth * 0.35));
  const marginRight = Math.max(35, Math.round(containerWidth * 0.35));
  const plotWidth = dailyData.length * SLOT_WIDTH;
  const totalChartWidth = plotWidth + marginLeft + marginRight;

  // Selected date index
  const selectedIndex = dailyData.findIndex((d) => d.date === selectedDate);

  /**
   * Smooth easing scroll animation (Stock-Market Timeline Glide)
   * Uses easeOutCubic for responsive immediate pickup and smooth settling.
   */
  const smoothScrollTo = (targetLeft, duration = 340) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startLeft = container.scrollLeft;
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const clampedTarget = Math.max(0, Math.min(targetLeft, maxScroll));
    const distance = clampedTarget - startLeft;

    if (Math.abs(distance) < 2) {
      container.scrollLeft = clampedTarget;
      return;
    }

    // Cancel any active animation frame to allow immediate retargeting
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    let startTime = null;
    // Cubic ease-out: responsive gliding feel like stock trading charts
    const easeOutCubic = (t) => --t * t * t + 1;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      container.scrollLeft = Math.round(startLeft + distance * eased);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        container.scrollLeft = clampedTarget;
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  /**
   * Calculate target scrollLeft to bring the bar at index into clear focus
   */
  const getTargetScrollForIndex = (index) => {
    if (!scrollContainerRef.current || index < 0 || index >= dailyData.length) return 0;
    const viewportWidth = scrollContainerRef.current.clientWidth;
    const barCenterX = marginLeft + (index + 0.5) * SLOT_WIDTH;
    const targetScroll = barCenterX - (viewportWidth / 2);
    const maxScroll = Math.max(0, scrollContainerRef.current.scrollWidth - viewportWidth);
    return Math.max(0, Math.min(targetScroll, maxScroll));
  };

  const scrollToDateIndex = (index, smooth = true) => {
    if (index < 0 || index >= dailyData.length) return;
    const targetScroll = getTargetScrollForIndex(index);
    if (smooth) {
      smoothScrollTo(targetScroll, 340);
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = targetScroll;
    }
  };

  /**
   * Select a date immediately and smoothly slide the chart horizontally to bring the bar into focus
   */
  const handleSelectDateAndFocus = (date) => {
    if (!date) return;
    prevSelectedDateRef.current = date;
    onSelectDate(date);
    const index = dailyData.findIndex((d) => d.date === date);
    if (index !== -1) {
      scrollToDateIndex(index, true);
    }
  };

  // Previous bar navigation
  const handlePrevBar = () => {
    if (selectedIndex > 0) {
      const prevDate = dailyData[selectedIndex - 1]?.date;
      if (prevDate) handleSelectDateAndFocus(prevDate);
    }
  };

  // Next bar navigation
  const handleNextBar = () => {
    if (selectedIndex < dailyData.length - 1) {
      const nextDate = dailyData[selectedIndex + 1]?.date;
      if (nextDate) handleSelectDateAndFocus(nextDate);
    }
  };

  // Focus latest date on right
  const handleResetToLatest = () => {
    const latestDate = dailyData[dailyData.length - 1]?.date;
    if (latestDate) handleSelectDateAndFocus(latestDate);
  };

  // Cancel programmatic animation on user manual wheel/touch scroll
  const handleUserScroll = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Initial load: position the latest date visible on the right
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const idx = dailyData.findIndex((d) => d.date === selectedDate);
        if (idx !== -1) {
          scrollToDateIndex(idx, false);
        } else {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // When selectedDate changes externally (e.g. from parent props)
  useEffect(() => {
    if (selectedDate && selectedDate !== prevSelectedDateRef.current) {
      prevSelectedDateRef.current = selectedDate;
      const index = dailyData.findIndex((d) => d.date === selectedDate);
      if (index !== -1) {
        scrollToDateIndex(index, true);
      }
    }
  }, [selectedDate]);

  // When new dates arrive: keep latest date visible on the right
  useEffect(() => {
    if (dailyData.length > prevDataLengthRef.current) {
      prevDataLengthRef.current = dailyData.length;
      if (scrollContainerRef.current) {
        const maxScroll = Math.max(0, scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth);
        smoothScrollTo(maxScroll, 400);
      }
    }
  }, [dailyData.length]);

  if (!dailyData || dailyData.length === 0) {
    return (
      <div
        aria-label="Daily Views Bar Chart"
        className="bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 sm:p-3.5 flex-1 min-h-0 h-full flex flex-col justify-between transition relative overflow-hidden"
      >
        {/* Subtle Cyan Ambient Radial Glow at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[#18345c] shrink-0 z-10">
          <div className="flex items-center space-x-2 text-xs text-[#8fa3bf]">
            <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="font-semibold text-white">Public Video Overview & Data Availability</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#071324] border border-[#1b3e70] text-[#00f2fe] font-mono">
            {lifetimeViews ? `${Number(lifetimeViews).toLocaleString()} Lifetime Views` : 'Live API'}
          </span>
        </div>

        {/* Center Grid: 2 Side-by-Side Cards (Public vs Channel Owner) */}
        <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 p-1 z-10">
          
          {/* Card 1: Active Public Metrics (Any Channel) */}
          <div className="bg-[#071324]/90 border border-[#1b3e70] rounded-xl p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="p-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-white">Public Metrics (Any Channel)</h4>
              </div>
              <p className="text-[11px] text-[#8fa3bf] leading-relaxed mb-2">
                Available for any public YouTube video via YouTube Data API v3:
              </p>
              <ul className="space-y-1 text-[10.5px] text-[#c7d7eb]">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span><strong>Lifetime Views:</strong> {lifetimeViews ? Number(lifetimeViews).toLocaleString() : 'Live'} plays</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span><strong>Engagement:</strong> Real-time likes, comment count & threads</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span><strong>Details:</strong> Title, channel attribution, duration & thumbnail</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#05d5b3]" />
                  <span><strong>Live Session Polling:</strong> Delta tracking active</span>
                </li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-[#12253f] text-[9.5px] text-emerald-400 font-mono">
              ● 100% Live Synchronized
            </div>
          </div>

          {/* Card 2: Owner-Authorized Daily Breakdown */}
          <div className="bg-[#071324]/90 border border-[#1b3e70] rounded-xl p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="p-1 rounded-md bg-[#0c1f3d] border border-[#00f2fe]/40 text-[#00f2fe]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-white">Day-Wise Historical Breakdown</h4>
              </div>
              <p className="text-[11px] text-[#8fa3bf] leading-relaxed mb-2">
                Official YouTube Analytics API v2 restriction:
              </p>
              <p className="text-[10.5px] text-[#8fa3bf] leading-relaxed mb-2">
                Google restricts historical day-by-day view splits and watch-time retention strictly to the channel owner via OAuth 2.0 authorization. No official public API provides private daily curves for third-party channels.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#12253f] flex items-center justify-between text-[9.5px] text-[#5fa5c8] font-mono">
              <span>Owner OAuth Required for Daily Curve</span>
              <span className="text-[#00f2fe]">Privacy Protected</span>
            </div>
          </div>

        </div>

        {/* Slim Footer */}
        <div className="pt-2 mt-1 border-t border-[#18345c] flex items-center justify-between text-[10px] text-[#8fa3bf] shrink-0 z-10">
          <div className="flex items-center space-x-2">
            <Activity className="w-3 h-3 text-[#00d2c4] animate-pulse" />
            <span className="text-[#6296b8]">Live monitoring active • Click OAuth in top toolbar to authorize your channel</span>
          </div>
          <span className="font-mono text-[#00d2c4]">YouTube Data API v3</span>
        </div>
      </div>
    );
  }

  // Format active record date
  let formattedSelectedDate = '';
  if (selectedRecord?.date) {
    try {
      const parsed = parseISO(selectedRecord.date);
      formattedSelectedDate = format(parsed, 'EEEE, MMMM d, yyyy');
    } catch (e) {
      formattedSelectedDate = selectedRecord.date;
    }
  }

  // Format on-chart label above each bar
  const formatOnBarCount = (val) => {
    const num = Number(val || 0);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toLocaleString();
  };

  // Percentage of lifetime total views
  const pctOfLifetime = selectedRecord?.views && lifetimeViews
    ? ((selectedRecord.views / lifetimeViews) * 100).toFixed(1)
    : selectedRecord?.pctOfTotalViews || '0';

  // Reconciled Tracked Day-Wise Views vs Lifetime Views
  const totalTrackedViews = dailyData.reduce((acc, d) => acc + Number(d.views || 0), 0);
  const pendingRollupViews = Math.max(0, Number(lifetimeViews || 0) - totalTrackedViews);

  // Stable Y-Axis Max Domain
  const maxDataViews = Math.max(...dailyData.map((d) => Number(d.views || 0)), 42000);
  const yMax = Math.ceil(maxDataViews / 10000) * 10000 + 10000; // e.g. 60000

  // Custom on-bar count label (highlighted in bold white/cyan for selected bar)
  const CustomBarLabel = (props) => {
    const { x, y, width, value, index } = props;
    const item = dailyData[index];
    const isSelected = item && selectedDate === item.date;
    const labelText = formatOnBarCount(value);

    return (
      <text
        x={x + width / 2}
        y={y - 6}
        textAnchor="middle"
        fill={isSelected ? '#ffffff' : '#7e9cbe'}
        fontSize={isSelected ? 11 : 10}
        fontWeight={isSelected ? 700 : 500}
        style={{
          filter: isSelected ? 'drop-shadow(0 0 6px rgba(0,242,254,0.85))' : 'none',
          pointerEvents: 'none'
        }}
      >
        {labelText}
      </text>
    );
  };

  // Custom X-Axis Date Tick (highlighted in bold cyan with subtle dot indicator)
  const CustomXAxisTick = ({ x, y, payload }) => {
    const isSelected = selectedDate === payload.value;
    let formatted = payload.value;
    try {
      formatted = format(parseISO(payload.value), 'MMM d');
    } catch (e) {}

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={12}
          textAnchor="middle"
          fill={isSelected ? '#00f2fe' : '#7e9cbe'}
          fontSize={isSelected ? 11.5 : 10.5}
          fontWeight={isSelected ? 700 : 500}
          style={{
            filter: isSelected ? 'drop-shadow(0 0 4px rgba(0,242,254,0.7))' : 'none',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectDateAndFocus(payload.value);
          }}
        >
          {formatted}
        </text>
        {isSelected && (
          <circle cx={0} cy={22} r={2} fill="#00f2fe" filter="drop-shadow(0 0 3px #00f2fe)" />
        )}
      </g>
    );
  };

  // Custom Chart Hover Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let dateLabel = data.date;
      try {
        dateLabel = format(parseISO(data.date), 'EEE, MMM d, yyyy');
      } catch (e) {}

      const itemPct = lifetimeViews
        ? ((Number(data.views || 0) / lifetimeViews) * 100).toFixed(1)
        : data.pctOfTotalViews || '0';

      return (
        <div className="bg-[#0c1b32]/95 backdrop-blur-md border border-[#1f4273] p-2.5 rounded-xl shadow-card-navy text-xs text-white pointer-events-none space-y-1 z-50">
          <div className="font-semibold text-white flex items-center justify-between gap-3">
            <span>{dateLabel}</span>
            {data.dayLabel && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#071324] text-[#00f2fe] border border-[#1b3e70] font-mono">
                {data.dayLabel}
              </span>
            )}
          </div>
          <div className="text-sm font-bold text-[#00f2fe] text-glow-cyan font-mono">
            {Number(data.views || 0).toLocaleString()} Daily Views
          </div>
          <div className="text-[10px] text-[#8fa3bf]">
            {itemPct}% of {Number(lifetimeViews).toLocaleString()} Lifetime Views
          </div>
          <div className="text-[10px] text-[#00d2c4] pt-1 border-t border-[#18345c]">
            Click to focus & inspect comments
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      aria-label="Daily Views Bar Chart"
      className="bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 sm:p-3.5 flex-1 min-h-0 h-full flex flex-col transition relative overflow-hidden"
    >
      {/* Subtle Cyan Ambient Radial Glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header: Selected date, views count, lifetime badge, and sliding timeline navigation controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-1.5 border-b border-[#18345c] gap-1.5 shrink-0 z-10">
        {selectedRecord ? (
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#8fa3bf] mb-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>Selected Date:</span>
              <strong className="text-white font-medium">
                {formattedSelectedDate}
              </strong>
              {selectedRecord.dayLabel && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#071324] text-[#00f2fe] font-mono font-semibold border border-[#1b3e70]">
                  {selectedRecord.dayLabel}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <span className="text-xl sm:text-2xl font-extrabold text-[#00f2fe] text-glow-cyan font-mono tracking-tight">
                {Number(selectedRecord.views || 0).toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-white">
                Actual Daily Views
              </span>

              {/* Distinct Lifetime Views Badge */}
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#071324] border border-[#1b3e70] text-[#7eb3d6] font-mono">
                {pctOfLifetime}% of {Number(lifetimeViews).toLocaleString()} Lifetime Views
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-xs text-[#8fa3bf]">
            <MousePointerClick className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>Click any date's bar to view daily views and YouTube comments</span>
          </div>
        )}

        {/* Stock-Market Timeline Navigation Controls */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto shrink-0">
          <button
            onClick={handlePrevBar}
            disabled={selectedIndex <= 0}
            className={`p-1.5 rounded-lg border transition flex items-center space-x-1 ${
              selectedIndex <= 0
                ? 'opacity-40 cursor-not-allowed bg-[#071324] text-[#4a6380] border-[#18345c]'
                : 'bg-[#071324] hover:bg-[#102342] text-[#8fa3bf] hover:text-[#00f2fe] border-[#18345c] active:scale-95'
            }`}
            title="Focus previous day's bar (Smooth slide left)"
            aria-label="Focus previous date bar"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono hidden md:inline">Prev</span>
          </button>

          <button
            onClick={handleResetToLatest}
            className="px-2 py-1 rounded-lg bg-[#071324] hover:bg-[#102342] text-[#5fa5c8] hover:text-[#00f2fe] border border-[#18345c] transition text-[10px] font-mono active:scale-95"
            title="Focus latest date on right side"
          >
            Latest ›|
          </button>

          <button
            onClick={handleNextBar}
            disabled={selectedIndex >= dailyData.length - 1}
            className={`p-1.5 rounded-lg border transition flex items-center space-x-1 ${
              selectedIndex >= dailyData.length - 1
                ? 'opacity-40 cursor-not-allowed bg-[#071324] text-[#4a6380] border-[#18345c]'
                : 'bg-[#071324] hover:bg-[#102342] text-[#8fa3bf] hover:text-[#00f2fe] border-[#18345c] active:scale-95'
            }`}
            title="Focus next day's bar (Smooth slide right)"
            aria-label="Focus next date bar"
          >
            <span className="text-[10px] font-mono hidden md:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Stock-Market Timeline Chart Body: Pinned Fixed Y-Axis + Horizontally Sliding Canvas */}
      <div className="w-full flex-1 min-h-0 flex flex-row relative z-10 overflow-hidden">
        
        {/* Fixed Pinned Y-Axis on the left */}
        <div className="w-9 sm:w-10 shrink-0 h-full select-none pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[{ date: '', views: 0 }]}
              margin={{ top: 20, right: 0, left: -14, bottom: 22 }}
            >
              <YAxis
                domain={[0, yMax]}
                stroke="#5f7e9e"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#7e9cbe', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => {
                  if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
                  return val;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontally Sliding Stock-Timeline Viewport */}
        <div
          ref={scrollContainerRef}
          onWheel={handleUserScroll}
          onTouchStart={handleUserScroll}
          tabIndex={0}
          aria-label="Horizontally scrollable daily views timeline"
          className="flex-1 min-w-0 h-full overflow-x-auto overflow-y-hidden custom-scrollbar focus:outline-none"
        >
          <div
            style={{
              width: `${totalChartWidth}px`,
              height: '100%'
            }}
            className="relative"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 20, right: marginRight, left: marginLeft, bottom: 22 }}
                barSize={BAR_SIZE}
                onClick={(state) => {
                  if (state && state.activePayload && state.activePayload.length) {
                    const clickedDate = state.activePayload[0].payload.date;
                    handleSelectDateAndFocus(clickedDate);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#132744" vertical={false} />

                {/* X-Axis Dates along the bottom */}
                <XAxis
                  dataKey="date"
                  stroke="#5f7e9e"
                  tickLine={false}
                  interval={0}
                  tick={<CustomXAxisTick />}
                  dy={6}
                />

                {/* Hidden Y-Axis matching the pinned Y-Axis domain for perfect grid alignment */}
                <YAxis domain={[0, yMax]} hide={true} />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(0, 242, 254, 0.05)' }}
                />

                <Bar
                  dataKey="views"
                  isAnimationActive={false}
                  radius={[6, 6, 0, 0]}
                  cursor="pointer"
                  onClick={(entry) => {
                    const target = entry?.date || entry?.payload?.date;
                    if (target) handleSelectDateAndFocus(target);
                  }}
                >
                  {/* Custom On-bar daily views count label */}
                  <LabelList
                    dataKey="views"
                    content={<CustomBarLabel />}
                  />

                  {dailyData.map((entry) => {
                    const isSelected = selectedDate === entry.date;
                    return (
                      <Cell
                        key={`cell-${entry.date}`}
                        fill={isSelected ? '#00f2fe' : '#00a8cc'}
                        stroke={isSelected ? '#ffffff' : 'transparent'}
                        strokeWidth={isSelected ? 1.5 : 0}
                        className="transition-all duration-200 hover:opacity-90"
                        style={{
                          cursor: 'pointer',
                          filter: isSelected
                            ? 'drop-shadow(0px 0px 14px rgba(0, 242, 254, 0.95))'
                            : undefined
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDateAndFocus(entry.date);
                        }}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Slim Timeline Guide & Footer inside Center Panel */}
      <div className="pt-2 mt-1 border-t border-[#18345c] flex items-center justify-between text-[10px] text-[#8fa3bf] shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] inline-block shadow-[0_0_8px_#00f2fe] animate-pulse" />
          <span>Click any bar or Next/Prev to smoothly slide timeline into focus • Scrollable</span>
        </div>
      </div>

    </div>
  );
}
