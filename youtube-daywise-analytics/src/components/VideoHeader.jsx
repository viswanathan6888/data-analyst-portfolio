import React from 'react';
import { Calendar, Clock, ExternalLink, Eye, ThumbsUp, MessageSquare, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function VideoHeader({ video, activeDaysCount, dataSourceType }) {
  if (!video) return null;

  const publishedDate = video.publishedAt ? parseISO(video.publishedAt) : new Date('2026-10-17');
  const formattedPublishDate = format(publishedDate, 'MMMM d, yyyy');

  return (
    <div className="bg-[#181818] border border-[#2e2e2e] rounded-2xl p-5 md:p-6 shadow-xl mb-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Video Thumbnail */}
        <div className="relative group shrink-0 w-full lg:w-80 aspect-video rounded-xl overflow-hidden bg-[#101010] border border-[#333333]">
          <img
            src={
              video.bestThumbnailUrl ||
              video.thumbnails?.maxres?.url ||
              video.thumbnails?.high?.url ||
              `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
            }
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
            }}
          />
          {video.formattedDuration && (
            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono font-medium text-white tracking-wider">
              {video.formattedDuration}
            </div>
          )}
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-2 text-sm font-semibold"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Video Info & Summary */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600/20 text-red-400 border border-red-500/30">
                YouTube Video
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#262626] text-gray-300 border border-[#383838]">
                ID: {video.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Source: {dataSourceType}</span>
              </span>
            </div>

            {/* Video Title */}
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
              {video.title}
            </h1>
            {video.englishTitle && (
              <p className="text-xs text-gray-400 mb-3 italic">
                {video.englishTitle}
              </p>
            )}

            {/* Channel info and publish meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-400 mb-4 pb-3 border-b border-[#282828]">
              <div className="flex items-center space-x-1.5 font-medium text-gray-200">
                <span className="text-red-400 font-semibold">{video.channelTitle}</span>
                <span className="text-gray-500">(@chatwithKC)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <span>Published: <strong className="text-gray-200">{formattedPublishDate}</strong></span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>Tracking: <strong className="text-gray-200">{activeDaysCount} Days History</strong></span>
              </div>
            </div>
          </div>

          {/* Public Lifetime Statistics Overview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Public Lifetime Statistics (YouTube Data API v3)
              </span>
              <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                <Info className="w-3 h-3" />
                <span>Live Cumulative Count</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#111111] border border-[#292929] rounded-xl p-3">
                <div className="flex items-center space-x-1.5 text-gray-400 text-xs mb-1">
                  <Eye className="w-3.5 h-3.5 text-red-400" />
                  <span>Lifetime Views</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white font-mono">
                  {Number(video.viewCount ?? video.statistics?.viewCount ?? 0).toLocaleString()}
                </div>
              </div>

              <div className="bg-[#111111] border border-[#292929] rounded-xl p-3">
                <div className="flex items-center space-x-1.5 text-gray-400 text-xs mb-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lifetime Likes</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white font-mono">
                  {Number(video.likeCount ?? video.statistics?.likeCount ?? 0).toLocaleString()}
                </div>
              </div>

              <div className="bg-[#111111] border border-[#292929] rounded-xl p-3">
                <div className="flex items-center space-x-1.5 text-gray-400 text-xs mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Comments</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-white font-mono">
                  {Number(video.commentCount ?? video.statistics?.commentCount ?? 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
