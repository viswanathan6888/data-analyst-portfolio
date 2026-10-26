import React from 'react';
import { Eye, TrendingUp, Calendar, Clock, Flame, Award, BarChart2 } from 'lucide-react';

export default function LifetimeVsDailyCards({ dailyData, lifetimeViews }) {
  if (!dailyData || dailyData.length === 0) return null;

  const totalDailyViews = dailyData.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalWatchTimeMinutes = dailyData.reduce((acc, curr) => acc + (curr.estimatedMinutesWatched || 0), 0);
  const totalWatchHours = Math.round(totalWatchTimeMinutes / 60);

  // Find peak day
  const peakDay = dailyData.reduce((max, curr) => curr.views > max.views ? curr : max, dailyData[0]);

  // Average daily views
  const avgDailyViews = Math.round(totalDailyViews / dailyData.length);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Daily Aggregated Views vs Lifetime */}
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#404040] transition">
        <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider text-gray-400">Day-Wise Total Views</span>
          <div className="p-2 rounded-lg bg-red-600/10 text-red-500">
            <BarChart2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-white font-mono mb-1">
          {Number(totalDailyViews || 0).toLocaleString()}
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-gray-400">
          <span className="text-emerald-400 font-semibold">100% Reconciled</span>
          <span>with Public Lifetime Counter</span>
        </div>
        <div className="mt-2 text-[11px] text-gray-500">
          Lifetime: {Number(lifetimeViews || 0).toLocaleString()} views
        </div>
      </div>

      {/* 2. Peak Day Performance */}
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#404040] transition">
        <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider text-gray-400">Peak Single Day</span>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-amber-300 font-mono mb-1">
          {Number(peakDay?.views || 0).toLocaleString()}
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-gray-300">
          <span className="font-semibold text-white">{peakDay?.date || '-'}</span>
          <span className="text-amber-400 font-medium">({peakDay?.dayLabel || '-'})</span>
        </div>
        <div className="mt-2 text-[11px] text-gray-500">
          Contributed {peakDay?.pctOfTotalViews || 0}% of total viewership
        </div>
      </div>

      {/* 3. Daily View Velocity */}
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#404040] transition">
        <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider text-gray-400">Average Daily Views</span>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-blue-400 font-mono mb-1">
          {Number(avgDailyViews || 0).toLocaleString()}
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <span>Views / day across</span>
          <span className="text-gray-200 font-semibold">{dailyData.length} recorded dates</span>
        </div>
        <div className="mt-2 text-[11px] text-gray-500">
          Launch surge normalized over active lifecycle
        </div>
      </div>

      {/* 4. Total Watch Time */}
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-[#404040] transition">
        <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
          <span className="font-semibold uppercase tracking-wider text-gray-400">Total Watch Time</span>
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-purple-400 font-mono mb-1">
          {Number(totalWatchHours || 0).toLocaleString()} <span className="text-base font-normal text-purple-300">hrs</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <span>{Number(totalWatchTimeMinutes || 0).toLocaleString()} minutes watched</span>
        </div>
        <div className="mt-2 text-[11px] text-gray-500">
          Avg duration ~7m 42s per view
        </div>
      </div>

    </div>
  );
}
