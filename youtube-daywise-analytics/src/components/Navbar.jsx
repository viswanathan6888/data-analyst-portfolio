import React, { useState } from 'react';
import {
  Youtube,
  ShieldCheck,
  ExternalLink,
  Search,
  Loader2,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { extractVideoId } from '../services/youtubeApi';

export default function Navbar({
  videoData,
  onSearchVideo,
  isLoading,
  onOpenOAuth,
  onOpenSettings,
  isOAuthConnected,
  hasApiKey,
  autoRefreshInterval,
  onChangeAutoRefresh,
  onManualRefresh,
  lastRefreshedAt,
  lastSyncStatus = 'success'
}) {
  const [urlInput, setUrlInput] = useState('https://www.youtube.com/watch?v=CobjbCF-Rvw');
  const [showRefreshMenu, setShowRefreshMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const vidId = extractVideoId(urlInput);
    if (vidId) {
      onSearchVideo(vidId);
    }
  };

  const refreshOptions = [
    { label: 'Off', value: 0 },
    { label: 'Every 30 secs', value: 30000 },
    { label: 'Every 1 min', value: 60000 },
    { label: 'Every 5 mins', value: 300000 },
    { label: 'Every 15 mins', value: 900000 }
  ];

  const currentRefreshLabel =
    refreshOptions.find((opt) => opt.value === autoRefreshInterval)?.label || '1 min';

  return (
    <header className="h-11 shrink-0 bg-[#091528]/95 backdrop-blur-md border-b border-[#18345c] px-3 sm:px-4 flex items-center justify-between gap-3 z-30 transition-colors">
      
      {/* Left: App Branding */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0c2447] to-[#081528] border border-[#1b3e70] flex items-center justify-center text-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.25)]">
          <Youtube className="w-3.5 h-3.5 text-[#00f2fe]" />
        </div>
        <span className="font-bold text-xs sm:text-sm tracking-tight text-white">
          YouTube <span className="text-[#00f2fe]">Day-Wise</span> Analytics
        </span>
      </div>

      {/* Center: Compact Video Search Input */}
      <form onSubmit={handleSearch} className="flex-1 max-w-sm sm:max-w-md mx-1 sm:mx-2 flex items-center space-x-1.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter YouTube URL or Video ID..."
            className="w-full pl-7 pr-2.5 py-1.5 bg-[#060e1c] border border-[#18345c] rounded-lg text-xs text-white placeholder-[#5a7292] outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]/40 font-mono transition"
          />
          <Youtube className="w-3.5 h-3.5 text-[#00d2c4] absolute left-2 top-2 pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-3 py-1.5 bg-gradient-to-r from-[#00d2c4] to-[#00f2fe] hover:from-[#05d5b3] hover:to-[#38bdf8] text-[#051124] rounded-lg text-xs font-bold shrink-0 transition shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-glow-cyan flex items-center space-x-1 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Search className="w-3 h-3 stroke-[2.5]" />
              <span className="hidden sm:inline">Load</span>
            </>
          )}
        </button>
      </form>

      {/* Right: Controls (Auto-Refresh, OAuth, Settings, Watch) */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* Auto-Refresh Control */}
        <div className="relative">
          <button
            onClick={() => setShowRefreshMenu(!showRefreshMenu)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#0c1b32] hover:bg-[#102342] text-[#8fa3bf] hover:text-white border border-[#18345c] transition"
            title={`Auto-Sync: ${currentRefreshLabel} • Last sync: ${lastRefreshedAt || 'Just now'} • Status: ${lastSyncStatus}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00d2c4] ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline text-[11px]">
              Sync: <strong className="text-white">{currentRefreshLabel}</strong>
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-ping' : lastSyncStatus === 'error' ? 'bg-rose-500' : 'bg-emerald-400 shadow-[0_0_5px_#10b981]'}`} />
          </button>

          {showRefreshMenu && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-[#0c1b32] border border-[#1f4273] shadow-card-navy p-1.5 text-xs z-50">
              <div className="px-2.5 py-1 text-[10px] uppercase font-semibold text-[#6296b8] border-b border-[#18345c]">
                Auto-Refresh Interval
              </div>
              {refreshOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChangeAutoRefresh(opt.value);
                    setShowRefreshMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                    autoRefreshInterval === opt.value
                      ? 'bg-[#18345c] text-[#00f2fe] font-semibold'
                      : 'text-[#8fa3bf] hover:bg-[#102342] hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  {autoRefreshInterval === opt.value && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}

              <div className="pt-1 mt-1 border-t border-[#18345c]">
                <button
                  onClick={() => {
                    onManualRefresh();
                    setShowRefreshMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-[#00d2c4] hover:bg-[#102342] flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Now</span>
                </button>
              </div>

              {lastRefreshedAt && (
                <div className="px-2.5 py-1 text-[9px] text-[#5fa5c8] font-mono">
                  Last: {lastRefreshedAt}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Watch Video Link */}
        {videoData?.id && (
          <a
            href={`https://www.youtube.com/watch?v=${videoData.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#0c1b32] hover:bg-[#102342] text-[#8fa3bf] hover:text-white border border-[#18345c] text-xs font-medium transition"
            title="Watch video on YouTube"
          >
            <span>Watch</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {/* OAuth Channel Owner Button */}
        <button
          onClick={onOpenOAuth}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
            isOAuthConnected
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,229,189,0.2)]'
              : 'bg-[#0c1b32] hover:bg-[#102342] text-[#8fa3bf] hover:text-white border-[#18345c]'
          }`}
          title={isOAuthConnected ? 'Channel Owner Authorized' : 'Authorize Channel Owner OAuth'}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${isOAuthConnected ? 'text-emerald-400' : 'text-[#00d2c4]'}`} />
          <span className="hidden md:inline">
            {isOAuthConnected ? 'OAuth Connected' : 'OAuth'}
          </span>
        </button>


      </div>

    </header>
  );
}
