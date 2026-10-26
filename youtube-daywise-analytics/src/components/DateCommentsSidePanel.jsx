import React from 'react';
import {
  X,
  MessageSquare,
  Calendar,
  ThumbsUp,
  User,
  Clock
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function DateCommentsSidePanel({
  selectedDate,
  comments = [],
  isOpen,
  onClose,
  dayLabel = '',
  dailyViews = null
}) {
  if (!isOpen || !selectedDate) return null;

  // Format the selected date
  let formattedFullDate = selectedDate;
  try {
    const parsed = parseISO(selectedDate);
    formattedFullDate = format(parsed, 'EEEE, MMM d, yyyy');
  } catch (e) {}

  // Filter comments by their actual published date (YYYY-MM-DD), NOT upload date
  const filteredComments = (comments || [])
    .filter((c) => {
      const pubDate = (c.publishedAt || '').split('T')[0];
      return pubDate === selectedDate;
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); // Newest first

  // Helper to format comment published timestamp
  const formatCommentTime = (isoString) => {
    if (!isoString) return '';
    try {
      const parsed = parseISO(isoString);
      return format(parsed, 'MMM d, yyyy • h:mm a');
    } catch {
      return isoString.replace('T', ' ').substring(0, 16);
    }
  };

  // Helper to clean HTML text from YouTube API (e.g., <br>, <a href...>)
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

  return (
    <aside
      aria-label="YouTube Comments for Selected Date"
      className="w-80 lg:w-96 bg-[#0c1b32] border border-[#18345c] rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,10,25,0.7)] flex flex-col h-full shrink-0 transition-all duration-300 animate-fadeIn"
    >
      {/* Side Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#18345c] shrink-0">
        <div className="flex items-center space-x-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-[#071324] border border-[#1b3e70] text-[#00f2fe] shrink-0 shadow-[0_0_8px_rgba(0,242,254,0.3)]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate">
              YouTube Comments
            </h3>
            <div className="flex items-center space-x-1.5 text-[11px] text-[#8fa3bf] font-mono">
              <Calendar className="w-3 h-3 text-[#00d2c4]" />
              <span>{selectedDate}</span>
              {dayLabel && (
                <span className="text-[10px] text-[#6296b8]">({dayLabel})</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8fa3bf] hover:text-white hover:bg-[#102342] transition shrink-0 ml-2"
          title="Close comments"
          aria-label="Close comments"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Date & Count Sub-bar */}
      <div className="mb-3 px-3 py-2 rounded-xl bg-[#071324] border border-[#18345c] flex items-center justify-between text-xs shrink-0">
        <div>
          <div className="text-[10px] uppercase font-semibold text-[#6296b8] tracking-wider">
            Published On
          </div>
          <div className="font-semibold text-white truncate">
            {formattedFullDate}
          </div>
        </div>

        <div className="text-right">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono border ${
            filteredComments.length > 0
              ? 'bg-[#0a1f3d] text-[#00f2fe] border-[#00f2fe]/40 shadow-[0_0_10px_rgba(0,242,254,0.2)]'
              : 'bg-[#091528] text-[#5fa5c8] border-[#18345c]'
          }`}>
            {filteredComments.length} {filteredComments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </div>

      {/* Comments List (Scrolls independently without page scrolling) */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-2.5 pr-1">
        {filteredComments.length === 0 ? (
          <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 text-[#8fa3bf]">
            <div className="w-12 h-12 rounded-full bg-[#071324] border border-[#18345c] flex items-center justify-center mb-2.5 text-[#5fa5c8]">
              <MessageSquare className="w-6 h-6 stroke-[1.5]" />
            </div>
            {/* Exact required wording: “No comments for this date” */}
            <p className="text-xs font-semibold text-white">
              No comments for this date
            </p>
            <p className="text-[11px] text-[#6296b8] mt-1 max-w-[200px]">
              No YouTube viewers published comments on {selectedDate}.
            </p>
          </div>
        ) : (
          filteredComments.map((comment, idx) => (
            <div
              key={comment.id || idx}
              className="p-3 rounded-xl bg-[#071324] border border-[#142d4d] text-xs hover:border-[#1f4273] transition"
            >
              {/* Author header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2 min-w-0">
                  {comment.authorProfileImageUrl ? (
                    <img
                      src={comment.authorProfileImageUrl}
                      alt={comment.authorDisplayName}
                      className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#1b3e70]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#0c1b32] border border-[#18345c] flex items-center justify-center shrink-0 text-[#00f2fe]">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                  <span className="font-semibold text-white truncate">
                    {comment.authorDisplayName}
                  </span>
                </div>

                {comment.likeCount > 0 && (
                  <div className="flex items-center space-x-1 text-[10px] text-[#00d2c4] shrink-0 ml-1">
                    <ThumbsUp className="w-3 h-3 text-[#00d2c4]" />
                    <span>{comment.likeCount}</span>
                  </div>
                )}
              </div>

              {/* Comment text */}
              <p className="text-[#d8e7f7] text-xs leading-relaxed whitespace-pre-wrap break-words font-sans">
                {cleanCommentText(comment.textDisplay || comment.textOriginal)}
              </p>

              {/* Published timestamp */}
              <div className="mt-2 pt-1.5 border-t border-[#10243d] flex items-center justify-between text-[10px] text-[#718dae]">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#5fa5c8]" />
                  <span>{formatCommentTime(comment.publishedAt)}</span>
                </div>
                <span className="font-mono text-[9px] text-[#5fa5c8]">
                  #{idx + 1}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Side panel footer */}
      <div className="pt-2.5 mt-2 border-t border-[#18345c] text-[10px] text-[#6296b8] flex items-center justify-between shrink-0">
        <span>Genuine YouTube API Comments</span>
        <span>Newest First</span>
      </div>
    </aside>
  );
}
