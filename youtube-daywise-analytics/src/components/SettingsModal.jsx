import React, { useState } from 'react';
import { X, Key, Shield, RefreshCw, CheckCircle } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  defaultApiKey = ''
}) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(apiKey || defaultApiKey);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setInputKey(defaultApiKey);
    onSaveApiKey(defaultApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0c1b32] border border-[#18345c] rounded-2xl w-full max-w-md shadow-card-navy overflow-hidden">
        
        <div className="flex items-center justify-between p-5 border-b border-[#18345c]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#071324] text-[#00f2fe] border border-[#1b3e70] shadow-[0_0_10px_rgba(0,242,254,0.25)]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">API Credentials</h3>
              <p className="text-xs text-[#8fa3bf]">Configure YouTube Data API Key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8fa3bf] hover:text-white hover:bg-[#102342] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8fa3bf] mb-1.5">
              YouTube Data API v3 Key
            </label>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-[#060e1c] border border-[#18345c] rounded-xl text-xs text-white placeholder-[#5a7292] outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]/40 font-mono"
            />
            <p className="text-[11px] text-[#6296b8] mt-1">
              Used for video metadata and genuine YouTube comments.
            </p>
          </div>

          {saved && (
            <div className="flex items-center space-x-1.5 text-[#05d5b3] text-xs bg-[#071d2b] border border-[#00d2c4]/40 p-2.5 rounded-xl">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>API Key saved successfully!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-1 text-xs text-[#8fa3bf] hover:text-[#00f2fe] underline transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Provided Key</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-[#00d2c4] to-[#00f2fe] hover:from-[#05d5b3] hover:to-[#38bdf8] text-[#051124] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(0,242,254,0.3)] transition"
            >
              Save Credentials
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
