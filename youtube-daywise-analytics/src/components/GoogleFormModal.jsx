import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Link,
  PlusCircle,
  Download,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';
import {
  saveFormSettings,
  syncGoogleSheetResponses,
  parseGoogleSheetCsv,
  saveStoredSubmissions,
  addVoluntarySubmission
} from '../services/googleFormService';

export default function GoogleFormModal({
  isOpen,
  onClose,
  formSettings,
  onUpdateSettings,
  submissions,
  onSubmissionsUpdated,
  selectedDate
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('sheet'); // 'sheet' | 'paste' | 'manual'
  const [formUrl, setFormUrl] = useState(formSettings?.formUrl || '');
  const [sheetCsvUrl, setSheetCsvUrl] = useState(formSettings?.sheetCsvUrl || '');
  const [pasteData, setPasteData] = useState('');
  
  // Manual add form state
  const [manualEmail, setManualEmail] = useState('');
  const [manualDate, setManualDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Handle Sheet Sync
  const handleSyncSheet = async (e) => {
    e.preventDefault();
    if (!sheetCsvUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a Google Sheet published CSV URL.' });
      return;
    }

    setIsSyncing(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await syncGoogleSheetResponses(sheetCsvUrl.trim());
      const updatedSettings = {
        ...formSettings,
        formUrl: formUrl.trim(),
        sheetCsvUrl: sheetCsvUrl.trim(),
        connectedAt: new Date().toISOString()
      };
      saveFormSettings(updatedSettings);
      onUpdateSettings(updatedSettings);
      onSubmissionsUpdated(res.submissions);

      setStatusMessage({
        type: 'success',
        text: `Successfully synced ${res.importedCount} voluntary responses (${res.totalCount} total stored).`
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to sync Google Sheet.'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle Pasted CSV
  const handleImportPasted = () => {
    if (!pasteData.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste CSV data first.' });
      return;
    }

    try {
      // If header is missing, prepend one
      let dataToParse = pasteData.trim();
      if (!dataToParse.toLowerCase().includes('email')) {
        dataToParse = `Timestamp,Email\n${dataToParse}`;
      }
      const parsed = parseGoogleSheetCsv(dataToParse);
      if (parsed.length === 0) {
        throw new Error('No valid email rows recognized. Format should be: Timestamp,Email or YYYY-MM-DD,email@example.com');
      }

      const existingMap = new Map();
      submissions.forEach((s) => existingMap.set(`${s.email}_${s.date}`, s));
      parsed.forEach((s) => existingMap.set(`${s.email}_${s.date}`, s));

      const merged = Array.from(existingMap.values());
      saveStoredSubmissions(merged);
      onSubmissionsUpdated(merged);
      setPasteData('');

      setStatusMessage({
        type: 'success',
        text: `Imported ${parsed.length} voluntary responses successfully!`
      });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  // Handle Manual Add
  const handleAddManual = (e) => {
    e.preventDefault();
    if (!manualEmail.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter an email address.' });
      return;
    }

    try {
      const updated = addVoluntarySubmission({
        email: manualEmail.trim(),
        date: manualDate,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      });
      onSubmissionsUpdated(updated);
      setManualEmail('');
      setStatusMessage({
        type: 'success',
        text: `Voluntary respondent "${manualEmail.trim()}" added for ${manualDate}.`
      });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  // Handle Clear All Submissions
  const handleClearSubmissions = () => {
    if (window.confirm('Are you sure you want to clear all stored voluntary email submissions?')) {
      saveStoredSubmissions([]);
      onSubmissionsUpdated([]);
      setStatusMessage({ type: 'info', text: 'All stored voluntary submissions cleared.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-[#181818] border border-gray-300 dark:border-[#333333] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#282828] shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-600/10 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Google Form / Sheet Integration
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Connect voluntarily submitted viewer email addresses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252525] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official API Privacy Transparency Box */}
        <div className="bg-gray-50 dark:bg-[#111111] border-b border-gray-200 dark:border-[#262626] p-4 text-xs text-gray-600 dark:text-gray-400 shrink-0">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-200">
                Official YouTube Privacy Policy Notice
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                Official YouTube APIs (Data API v3 & Analytics API v2) do not expose individual viewer email addresses or accounts, even with channel-owner OAuth authorization. 
                This optional integration allows you to connect voluntary opt-in responses from viewers via Google Forms or Google Sheets. All entries are clearly labeled as <strong>Form Respondents</strong> (unverified video viewers).
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-[#282828] text-xs font-semibold px-5 pt-3 space-x-4 shrink-0 bg-gray-50/50 dark:bg-[#141414]">
          <button
            onClick={() => setActiveTab('sheet')}
            className={`pb-2.5 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'sheet'
                ? 'border-red-600 text-red-600 dark:text-red-500'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Connect Google Sheet / Form</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-2.5 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'paste'
                ? 'border-red-600 text-red-600 dark:text-red-500'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Paste CSV / Raw Data</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2.5 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'manual'
                ? 'border-red-600 text-red-600 dark:text-red-500'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Single Response</span>
          </button>
        </div>

        {/* Status Message */}
        {statusMessage.text && (
          <div className={`mx-5 mt-4 p-3 rounded-xl text-xs flex items-center space-x-2 shrink-0 ${
            statusMessage.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/40'
              : statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
          }`}>
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">

          {/* TAB 1: CONNECT GOOGLE SHEET / FORM */}
          {activeTab === 'sheet' && (
            <form onSubmit={handleSyncSheet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Viewer Google Form URL (Optional)
                </label>
                <input
                  type="url"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-[#101010] border border-gray-300 dark:border-[#333333] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-red-500"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Place this link in your video description or pinned comment for viewers to voluntarily opt in.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Google Sheet Responses CSV Export URL
                </label>
                <input
                  type="url"
                  value={sheetCsvUrl}
                  onChange={(e) => setSheetCsvUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                  className="w-full px-3.5 py-2 bg-gray-50 dark:bg-[#101010] border border-gray-300 dark:border-[#333333] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-red-500 font-mono"
                />
                <div className="mt-1 text-[11px] text-gray-500 space-y-0.5">
                  <p>How to get this link:</p>
                  <ol className="list-decimal pl-4 space-y-0.5 text-gray-400">
                    <li>In Google Sheets (linked to your Form), click <strong>File &gt; Share &gt; Publish to web</strong></li>
                    <li>Choose <strong>Comma-separated values (.csv)</strong> and click <strong>Publish</strong></li>
                    <li>Copy and paste the generated URL above</li>
                  </ol>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow transition flex items-center space-x-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSyncing ? 'Syncing Responses...' : 'Sync Form Responses'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PASTE CSV */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Paste Google Sheet / CSV Rows (Timestamp, Email)
                </label>
                <textarea
                  rows={6}
                  value={pasteData}
                  onChange={(e) => setPasteData(e.target.value)}
                  placeholder="2026-10-18 14:30:00, viewer1@example.com&#10;2026-10-18 16:45:12, subscriber@domain.com"
                  className="w-full p-3 bg-gray-50 dark:bg-[#101010] border border-gray-300 dark:border-[#333333] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-500 font-mono outline-none focus:border-red-500"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Accepts standard Google Form export headers or raw `Timestamp, Email` rows.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleImportPasted}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  Import Pasted Responses
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL ADD */}
          {activeTab === 'manual' && (
            <form onSubmit={handleAddManual} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Voluntarily Submitted Email
                  </label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="viewer@example.com"
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-[#101010] border border-gray-300 dark:border-[#333333] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Submission Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-gray-50 dark:bg-[#101010] border border-gray-300 dark:border-[#333333] rounded-xl text-xs text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow transition"
                >
                  Add Voluntary Response
                </button>
              </div>
            </form>
          )}

          {/* Currently Stored Responses Summary */}
          <div className="pt-4 border-t border-gray-200 dark:border-[#282828]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Connected Voluntary Submissions ({submissions.length})
              </span>
              {submissions.length > 0 && (
                <button
                  onClick={handleClearSubmissions}
                  className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#262626] text-center text-xs text-gray-500">
                No voluntary email submissions recorded yet. Connect a Google Sheet above or paste responses.
              </div>
            ) : (
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {submissions.map((sub, idx) => (
                  <div
                    key={sub.id || idx}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#262626] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-mono font-medium text-gray-900 dark:text-white">
                        {sub.email}
                      </div>
                      <div className="text-[10px] text-gray-500 flex items-center space-x-1.5 mt-0.5">
                        <span>Submitted: {sub.submittedAt || sub.date}</span>
                        <span>•</span>
                        <span className="text-purple-600 dark:text-purple-400 font-medium">Form Respondent</span>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-[#202020] text-gray-600 dark:text-gray-400">
                      {sub.date || 'Unspecified Date'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[#282828] bg-gray-50 dark:bg-[#121212] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#252525] dark:hover:bg-[#303030] text-gray-800 dark:text-white font-semibold text-xs rounded-xl transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
