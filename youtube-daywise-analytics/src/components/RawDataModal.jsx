import React from 'react';
import { X, Download, Table, FileSpreadsheet, CheckCircle2, Clock } from 'lucide-react';

export default function RawDataModal({ isOpen, onClose, dailyData, videoId, videoTitle }) {
  if (!isOpen || !dailyData) return null;

  const downloadCSV = () => {
    const headers = [
      'Date',
      'Day Index',
      'Day Label',
      'Daily Views',
      'Cumulative Views',
      '% Of Total Views',
      'Daily Likes',
      'Daily Comments',
      'Watch Time (Minutes)',
      'Avg View Duration (Seconds)',
      'Shares',
      'Subscribers Gained',
      'Subscribers Lost',
      'Net Subscribers',
      'Status',
      'Latency Note'
    ];

    const rows = dailyData.map(d => [
      d.date,
      d.dayIndex,
      `"${d.dayLabel}"`,
      d.views,
      d.cumulativeViews,
      d.pctOfTotalViews,
      d.likes,
      d.comments,
      d.estimatedMinutesWatched,
      d.averageViewDurationSeconds,
      d.shares,
      d.subscribersGained,
      d.subscribersLost,
      d.netSubscribers,
      `"${d.status}"`,
      `"${d.latencyNote}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `youtube-daily-analytics-${videoId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadJSON = () => {
    const jsonContent = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dailyData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonContent);
    link.setAttribute('download', `youtube-daily-analytics-${videoId}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#181818] border border-[#333333] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#282828]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Day-Wise Analytics Data Table</h3>
              <p className="text-xs text-gray-400">Export verified records or inspect granular telemetry</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadCSV}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={downloadJSON}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-gray-300 text-xs font-semibold transition border border-[#383838]"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252525] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 overflow-auto flex-1 text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2e2e2e] text-gray-400 font-semibold uppercase tracking-wider text-[11px] bg-[#121212]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Day Label</th>
                <th className="py-2.5 px-3 text-right">Daily Views</th>
                <th className="py-2.5 px-3 text-right">Cumulative</th>
                <th className="py-2.5 px-3 text-right">% of Total</th>
                <th className="py-2.5 px-3 text-right">Likes</th>
                <th className="py-2.5 px-3 text-right">Comments</th>
                <th className="py-2.5 px-3 text-right">Watch Time (m)</th>
                <th className="py-2.5 px-3 text-right">Avg Duration</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {dailyData.map((d) => (
                <tr key={d.date} className="hover:bg-[#202020] transition">
                  <td className="py-2.5 px-3 font-mono text-white font-medium">{d.date}</td>
                  <td className="py-2.5 px-3 text-gray-300">{d.dayLabel}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-red-400">{d.views.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-gray-300">{d.cumulativeViews?.toLocaleString() || '-'}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-amber-400">{d.pctOfTotalViews}%</td>
                  <td className="py-2.5 px-3 text-right font-mono text-blue-400">{d.likes.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-amber-400">{d.comments.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-purple-400">{d.estimatedMinutesWatched.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-gray-300">
                    {Math.floor(d.averageViewDurationSeconds / 60)}m {d.averageViewDurationSeconds % 60}s
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      d.isPendingProcessing 
                        ? 'bg-amber-950/40 text-amber-400 border border-amber-800/40' 
                        : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#282828] bg-[#121212] flex items-center justify-between text-xs text-gray-400">
          <span>Total Rows: <strong>{dailyData.length} Days</strong></span>
          <span className="text-[11px] text-gray-500">Genuine aggregated telemetry recorded by YouTube</span>
        </div>

      </div>
    </div>
  );
}
