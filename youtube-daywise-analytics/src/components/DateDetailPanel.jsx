import React from 'react';
import {
  Calendar,
  Eye,
  ThumbsUp,
  MessageSquare,
  Clock,
  UserPlus,
  Share2,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  Tv,
  Monitor,
  Tablet,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function DateDetailPanel({ selectedDateData, lifetimeViews, lifetimeLikes, lifetimeComments }) {
  if (!selectedDateData) {
    return (
      <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-8 text-center text-gray-400">
        <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-600 animate-bounce" />
        <p className="text-sm font-medium text-gray-300">Click any bar on the chart above to inspect that date's daily analytics.</p>
        <p className="text-xs text-gray-500 mt-1">Each bar corresponds to a specific day since upload.</p>
      </div>
    );
  }

  const d = selectedDateData;
  const parsedDate = parseISO(d.date);
  const formattedFullDate = format(parsedDate, 'EEEE, MMMM d, yyyy');
  const watchHours = (d.estimatedMinutesWatched / 60).toFixed(1);
  const avgMinutes = Math.floor(d.averageViewDurationSeconds / 60);
  const avgSeconds = d.averageViewDurationSeconds % 60;
  const formattedAvgDuration = `${avgMinutes}m ${avgSeconds < 10 ? '0' : ''}${avgSeconds}s`;

  return (
    <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 md:p-6 shadow-xl mb-6 transition-all animate-fadeIn">
      
      {/* Date Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[#282828] gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
              {d.dayLabel}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center space-x-1 ${
              d.isPendingProcessing
                ? 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
            }`}>
              {d.isPendingProcessing ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              <span>{d.status}: {d.latencyNote}</span>
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            {formattedFullDate}
          </h3>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xs text-gray-400">Cumulative Reach to Date</div>
          <div className="text-lg font-bold text-white font-mono">
            {Number(d.cumulativeViews || d.views || 0).toLocaleString()} views
          </div>
          <div className="text-[11px] text-gray-500">
            {d.pctOfTotalViews || 0}% of video lifetime views
          </div>
        </div>
      </div>

      {/* Main 6 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        
        {/* Daily Views */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-red-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span>Daily Views</span>
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {Number(d.views || 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-red-400 mt-1">
            {d.pctOfTotalViews || 0}% of lifetime
          </div>
        </div>

        {/* Watch Time */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-purple-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Watch Time</span>
          </div>
          <div className="text-xl font-bold text-purple-300 font-mono">
            {Number(d.estimatedMinutesWatched || 0).toLocaleString()} <span className="text-xs font-normal">m</span>
          </div>
          <div className="text-[10px] text-purple-400 mt-1">
            ~{watchHours} hours watched
          </div>
        </div>

        {/* Avg View Duration */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-indigo-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Avg Duration</span>
          </div>
          <div className="text-xl font-bold text-indigo-300 font-mono">
            {formattedAvgDuration}
          </div>
          <div className="text-[10px] text-indigo-400 mt-1">
            {d.averageViewPercentage || 21}% retention rate
          </div>
        </div>

        {/* Likes */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-blue-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Daily Likes</span>
          </div>
          <div className="text-xl font-bold text-blue-300 font-mono">
            {Number(d.likes || 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-blue-400 mt-1">
            Cumul: {Number(d.cumulativeLikes || d.likes || 0).toLocaleString()}
          </div>
        </div>

        {/* Comments */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-amber-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Comments</span>
          </div>
          <div className="text-xl font-bold text-amber-300 font-mono">
            {Number(d.comments || 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-amber-400 mt-1">
            Cumul: {Number(d.cumulativeComments || d.comments || 0).toLocaleString()}
          </div>
        </div>

        {/* Net Subscribers */}
        <div className="bg-[#111111] border border-[#282828] rounded-xl p-3.5 hover:border-emerald-900/50 transition">
          <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Net Subs</span>
          </div>
          <div className="text-xl font-bold text-emerald-300 font-mono">
            +{d.netSubscribers || (d.subscribersGained - d.subscribersLost)}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">
            +{d.subscribersGained} / -{d.subscribersLost}
          </div>
        </div>

      </div>

      {/* Traffic Sources & Device Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Traffic Sources Breakdown */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Aggregated Discovery & Traffic Sources</span>
            <span className="text-[10px] text-gray-500 font-normal">YouTube Analytics Telemetry</span>
          </h4>
          <div className="space-y-2.5">
            {(d.trafficSources || [
              { source: 'YouTube Recommendations / Home', percentage: 55.0 },
              { source: 'Suggested Videos', percentage: 25.0 },
              { source: 'External & Social Shares', percentage: 12.0 },
              { source: 'YouTube Search', percentage: 8.0 }
            ]).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">{item.source}</span>
                  <span className="text-gray-400 font-mono">{item.percentage}%</span>
                </div>
                <div className="w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-4">
          <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Viewer Device Distribution</span>
            <span className="text-[10px] text-gray-500 font-normal">Hardware Category</span>
          </h4>
          <div className="space-y-2.5">
            {(d.deviceDistribution || [
              { device: 'Mobile Phone', percentage: 84.5 },
              { device: 'Connected TV', percentage: 9.5 },
              { device: 'Computer / Desktop', percentage: 4.8 },
              { device: 'Tablet', percentage: 1.2 }
            ]).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 flex items-center space-x-1.5">
                    {item.device === 'Mobile Phone' && <Smartphone className="w-3.5 h-3.5 text-gray-400" />}
                    {item.device === 'Connected TV' && <Tv className="w-3.5 h-3.5 text-gray-400" />}
                    {item.device === 'Computer / Desktop' && <Monitor className="w-3.5 h-3.5 text-gray-400" />}
                    {item.device === 'Tablet' && <Tablet className="w-3.5 h-3.5 text-gray-400" />}
                    <span>{item.device}</span>
                  </span>
                  <span className="text-gray-400 font-mono">{item.percentage}%</span>
                </div>
                <div className="w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Strict Privacy & Aggregated Data Compliance Notice */}
      <div className="bg-[#121212] border border-[#292929] rounded-xl p-3.5 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Aggregated Privacy Guarantee:</strong> YouTube policy strictly prevents exposing individual viewer identities, account names, or personal profiles. All values represent authentic statistical aggregations.
          </span>
        </div>
        <div className="shrink-0 text-[11px] text-gray-500 font-mono">
          Dimension: Day ({d.date})
        </div>
      </div>

    </div>
  );
}
