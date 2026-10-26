import React, { useState } from 'react';
import { Search, Youtube, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { extractVideoId } from '../services/youtubeApi';

export default function VideoSearchBar({
  onSearch,
  isLoading,
  currentVideoId,
  channelHandle = '@chatwithKC',
  defaultVideoUrl = 'https://www.youtube.com/watch?v=CobjbCF-Rvw'
}) {
  const [inputValue, setInputValue] = useState(defaultVideoUrl);
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputError('');

    if (!inputValue.trim()) {
      setInputError('Please enter a YouTube video URL or ID.');
      return;
    }

    const videoId = extractVideoId(inputValue);
    if (!videoId) {
      setInputError('Invalid YouTube URL or Video ID format.');
      return;
    }

    onSearch(videoId);
  };

  const handleQuickLoad = () => {
    setInputValue(defaultVideoUrl);
    setInputError('');
    const id = extractVideoId(defaultVideoUrl);
    if (id) onSearch(id);
  };

  return (
    <div className="bg-white dark:bg-[#181818] border border-gray-200 dark:border-[#2e2e2e] rounded-2xl p-4 shadow-sm mb-5 transition-colors">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
              <Youtube className="w-5 h-5 fill-current" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (inputError) setInputError('');
              }}
              placeholder="Enter YouTube Video URL or ID (e.g. https://www.youtube.com/watch?v=CobjbCF-Rvw)"
              className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-[#101010] border ${
                inputError
                  ? 'border-red-500'
                  : 'border-gray-200 dark:border-[#333333] focus:border-red-500'
              } rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none transition font-mono`}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickLoad}
              className="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-[#252525] hover:bg-gray-200 dark:hover:bg-[#303030] text-gray-700 dark:text-gray-300 text-xs font-semibold whitespace-nowrap transition border border-gray-200 dark:border-[#383838]"
              title="Load CobjbCF-Rvw"
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1 text-red-500" />
              <span>Load Target Video</span>
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white text-xs font-semibold rounded-xl shadow-sm transition whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Show Chart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {inputError && (
          <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400 text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{inputError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
