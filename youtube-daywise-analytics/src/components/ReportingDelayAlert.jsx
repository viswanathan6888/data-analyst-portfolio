import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ReportingDelayAlert({ latestDate, isProcessing, totalDays }) {
  return (
    <div className="bg-[#1a1712] border border-amber-900/40 rounded-2xl p-4 md:p-5 mb-6 text-sm">
      <div className="flex items-start space-x-3.5">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-amber-200 flex items-center space-x-2">
              <span>YouTube Analytics Reporting Delay & Data Policy</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official YouTube SLA: 24–72 Hours
              </span>
            </h3>
            <span className="text-xs text-amber-300/80">
              Latest finalized date: <strong className="text-white font-mono">{latestDate}</strong>
            </span>
          </div>

          <p className="text-xs text-amber-200/80 leading-relaxed mb-3">
            <strong>Lifetime views vs Daily historical views:</strong> YouTube Data API v3 reports public lifetime view counts in real-time. 
            However, genuine day-wise breakdown analytics are computed by YouTube Analytics servers with an industry-standard <strong>24 to 48-hour data lag</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-amber-900/30 text-xs">
            <div className="flex items-center space-x-2 text-amber-300/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Starting Date: <strong>Oct 17, 2026</strong> (Publication Day)</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-300/90">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Strict Rule: <strong>Never Fabricate Missing Data</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-amber-300/90">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Privacy: <strong>Aggregated metrics only (No user IDs)</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
