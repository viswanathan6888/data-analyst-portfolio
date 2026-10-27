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

  // Windowing for high-performance rendering across multi-year histories (up to 20+ years / 7,800+ days)
  const WINDOW_SIZE = 30;
  const isWindowed = dailyData.length > WINDOW_SIZE;
  const [windowStartIndex, setWindowStartIndex] = useState(() => Math.max(0, dailyData.length - WINDOW_SIZE));

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

  // When dailyData length or video changes, update default window position
  useEffect(() => {
    if (!isWindowed) {
      setWindowStartIndex(0);
    } else {
      if (selectedDate) {
        const idx = dailyData.findIndex((d) => d.date === selectedDate);
        if (idx !== -1) {
          setWindowStartIndex((prev) => {
            if (idx < prev || idx >= prev + WINDOW_SIZE) {
              return Math.max(0, Math.min(dailyData.length - WINDOW_SIZE, Math.floor(idx - WINDOW_SIZE / 2)));
            }
            return prev;
          });
        }
      } else {
        setWindowStartIndex(Math.max(0, dailyData.length - WINDOW_SIZE));
      }
    }
  }, [dailyData.length, isWindowed]);

  // Fixed slot width per date bar to strictly prevent shrinking or compressing
  const SLOT_WIDTH = 72; // Consistent bar slot width & spacing
  const BAR_SIZE = 38;   // Consistent bar thickness

  // Dynamic side margins allow any bar (from earliest to latest) to slide smoothly into focal center
  const marginLeft = Math.max(30, Math.round(containerWidth * 0.35));
  const marginRight = Math.max(35, Math.round(containerWidth * 0.35));

  // Active slice of visible bars
  const visibleData = isWindowed
    ? dailyData.slice(windowStartIndex, windowStartIndex + WINDOW_SIZE)
    : dailyData;

  const plotWidth = visibleData.length * SLOT_WIDTH;
  const totalChartWidth = plotWidth + marginLeft + marginRight;

  // Selected date indices
  const selectedIndex = dailyData.findIndex((d) => d.date === selectedDate);
  const visibleSelectedIndex = visibleData.findIndex((d) => d.date === selectedDate);

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

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    let startTime = null;
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
   * Calculate target scrollLeft to bring the visible bar at index into clear focus
   */
  const getTargetScrollForVisibleIndex = (index) => {
    if (!scrollContainerRef.current || index < 0 || index >= visibleData.length) return 0;
    const viewportWidth = scrollContainerRef.current.clientWidth;
    const barCenterX = marginLeft + (index + 0.5) * SLOT_WIDTH;
    const targetScroll = barCenterX - (viewportWidth / 2);
    const maxScroll = Math.max(0, scrollContainerRef.current.scrollWidth - viewportWidth);
    return Math.max(0, Math.min(targetScroll, maxScroll));
  };

  const scrollToVisibleDateIndex = (index, smooth = true) => {
    if (index < 0 || index >= visibleData.length) return;
    const targetScroll = getTargetScrollForVisibleIndex(index);
    if (smooth) {
      smoothScrollTo(targetScroll, 340);
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = targetScroll;
    }
  };

  /**
   * Select a date immediately, adjust window if needed, and slide into focal center
   */
  const handleSelectDateAndFocus = (date) => {
    if (!date) return;
    prevSelectedDateRef.current = date;
    onSelectDate(date);

    const fullIdx = dailyData.findIndex((d) => d.date === date);
    if (fullIdx !== -1 && isWindowed) {
      if (fullIdx < windowStartIndex || fullIdx >= windowStartIndex + WINDOW_SIZE) {
        const newStart = Math.max(0, Math.min(dailyData.length - WINDOW_SIZE, Math.floor(fullIdx - WINDOW_SIZE / 2)));
        setWindowStartIndex(newStart);
        setTimeout(() => {
          const newVisibleIdx = fullIdx - newStart;
          scrollToVisibleDateIndex(newVisibleIdx, true);
        }, 30);
        return;
      }
    }

    const vIdx = visibleData.findIndex((d) => d.date === date);
    if (vIdx !== -1) {
      scrollToVisibleDateIndex(vIdx, true);
    }
  };

  // Jump to Day 1 (Launch Date)
  const handleJumpToDay1 = () => {
    if (dailyData.length === 0) return;
    if (isWindowed) {
      setWindowStartIndex(0);
      const day1Date = dailyData[0].date;
      onSelectDate(day1Date);
      setTimeout(() => {
        scrollToVisibleDateIndex(0, true);
      }, 40);
    } else {
      handleSelectDateAndFocus(dailyData[0].date);
    }
  };

  // Focus latest date on right
  const handleResetToLatest = () => {
    if (dailyData.length === 0) return;
    const latestDate = dailyData[dailyData.length - 1].date;
    if (isWindowed) {
      const targetStart = Math.max(0, dailyData.length - WINDOW_SIZE);
      setWindowStartIndex(targetStart);
      onSelectDate(latestDate);
      setTimeout(() => {
        scrollToVisibleDateIndex(WINDOW_SIZE - 1, true);
      }, 40);
    } else {
      handleSelectDateAndFocus(latestDate);
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
        const vIdx = visibleData.findIndex((d) => d.date === selectedDate);
        if (vIdx !== -1) {
          scrollToVisibleDateIndex(vIdx, false);
        } else {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // When selectedDate changes externally
  useEffect(() => {
    if (selectedDate && selectedDate !== prevSelectedDateRef.current) {
      prevSelectedDateRef.current = selectedDate;
      const vIdx = visibleData.findIndex((d) => d.date === selectedDate);
      if (vIdx !== -1) {
        scrollToVisibleDateIndex(vIdx, true);
      }
    }
  }, [selectedDate, windowStartIndex]);

  if (!dailyData || dailyData.length === 0) {
    return (
      <div
        aria-label="Daily Views Bar Chart"
        className="bg-[#0c1b32] panel-blue-neon-glow rounded-2xl p-3 sm:p-3.5 flex-1 min-h-0 h-full flex flex-col justify-between transition relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-[#18345c] shrink-0 z-10">
          <div className="flex items-center space-x-2 text-xs text-[#8fa3bf]">
            <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="font-semibold text-white">Public Video Overview & Data Availability</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#071324] border border-[#1b3e70] text-[#00f2fe] font-mono">
            {lifetimeViews ? `${Number(lifetimeViews).toLocaleString()} Lifetime Views` : 'Live API'}
          </span>
        </div>

        <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 p-1 z-10">
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
    if (val === null || val === undefined) return 'N/A';
    const num = Number(val);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  // Percentage of lifetime total views
  const pctOfLifetime = selectedRecord?.views && lifetimeViews
    ? ((selectedRecord.views / lifetimeViews) * 100).toFixed(1)
    : selectedRecord?.pctOfTotalViews || '0';

  // Latest verified / fully processed day in timeline
  const lastProcessedRecord = [...dailyData].reverse().find(
    (d) => !d.isPendingProcessing && d.views !== null && d.views !== undefined
  );
  // In-flight / pending today record
  const todayPendingRecord = dailyData.find((d) => d.isPendingProcessing);

  // Dynamic Adaptive Y-Axis Max Domain
  const numericViews = dailyData
    .filter((d) => d.views !== null && d.views !== undefined)
    .map((d) => Number(d.views));
  const rawMaxViews = numericViews.length > 0 ? Math.max(...numericViews, 10) : 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMaxViews)));
  const step = magnitude >= 10000 ? magnitude / 2 : (magnitude || 10);
  const yMax = Math.ceil((rawMaxViews * 1.18) / step) * step;

  // Prepare chart display data: handles unavailable daily metrics cleanly
  const chartData = visibleData.map((d) => {
    const isValNull = d.views === null || d.views === undefined;
    return {
      ...d,
      chartViews: isValNull ? 0 : Number(d.views),
      isProtected: isValNull
    };
  });

  // Custom on-bar count label
  const CustomBarLabel = (props) => {
    const { x, y, width, index } = props;
    const item = chartData[index];
    if (!item) return null;
    const isSelected = selectedDate === item.date;
    const isPending = item.isPendingProcessing;
    const isProtected = (item.isProtected || item.views === null) && !isPending;
    const labelText = isPending ? 'Pending' : (isProtected ? 'N/A' : formatOnBarCount(item.views));

    return (
      <text
        x={x + width / 2}
        y={isProtected || isPending ? y - 4 : y - 6}
        textAnchor="middle"
        fill={isSelected ? (isPending ? '#facc15' : '#00f2fe') : (isPending ? '#eab308' : (isProtected ? '#5fa5c8' : '#7e9cbe'))}
        fontSize={isSelected ? 11 : 9.5}
        fontWeight={isSelected || isPending ? 700 : 500}
        fontFamily="monospace"
        style={{
          filter: isSelected ? `drop-shadow(0 0 6px ${isPending ? 'rgba(250, 204, 21, 0.85)' : 'rgba(0,242,254,0.85)'})` : 'none',
          pointerEvents: 'none'
        }}
      >
        {labelText}
      </text>
    );
  };

  // Custom X-Axis Date Tick showing both Calendar Date and Sequential Day Number
  const CustomXAxisTick = ({ x, y, payload }) => {
    const isSelected = selectedDate === payload.value;
    const item = chartData.find((d) => d.date === payload.value);
    let formatted = payload.value;
    try {
      formatted = format(parseISO(payload.value), 'MMM d');
    } catch (e) {}

    const dayNumberText = item?.dayIndex === 1
      ? 'Day 1'
      : (item?.dayIndex ? `D${item.dayIndex}` : '');

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="middle"
          fill={isSelected ? '#00f2fe' : '#7e9cbe'}
          fontSize={isSelected ? 11 : 10}
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
        {dayNumberText && (
          <text
            x={0}
            y={0}
            dy={22}
            textAnchor="middle"
            fill={isSelected ? '#ffffff' : (item?.dayIndex === 1 ? '#00f2fe' : '#5fa5c8')}
            fontSize={9}
            fontWeight={item?.dayIndex === 1 || isSelected ? 700 : 500}
            fontFamily="monospace"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectDateAndFocus(payload.value);
            }}
          >
            {dayNumberText}
          </text>
        )}
        {isSelected && (
          <circle cx={0} cy={30} r={2} fill="#00f2fe" filter="drop-shadow(0 0 3px #00f2fe)" />
        )}
      </g>
    );
  };

  // Custom Chart Hover Tooltip with Full Performance Metrics
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let dateLabel = data.date;
      try {
        dateLabel = format(parseISO(data.date), 'EEE, MMM d, yyyy');
      } catch (e) {}

      const isProtected = data.isProtected || data.views === null;

      const itemPct = lifetimeViews && !isProtected
        ? ((Number(data.views || 0) / lifetimeViews) * 100).toFixed(1)
        : data.pctOfTotalViews || '0';

      const avgDurSec = Number(data.averageViewDurationSeconds || 0);
      const avgDurMin = Math.floor(avgDurSec / 60);
      const avgDurRemSec = avgDurSec % 60;
      const watchMins = Number(data.estimatedMinutesWatched || 0);
      const watchHours = (watchMins / 60).toFixed(1);

      return (
        <div className="bg-[#0c1b32]/95 backdrop-blur-md border border-[#1f4273] p-2.5 rounded-xl shadow-card-navy text-xs text-white pointer-events-none space-y-1.5 z-50 min-w-[210px]">
          <div className="font-semibold text-white flex items-center justify-between gap-3">
            <span>{dateLabel}</span>
            {data.dayLabel && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#071324] text-[#00f2fe] border border-[#1b3e70] font-mono">
                {data.dayLabel}
              </span>
            )}
          </div>

          {data.isPendingProcessing ? (
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#eab308] font-mono">
                Daily Views: Pending
              </div>
              <div className="text-[10px] text-amber-200 bg-[#291e07] p-1.5 rounded border border-amber-500/40">
                ⏳ YouTube Analytics has a 48–72 hour aggregation latency. Today's metrics are actively accumulating in real time.
              </div>
            </div>
          ) : isProtected ? (
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#7e9cbe] font-mono">
                Daily Views: N/A
              </div>
              <div className="text-[10px] text-[#5fa5c8] bg-[#071324] p-1.5 rounded border border-[#1b3e70]">
                🔒 Historical daily views for third-party channels are protected by Google. Connect OAuth to unlock.
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm font-bold text-[#00f2fe] text-glow-cyan font-mono">
                {Number(data.views || 0).toLocaleString()} Daily Views
              </div>
              <div className="text-[10px] text-[#8fa3bf]">
                {itemPct}% of {Number(lifetimeViews).toLocaleString()} Lifetime Views
              </div>

              {/* Detailed Performance Metrics */}
              <div className="pt-1.5 border-t border-[#18345c] grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono">
                <span className="text-[#8fa3bf]">Watch Time:</span>
                <span className="text-[#00d2c4] text-right font-semibold">{watchMins.toLocaleString()}m ({watchHours}h)</span>
                <span className="text-[#8fa3bf]">Avg Duration:</span>
                <span className="text-[#00d2c4] text-right font-semibold">{avgDurMin}m {avgDurRemSec}s {data.averageViewPercentage ? `(${data.averageViewPercentage}%)` : ''}</span>
                <span className="text-[#8fa3bf]">Daily Shares:</span>
                <span className="text-[#00d2c4] text-right font-semibold">{Number(data.shares || 0).toLocaleString()}</span>
                <span className="text-[#8fa3bf]">Net Subs:</span>
                <span className="text-emerald-400 text-right font-semibold">+{Number(data.netSubscribers || (data.subscribersGained || 0)).toLocaleString()}</span>
              </div>
            </>
          )}

          <div className="text-[9.5px] text-[#6296b8] pt-1 border-t border-[#18345c]/60">
            Click bar to inspect day details & comments
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[radial-gradient(ellipse_at_top,rgba(0,242,254,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header: Selected date, views count, lifetime badge, metrics pills, and timeline navigation controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-1 border-b border-[#18345c] gap-1.5 shrink-0 z-10">
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

            {selectedRecord.views !== null && selectedRecord.views !== undefined ? (
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#00f2fe] text-glow-cyan font-mono tracking-tight">
                  {Number(selectedRecord.views || 0).toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-white">
                  Actual Daily Views
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#071324] border border-[#1b3e70] text-[#7eb3d6] font-mono">
                  {pctOfLifetime}% of {Number(lifetimeViews).toLocaleString()} Lifetime Views
                </span>
              </div>
            ) : selectedRecord.isPendingProcessing ? (
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#eab308] font-mono tracking-tight">
                    Today's Analytics Data Pending
                  </span>
                  <span className="text-xs font-semibold text-[#facc15]">
                    Daily Views In Progress
                  </span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#291e07] border border-amber-500/40 text-amber-300 font-mono">
                    24–48h Aggregation Lag
                  </span>
                </div>
                {lastProcessedRecord && (
                  <div className="text-[11px] text-[#8fa3bf] mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>Latest Available Reporting Date:</span>
                    <button
                      type="button"
                      onClick={() => handleSelectDateAndFocus(lastProcessedRecord.date)}
                      className="text-[#00f2fe] font-mono font-bold underline hover:text-[#38bdf8] cursor-pointer"
                      title="Click to view latest verified daily views"
                    >
                      {lastProcessedRecord.date} ({Number(lastProcessedRecord.views || 0).toLocaleString()} views)
                    </button>
                    <span className="text-[#6296b8]">•</span>
                    <span className="text-[#6296b8] font-mono text-[10px]">
                      Live in-flight plays accumulating on YouTube player
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-[#7e9cbe] font-mono tracking-tight">
                  N/A
                </span>
                <span className="text-xs font-semibold text-[#8fa3bf]">
                  Daily Views Protected
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#071324] border border-[#1b3e70] text-[#00f2fe] font-mono">
                  Requires Channel OAuth
                </span>
              </div>
            )}

            {/* Metrics Pills: Watch Time, Avg Duration, Daily Shares, Net Subscribers */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {selectedRecord.estimatedMinutesWatched !== undefined && selectedRecord.estimatedMinutesWatched !== null && (
                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#071324] border border-[#18345c] text-[#c7d7eb] font-mono flex items-center space-x-1">
                  <span className="text-[#8fa3bf]">Watch:</span>
                  <strong className="text-[#00d2c4]">{Number(selectedRecord.estimatedMinutesWatched).toLocaleString()}m</strong>
                  <span className="text-[#6296b8]">({(selectedRecord.estimatedMinutesWatched / 60).toFixed(0)}h)</span>
                </span>
              )}

              {selectedRecord.averageViewDurationSeconds !== undefined && selectedRecord.averageViewDurationSeconds !== null && (
                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#071324] border border-[#18345c] text-[#c7d7eb] font-mono flex items-center space-x-1">
                  <span className="text-[#8fa3bf]">Avg Duration:</span>
                  <strong className="text-[#00f2fe]">
                    {Math.floor(selectedRecord.averageViewDurationSeconds / 60)}m {selectedRecord.averageViewDurationSeconds % 60}s
                  </strong>
                  {selectedRecord.averageViewPercentage && (
                    <span className="text-[#00d2c4]">({selectedRecord.averageViewPercentage}%)</span>
                  )}
                </span>
              )}

              {selectedRecord.shares !== undefined && selectedRecord.shares !== null && (
                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#071324] border border-[#18345c] text-[#c7d7eb] font-mono flex items-center space-x-1">
                  <span className="text-[#8fa3bf]">Shares:</span>
                  <strong className="text-[#05d5b3]">{Number(selectedRecord.shares).toLocaleString()}</strong>
                </span>
              )}

              {(selectedRecord.netSubscribers !== undefined && selectedRecord.netSubscribers !== null) && (
                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#071324] border border-[#18345c] text-[#c7d7eb] font-mono flex items-center space-x-1">
                  <span className="text-[#8fa3bf]">Net Subs:</span>
                  <strong className="text-emerald-400">+{Number(selectedRecord.netSubscribers).toLocaleString()}</strong>
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-xs text-[#8fa3bf]">
            <MousePointerClick className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>Click any date's bar to view daily views and YouTube comments</span>
          </div>
        )}

        {/* Timeline Navigation Controls */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto shrink-0">
          {todayPendingRecord && selectedRecord?.date !== todayPendingRecord.date && (
            <button
              type="button"
              onClick={() => handleSelectDateAndFocus(todayPendingRecord.date)}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#291e07] hover:bg-[#3d2c0a] text-amber-300 border border-amber-500/40 text-[10px] font-mono transition cursor-pointer"
              title={`Today (${todayPendingRecord.date}) is pending YouTube Analytics aggregation. Click to view pending status.`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Today Pending</span>
            </button>
          )}

          {todayPendingRecord && selectedRecord?.date === todayPendingRecord.date && lastProcessedRecord && (
            <button
              type="button"
              onClick={() => handleSelectDateAndFocus(lastProcessedRecord.date)}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#0c2438] hover:bg-[#133550] text-[#00f2fe] border border-[#00f2fe]/40 text-[10px] font-mono transition cursor-pointer"
              title={`Jump to latest verified reporting date (${lastProcessedRecord.date})`}
            >
              <span>‹ View Verified ({Number(lastProcessedRecord.views || 0).toLocaleString()})</span>
            </button>
          )}

          {isWindowed && (
            <button
              onClick={handleJumpToDay1}
              className="px-2 py-1 rounded-lg bg-[#071324] hover:bg-[#102342] text-[#5fa5c8] hover:text-[#00f2fe] border border-[#18345c] transition text-[10px] font-mono active:scale-95"
              title="Jump to original publication date (Day 1)"
            >
              |◀ Day 1
            </button>
          )}

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

      {/* Multi-Year Timeline Scrubber (displayed when history spans > 30 days) */}
      {isWindowed && (
        <div className="flex items-center justify-between px-2.5 py-1 mb-1 rounded-lg bg-[#071324]/80 border border-[#18345c] text-[10px] text-[#8fa3bf] shrink-0 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-[#00f2fe] font-mono font-semibold">
              Timeline:
            </span>
            <span className="font-mono text-[#c7d7eb]">
              {visibleData[0]?.dayLabel} ({visibleData[0]?.date}) – {visibleData[visibleData.length - 1]?.dayLabel} ({visibleData[visibleData.length - 1]?.date})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[9.5px] font-mono text-[#5fa5c8]">
              Day {windowStartIndex + 1}–{windowStartIndex + visibleData.length} of {dailyData.length}
            </span>
            <input
              type="range"
              min={0}
              max={dailyData.length - WINDOW_SIZE}
              value={windowStartIndex}
              onChange={(e) => {
                const newStart = parseInt(e.target.value, 10);
                setWindowStartIndex(newStart);
              }}
              className="w-24 sm:w-36 h-1.5 bg-[#102342] rounded-lg appearance-none cursor-pointer accent-[#00f2fe]"
              title="Scrub timeline across all calendar days"
            />
          </div>
        </div>
      )}

      {/* Main Timeline Chart Body: Pinned Fixed Y-Axis + Horizontally Sliding Canvas */}
      <div className="w-full flex-1 min-h-0 flex flex-row relative z-10 overflow-hidden">
        
        {/* Fixed Pinned Y-Axis on the left */}
        <div className="w-9 sm:w-10 shrink-0 h-full select-none pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[{ date: '', views: 0 }]}
              margin={{ top: 20, right: 0, left: -14, bottom: 32 }}
            >
              <YAxis
                domain={[0, yMax]}
                stroke="#5f7e9e"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#7e9cbe', fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(val) => {
                  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
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
                data={chartData}
                margin={{ top: 20, right: marginRight, left: marginLeft, bottom: 32 }}
                barSize={BAR_SIZE}
                onClick={(state) => {
                  if (state && state.activePayload && state.activePayload.length) {
                    const clickedDate = state.activePayload[0].payload.date;
                    handleSelectDateAndFocus(clickedDate);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#132744" vertical={false} />

                {/* X-Axis Dates & Day Numbers along the bottom */}
                <XAxis
                  dataKey="date"
                  stroke="#5f7e9e"
                  tickLine={false}
                  interval={0}
                  tick={<CustomXAxisTick />}
                  dy={4}
                />

                <YAxis domain={[0, yMax]} hide={true} />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(0, 242, 254, 0.05)' }}
                />

                <Bar
                  dataKey="chartViews"
                  minPointSize={8}
                  isAnimationActive={false}
                  radius={[6, 6, 0, 0]}
                  cursor="pointer"
                  onClick={(entry) => {
                    const target = entry?.date || entry?.payload?.date;
                    if (target) handleSelectDateAndFocus(target);
                  }}
                >
                  <LabelList
                    dataKey="chartViews"
                    content={<CustomBarLabel />}
                  />

                  {chartData.map((entry) => {
                    const isSelected = selectedDate === entry.date;
                    const isPending = entry.isPendingProcessing;
                    const isProtected = (entry.isProtected || entry.views === null) && !isPending;
                    return (
                      <Cell
                        key={`cell-${entry.date}`}
                        fill={
                          isSelected
                            ? (isPending ? '#eab308' : (isProtected ? 'rgba(0, 242, 254, 0.45)' : '#00f2fe'))
                            : (isPending ? 'rgba(234, 179, 8, 0.25)' : (isProtected ? 'rgba(16, 35, 66, 0.7)' : '#00a8cc'))
                        }
                        stroke={
                          isSelected
                            ? (isPending ? '#facc15' : '#00f2fe')
                            : (isPending ? '#ca8a04' : (isProtected ? '#1e3a64' : 'transparent'))
                        }
                        strokeWidth={isSelected ? 1.5 : (isPending || isProtected ? 1 : 0)}
                        strokeDasharray={isPending || isProtected ? '3 2' : undefined}
                        className="transition-all duration-200 hover:opacity-90"
                        style={{
                          cursor: 'pointer',
                          filter: isSelected
                            ? `drop-shadow(0px 0px 14px ${isPending ? 'rgba(250, 204, 21, 0.95)' : 'rgba(0, 242, 254, 0.95)'})`
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

      {/* Slim Timeline Guide & Footer */}
      <div className="pt-2 mt-1 border-t border-[#18345c] flex items-center justify-between text-[10px] text-[#8fa3bf] shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] inline-block shadow-[0_0_8px_#00f2fe] animate-pulse" />
          <span>Click any bar or Next/Prev to smoothly slide timeline into focus • Starts from Day 1 (Launch Date)</span>
        </div>
        <span className="font-mono text-[#5fa5c8] hidden sm:inline">
          {dailyData.length} Calendar Days Tracked
        </span>
      </div>

    </div>
  );
}
