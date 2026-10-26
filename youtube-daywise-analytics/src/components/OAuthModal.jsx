import React, { useState } from 'react';
import { X, ShieldCheck, KeyRound, ExternalLink, AlertTriangle, CheckCircle, Info, Lock, Play } from 'lucide-react';

export default function OAuthModal({
  isOpen,
  onClose,
  isOAuthConnected,
  onConnectOAuth,
  onDisconnectOAuth,
  googleClientId,
  onSaveClientId,
  accessToken,
  onSaveAccessToken
}) {
  if (!isOpen) return null;

  const [inputClientId, setInputClientId] = useState(googleClientId || '');
  const [inputAccessToken, setInputAccessToken] = useState(accessToken || '');
  const [activeTab, setActiveTab] = useState('connect'); // 'connect', 'token', 'guide'
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleManualTokenSubmit = (e) => {
    e.preventDefault();
    if (!inputAccessToken.trim()) {
      setErrorMsg('Please enter an OAuth 2.0 access token.');
      return;
    }
    onSaveAccessToken(inputAccessToken.trim());
    setSuccessMsg('Access token configured successfully!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSaveClientId = (e) => {
    e.preventDefault();
    onSaveClientId(inputClientId.trim());
    setSuccessMsg('Google Client ID saved.');
  };

  const handleGoogleSignInClick = () => {
    setErrorMsg('');
    try {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        throw new Error('Google Identity Services script is loading. Please try again in a few moments or enter an Access Token.');
      }

      const clientId = inputClientId || googleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error('Please configure your Google OAuth Client ID first in the tab below.');
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly',
        callback: (response) => {
          if (response.error) {
            setErrorMsg(`Google Auth Error: ${response.error_description || response.error}`);
            return;
          }
          if (response.access_token) {
            onConnectOAuth(response.access_token);
            setSuccessMsg('Channel Owner OAuth 2.0 successfully authorized!');
            setTimeout(onClose, 1000);
          }
        }
      });

      client.requestAccessToken();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0c1b32] border border-[#18345c] rounded-2xl w-full max-w-xl shadow-card-navy overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#18345c]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#071324] text-[#00f2fe] border border-[#1b3e70] shadow-[0_0_10px_rgba(0,242,254,0.25)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Channel Owner Google OAuth 2.0</h3>
              <p className="text-xs text-[#8fa3bf]">Authorization for private YouTube Analytics API</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8fa3bf] hover:text-white hover:bg-[#102342] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#18345c] bg-[#071324] px-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('connect')}
            className={`py-3 px-3 border-b-2 transition ${
              activeTab === 'connect'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-[#8fa3bf] hover:text-white'
            }`}
          >
            Google Sign-In
          </button>
          <button
            onClick={() => setActiveTab('token')}
            className={`py-3 px-3 border-b-2 transition ${
              activeTab === 'token'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-[#8fa3bf] hover:text-white'
            }`}
          >
            Direct Access Token
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 transition ${
              activeTab === 'guide'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-[#8fa3bf] hover:text-white'
            }`}
          >
            Setup Guide & Scopes
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="space-y-4">
              <div className="bg-[#071324] p-4 rounded-xl border border-[#18345c] text-xs text-[#8fa3bf] space-y-2">
                <div className="flex items-center space-x-1.5 text-[#00d2c4] font-semibold">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Why Channel Owner Authorization is Required:</span>
                </div>
                <p className="leading-relaxed">
                  YouTube Data API v3 provides public lifetime views. <strong>Day-by-day historical analytics</strong> are strictly protected by YouTube and require channel owner authorization via OAuth 2.0 with the YouTube Analytics API.
                </p>
              </div>

              {isOAuthConnected ? (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Channel Owner Authenticated</span>
                  </div>
                  <p className="text-xs text-[#8fa3bf]">
                    Live calls to YouTube Analytics API v2 are authorized.
                  </p>
                  <button
                    onClick={onDisconnectOAuth}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold transition"
                  >
                    Disconnect Channel Account
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#8fa3bf] mb-1.5">
                      Google Cloud OAuth Client ID (Optional if set in .env)
                    </label>
                    <input
                      type="text"
                      value={inputClientId}
                      onChange={(e) => setInputClientId(e.target.value)}
                      placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                      className="w-full px-3.5 py-2.5 bg-[#060e1c] border border-[#18345c] rounded-xl text-xs text-white placeholder-[#5a7292] outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]/40 font-mono"
                    />
                  </div>

                  <button
                    onClick={handleGoogleSignInClick}
                    className="w-full py-3 bg-gradient-to-r from-[#00d2c4] to-[#00f2fe] hover:from-[#05d5b3] hover:to-[#38bdf8] text-[#051124] font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] flex items-center justify-center space-x-2 transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize with Google Account</span>
                  </button>

                  <div className="pt-2 text-center text-xs text-[#6296b8]">
                    <span>Or use the verified offline snapshot data (enabled by default)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'token' && (
            <form onSubmit={handleManualTokenSubmit} className="space-y-4">
              <p className="text-xs text-[#8fa3bf]">
                You can generate a temporary Bearer token via Google OAuth 2.0 Playground or Google Cloud Console and paste it here:
              </p>
              <div>
                <label className="block text-xs font-medium text-[#8fa3bf] mb-1.5">
                  OAuth 2.0 Bearer Access Token
                </label>
                <textarea
                  rows={4}
                  value={inputAccessToken}
                  onChange={(e) => setInputAccessToken(e.target.value)}
                  placeholder="ya29.a0AfH6SM..."
                  className="w-full px-3.5 py-2.5 bg-[#060e1c] border border-[#18345c] rounded-xl text-xs text-white placeholder-[#5a7292] outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe]/40 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#00d2c4] to-[#00f2fe] hover:from-[#05d5b3] hover:to-[#38bdf8] text-[#051124] font-bold rounded-xl text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] transition"
              >
                Save & Apply Access Token
              </button>
            </form>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs text-[#8fa3bf]">
              <h4 className="font-semibold text-white">How to set up Google OAuth for YouTube Analytics API:</h4>
              <ol className="list-decimal list-inside space-y-2 text-[#8fa3bf] leading-relaxed">
                <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-[#00f2fe] underline">Google Cloud Console</a>.</li>
                <li>Enable both <strong>YouTube Data API v3</strong> and <strong>YouTube Analytics API</strong>.</li>
                <li>Go to <strong>APIs & Services &gt; Credentials</strong> and create an <strong>OAuth 2.0 Client ID</strong> (Web Application).</li>
                <li>Add your app domain (e.g. <code className="bg-[#071324] border border-[#18345c] px-1 py-0.5 rounded text-white">http://localhost:3005</code> and your Vercel URL) to <strong>Authorized JavaScript origins</strong>.</li>
                <li>Configure the scope: <code className="bg-[#071324] border border-[#18345c] px-1 py-0.5 rounded text-[#00f2fe]">https://www.googleapis.com/auth/yt-analytics.readonly</code>.</li>
              </ol>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#18345c] bg-[#071324] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0c1b32] hover:bg-[#102342] text-xs font-semibold text-[#8fa3bf] hover:text-white border border-[#18345c] transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
