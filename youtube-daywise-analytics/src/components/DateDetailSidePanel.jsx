import React, { useState } from 'react';
import {
  X,
  Calendar,
  Eye,
  Clock,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Mail,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function DateDetailSidePanel({
  selectedDateData,
  isOpen,
  onClose,
  submissions = [],
  formSettings = {},
  onOpenFormModal
}) {
  if (!isOpen || !selectedDateData) return null;

  const d = selectedDateData;
  let formattedFullDate = d.date;
  try {
    const parsed = parseISO(d.date);
    formattedFullDate = format(parsed, 'EEEE, MMMM d, yyyy');
  } catch (e) {}

  const hasWatchTime = d.estimatedMinutesWatched !== undefined && d.estimatedMinutesWatched !== null;
  const watchHours = hasWatchTime ? ((d.estimatedMinutesWatched || 0) / 60).toFixed(1) : null;

  const hasDuration = d.averageViewDurationSeconds !== undefined && d.averageViewDurationSeconds !== null;
  const avgSec = d.averageViewDurationSeconds || 0;
  const avgMin = Math.floor(avgSec / 60);
  const avgRemSec = avgSec % 60;
  const formattedAvgDuration = `${avgMin}m ${avgRemSec < 10 ? '0' : ''}${avgRemSec}s`;

  const hasLikes = d.likes !== undefined && d.likes !== null;
  const hasComments = d.comments !== undefined && d.comments !== null;
  const hasNetSubs = d.netSubscribers !== undefined || d.subscribersGained !== undefined;

  // Filter voluntary email submissions for the selected date
  const [showAllDates, setShowAllDates] = useState(false);
  const dateSubmissions = (submissions || []).filter((s) => s.date === d.date);
  const displayedSubmissions = showAllDates ? (submissions || []) : dateSubmissions;

  return (
    <aside
      aria-label="Date analytics and viewer details"
      className="w-full lg:w-96 bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#2e2e2e] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col shrink-0 transition-all duration-300 animate-fadeIn max-h-[calc(100vh-100px)] overflow-y-auto sticky top-20"
    >
      {/* Side Panel Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-gray-200 dark:border-[#282828]">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-500">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Date Details
            </h3>
            <span className="text-[11px] text-gray-500 font-mono">
              {d.date}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525] transition"
          title="Close details"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Date Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          {d.dayLabel && (
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              {d.dayLabel}
            </span>
          )}
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            {formattedFullDate}
          </h4>
        </div>
        {d.status && (
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center space-x-1 ${
            d.isPendingProcessing
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800/40'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800/40'
          }`}>
            {d.isPendingProcessing ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
            <span>{d.status}</span>
          </span>
        )}
      </div>

      {/* Daily Views */}
      {d.views !== undefined && d.views !== null && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between text-xs text-red-700 dark:text-red-400 mb-0.5">
            <span className="font-semibold uppercase tracking-wider">Daily Views</span>
            <Eye className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 font-mono">
            {Number(d.views || 0).toLocaleString()}
          </div>
          {d.cumulativeViews && (
            <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 flex justify-between">
              {d.pctOfTotalViews ? <span>{d.pctOfTotalViews}% of total</span> : <span />}
              <span className="font-mono">Cumulative: {Number(d.cumulativeViews).toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {/* Supported Aggregated Metrics (Shown only when available) */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        
        {/* Watch Time */}
        {hasWatchTime && (
          <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#282828] rounded-xl p-2.5">
            <div className="flex items-center space-x-1 text-gray-500 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-purple-500" />
              <span>Watch Time</span>
            </div>
            <div className="text-sm font-bold text-purple-600 dark:text-purple-300 font-mono">
              {Number(d.estimatedMinutesWatched || 0).toLocaleString()} <span className="text-[10px] font-normal">mins</span>
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">
              ~{watchHours} hours
            </div>
          </div>
        )}

        {/* Average View Duration */}
        {hasDuration && (
          <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#282828] rounded-xl p-2.5">
            <div className="flex items-center space-x-1 text-gray-500 mb-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
              <span>Avg Duration</span>
            </div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-300 font-mono">
              {formattedAvgDuration}
            </div>
            {d.averageViewPercentage && (
              <div className="text-[10px] text-gray-500 mt-0.5">
                {d.averageViewPercentage}% retention
              </div>
            )}
          </div>
        )}

        {/* Daily Likes */}
        {hasLikes && (
          <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#282828] rounded-xl p-3">
            <div className="flex items-center space-x-1 text-gray-500 mb-1">
              <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
              <span>Likes</span>
            </div>
            <div className="text-base font-bold text-blue-600 dark:text-blue-300 font-mono">
              {Number(d.likes || 0).toLocaleString()}
            </div>
            {d.cumulativeLikes && (
              <div className="text-[10px] text-gray-500 mt-0.5">
                Cumul: {Number(d.cumulativeLikes).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Daily Comments */}
        {hasComments && (
          <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#282828] rounded-xl p-3">
            <div className="flex items-center space-x-1 text-gray-500 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              <span>Comments</span>
            </div>
            <div className="text-base font-bold text-amber-600 dark:text-amber-300 font-mono">
              {Number(d.comments || 0).toLocaleString()}
            </div>
            {d.cumulativeComments && (
              <div className="text-[10px] text-gray-500 mt-0.5">
                Cumul: {Number(d.cumulativeComments).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* Net Subscribers */}
        {hasNetSubs && (
          <div className="col-span-2 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#282828] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-gray-500">
              <UserPlus className="w-3.5 h-3.5 text-emerald-500" />
              <span>Net Subscribers</span>
            </div>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-300 font-mono">
              +{Number(d.netSubscribers || (d.subscribersGained - d.subscribersLost) || 0).toLocaleString()}
            </div>
          </div>
        )}

      </div>

      {/* Viewer Information: Voluntary Google Form Opt-In Submissions */}
      <div className="pt-3.5 border-t border-gray-200 dark:border-[#282828]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Viewer Emails (Opt-In)
            </h4>
          </div>

          <button
            onClick={onOpenFormModal}
            className="text-[11px] font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center space-x-1"
            title="Connect Google Form or Sheet"
          >
            <Plus className="w-3 h-3" />
            <span>Connect Form / Sheet</span>
          </button>
        </div>

        {/* Official API Transparency note */}
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#121212] border border-gray-200 dark:border-[#262626] text-[11px] text-gray-500 dark:text-gray-400 mb-2.5 leading-snug">
          <span>
            <strong>YouTube API:</strong> Individual viewer emails are protected and unavailable through official APIs. Showing voluntarily submitted opt-in responses only.
          </span>
        </div>

        {/* Date Filter Toggle if multiple submissions exist */}
        {submissions.length > 0 && (
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2 px-1">
            <span>
              {showAllDates ? 'All Submitted Responses' : `Responses on ${d.date}`} ({displayedSubmissions.length})
            </span>
            <button
              onClick={() => setShowAllDates(!showAllDates)}
              className="text-red-600 dark:text-red-400 hover:underline"
            >
              {showAllDates ? `Show Only ${d.date}` : 'Show All Dates'}
            </button>
          </div>
        )}

        {/* Submissions List */}
        {displayedSubmissions.length > 0 ? (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {displayedSubmissions.map((sub, idx) => (
              <div
                key={sub.id || idx}
                className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#282828] text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                    {sub.email}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/40">
                    Form Respondent
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
                  <span>Submitted: {sub.submittedAt || sub.date}</span>
                  <span className="text-[9px] text-amber-600 dark:text-amber-400">
                    Unverified video viewer
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#262626] text-center text-xs text-gray-500">
            <p>No voluntary email submissions recorded for {d.date}.</p>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <button
                onClick={onOpenFormModal}
                className="px-2.5 py-1 rounded-lg bg-gray-200 dark:bg-[#252525] hover:bg-gray-300 dark:hover:bg-[#303030] text-gray-800 dark:text-gray-200 text-[11px] font-semibold transition"
              >
                + Connect Form / Add Response
              </button>
              {formSettings?.formUrl && (
                <a
                  href={formSettings.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold transition flex items-center space-x-1"
                >
                  <span>Open Form</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        )}

      </div>

    </aside>
  );
}
