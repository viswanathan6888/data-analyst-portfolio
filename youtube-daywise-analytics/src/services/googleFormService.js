/**
 * Service for managing voluntary viewer email submissions via Google Forms and Google Sheets.
 * 
 * Official YouTube API Compliance:
 * - YouTube Data API v3 and YouTube Analytics API v2 do NOT provide individual viewer email addresses
 *   or personal identities, even with channel-owner OAuth authorization.
 * - This service provides an authorized, compliant alternative by allowing creators to collect
 *   voluntary opt-in emails from viewers via Google Forms and sync responses via Google Sheets.
 * - Form respondents are clearly distinguished from actual video viewers.
 */

const STORAGE_KEYS = {
  SETTINGS: 'yt_daywise_form_settings',
  SUBMISSIONS: 'yt_daywise_form_submissions'
};

// Check official YouTube API support for viewer email addresses
export function checkViewerEmailApiSupport() {
  return {
    isSupportedByYouTubeApi: false,
    reason:
      'Official YouTube APIs (Data API v3 & Analytics API v2) provide aggregated metrics only. Individual viewer identities and email addresses are never exposed by Google under any OAuth scope.',
    recommendedAlternative:
      'Creators can place a voluntary Google Form opt-in link in the video description or pinned comment, then connect the Google Sheet responses here.',
    officialDocsUrl: 'https://developers.google.com/youtube/analytics/data_model'
  };
}

// Retrieve stored settings
export function getFormSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read form settings from localStorage:', e);
  }
  return {
    formUrl: '',
    sheetCsvUrl: '',
    connectedAt: null
  };
}

// Save form settings
export function saveFormSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Could not save form settings to localStorage:', e);
  }
}

// Retrieve all stored submissions
export function getStoredSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read submissions from localStorage:', e);
  }
  return [];
}

// Save submissions
export function saveStoredSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  } catch (e) {
    console.warn('Could not save submissions to localStorage:', e);
  }
}

// Parse CSV text from Google Sheet responses export
export function parseGoogleSheetCsv(csvText) {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());

  // Find email column index
  let emailColIdx = headers.findIndex(h => 
    h.includes('email') || h.includes('e-mail') || h.includes('mail')
  );

  // Find timestamp / date column index
  let dateColIdx = headers.findIndex(h => 
    h.includes('timestamp') || h.includes('date') || h.includes('time') || h.includes('submitted')
  );

  // Fallback defaults
  if (emailColIdx === -1) {
    // If second column has @ in data rows, guess it's email
    emailColIdx = 1;
  }
  if (dateColIdx === -1) {
    dateColIdx = 0;
  }

  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV quoting
    const cols = [];
    let inQuotes = false;
    let currentToken = '';

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const c = line[charIdx];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        cols.push(currentToken.trim().replace(/^["']|["']$/g, ''));
        currentToken = '';
      } else {
        currentToken += c;
      }
    }
    cols.push(currentToken.trim().replace(/^["']|["']$/g, ''));

    const rawEmail = cols[emailColIdx] || '';
    const rawTimestamp = cols[dateColIdx] || '';

    // Validate email format basic check
    if (rawEmail && rawEmail.includes('@') && rawEmail.includes('.')) {
      let parsedDate = '';
      let formattedTimestamp = rawTimestamp;

      try {
        const d = new Date(rawTimestamp);
        if (!isNaN(d.getTime())) {
          parsedDate = d.toISOString().split('T')[0];
          formattedTimestamp = d.toISOString().replace('T', ' ').substring(0, 19);
        } else {
          // If already in YYYY-MM-DD
          const match = rawTimestamp.match(/\d{4}-\d{2}-\d{2}/);
          if (match) parsedDate = match[0];
        }
      } catch (e) {
        parsedDate = '';
      }

      results.push({
        id: `sub_${Date.now()}_${i}`,
        email: rawEmail.toLowerCase(),
        submittedAt: formattedTimestamp || new Date().toISOString(),
        date: parsedDate,
        source: 'Google Form Response',
        isVerifiedViewer: false, // Explicitly false per YouTube privacy terms
        statusLabel: 'Form Respondent (Voluntary Opt-In)'
      });
    }
  }

  return results;
}

// Fetch published Google Sheet CSV
export async function syncGoogleSheetResponses(sheetCsvUrl) {
  if (!sheetCsvUrl) {
    throw new Error('Google Sheet published CSV URL is required.');
  }

  // Convert normal edit URL to CSV export if needed
  let fetchUrl = sheetCsvUrl.trim();
  if (fetchUrl.includes('/edit') || fetchUrl.includes('/view')) {
    fetchUrl = fetchUrl.replace(/\/edit.*$/, '/export?format=csv');
  }

  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet (${response.status}). Ensure the sheet is published to the web as CSV.`);
  }

  const csvText = await response.text();
  const parsed = parseGoogleSheetCsv(csvText);

  if (parsed.length === 0) {
    throw new Error('No valid email responses found in the provided Google Sheet. Check the columns.');
  }

  // Merge with existing submissions avoiding duplicate emails on the same date
  const existing = getStoredSubmissions();
  const existingMap = new Map();
  existing.forEach(item => existingMap.set(`${item.email}_${item.date}`, item));

  parsed.forEach(item => {
    existingMap.set(`${item.email}_${item.date}`, item);
  });

  const merged = Array.from(existingMap.values());
  saveStoredSubmissions(merged);

  return {
    importedCount: parsed.length,
    totalCount: merged.length,
    submissions: merged
  };
}

// Add a voluntary submission manually (e.g. for testing or direct creator entry)
export function addVoluntarySubmission({ email, date, submittedAt, note = '' }) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  const existing = getStoredSubmissions();
  const targetDate = date || new Date().toISOString().split('T')[0];
  const targetTimestamp = submittedAt || new Date().toISOString().replace('T', ' ').substring(0, 19);

  const newSubmission = {
    id: `sub_${Date.now()}`,
    email: email.trim().toLowerCase(),
    submittedAt: targetTimestamp,
    date: targetDate,
    source: 'Google Form (Voluntary)',
    note: note || '',
    isVerifiedViewer: false,
    statusLabel: 'Form Respondent (Voluntary Opt-In)'
  };

  const updated = [newSubmission, ...existing];
  saveStoredSubmissions(updated);
  return updated;
}

// Filter submissions for a specific date
export function getSubmissionsForDate(dateStr) {
  const all = getStoredSubmissions();
  if (!dateStr) return all;
  return all.filter(sub => sub.date === dateStr);
}
