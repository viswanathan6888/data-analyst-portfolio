import ExcelJS from 'exceljs/dist/exceljs.min.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS } from './dataSnapshot.js';
import { fetchVideoTitleDirect, generateTimelineCalendar } from './youtubeApi.js';

/**
 * Calculates daily views growth rate compared with the previous day's views:
 * Growth Rate (%) = ((Current Day Views - Previous Day Views) / Previous Day Views) * 100
 * Handles missing data and zero previous-day views safely without #DIV/0! errors.
 */
export function calculateGrowthRate(currentViews, previousViews) {
  if (previousViews === null || previousViews === undefined || Number(previousViews) <= 0) {
    return null;
  }
  if (currentViews === null || currentViews === undefined) {
    return null;
  }
  const curr = Number(currentViews);
  const prev = Number(previousViews);
  return ((curr - prev) / prev) * 100;
}

/**
 * Builds the comprehensive YouTube Daily Analytics Excel (.xlsx) report.
 * 
 * Layout:
 * - Row 1: Video Name Heading (exact title fetched from YouTube Data API v3 snippet.title)
 * - Row 2: Active Video Link (clickable hyperlink to the original YouTube video URL)
 * - Row 3: Blank separator row
 * - Row 4: Table Header (Dark Navy #0C1B32, frozen top rows, AutoFilter enabled on A4:I{totalRows})
 * 
 * 9 Data Table Columns:
 * 1. Day #: Day 1, Day 2, etc. (or Lifetime Total)
 * 2. Tracking Date: YYYY-MM-DD
 * 3. Day of Week: Monday, Tuesday, etc.
 * 4. Daily Views: Numeric view count formatted as #,##0 with Excel Conditional Formatting Data Bars
 * 5. Daily Likes: Numeric likes count
 * 6. Daily Shares: Numeric shares count
 * 7. Daily Comments: Numeric comments count
 * 8. Growth Rate (%): ((Current Day Views - Previous Day Views) / Previous Day Views) * 100
 * 9. Avg Watch Duration: e.g. 7m 42s
 */
export async function generateYouTubeExcelWorkbook({
  videoData = VERIFIED_VIDEO_METADATA,
  dailyData = [],
  trackedVideosList = []
}) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'YouTube Day-Wise Analytics';
  workbook.lastModifiedBy = 'YouTube Day-Wise Analytics';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Exactly ONE worksheet with freeze pane at table header (Row 4)
  const sheet = workbook.addWorksheet('Daily Analytics', {
    views: [{ state: 'frozen', ySplit: 4 }]
  });

  // Extract primary video ID to fetch exact snippet.title directly from YouTube Data API v3
  const primaryItem = (trackedVideosList && trackedVideosList.length > 0)
    ? trackedVideosList[0]
    : { videoData, dailyData };
  const currentVideo = videoData || primaryItem.videoData || (primaryItem.id ? primaryItem : null) || VERIFIED_VIDEO_METADATA;
  const rawId = currentVideo?.id || currentVideo?.videoId || videoData?.id;
  const videoId = (rawId && typeof rawId === 'string' && rawId.trim() !== '') ? rawId.trim() : null;

  let displayTitle = 'Title unavailable';
  let videoUrl = '';

  if (videoId) {
    videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
      displayTitle = await fetchVideoTitleDirect(videoId);
    } catch (err) {
      console.warn('[Excel Export] Direct video title fetch failed:', err);
    }

    if ((!displayTitle || displayTitle === 'Title unavailable') && currentVideo?.snippet?.title) {
      displayTitle = currentVideo.snippet.title.trim();
    } else if ((!displayTitle || displayTitle === 'Title unavailable') && currentVideo?.title) {
      displayTitle = currentVideo.title.trim();
    }

    if (!displayTitle || displayTitle.trim() === '') {
      displayTitle = 'Title unavailable';
    }
  }

  // Row 1: Video Name Heading at the top of the report (merged A1:I1)
  sheet.mergeCells('A1:I1');
  const row1 = sheet.getRow(1);
  row1.height = 30;
  const cellA1 = sheet.getCell('A1');
  cellA1.value = displayTitle;
  cellA1.font = {
    name: 'Calibri',
    size: 14,
    bold: true,
    color: { argb: 'FF0C1B32' } // Dark Navy heading matching dashboard theme
  };
  cellA1.alignment = {
    vertical: 'middle',
    horizontal: 'left'
  };

  // Row 2: Active Video Link directly below the video name (entire cell A2:I2 is clickable)
  sheet.mergeCells('A2:I2');
  const row2 = sheet.getRow(2);
  row2.height = 26;
  const cellA2 = sheet.getCell('A2');
  if (videoUrl) {
    // Apply hyperlink to the entire cell
    cellA2.value = {
      text: videoUrl,
      hyperlink: videoUrl,
      tooltip: displayTitle !== 'Title unavailable'
        ? `Watch "${displayTitle}" on YouTube`
        : 'Watch video on YouTube'
    };
    cellA2.font = {
      name: 'Calibri',
      size: 11,
      color: { argb: 'FF007799' },
      underline: true,
      bold: true
    };
    cellA2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF0F9FF' } // Light cyan/ice-blue container matching theme
    };
    const linkBorder = { style: 'thin', color: { argb: 'FFBAE6FD' } };
    cellA2.border = {
      top: linkBorder,
      bottom: linkBorder,
      left: linkBorder,
      right: linkBorder
    };
  } else {
    cellA2.value = 'N/A';
    cellA2.font = {
      name: 'Calibri',
      size: 11,
      color: { argb: 'FF64748B' }
    };
  }
  cellA2.alignment = {
    vertical: 'middle',
    horizontal: 'left'
  };

  // Row 3: Blank separator row
  const row3 = sheet.getRow(3);
  row3.height = 12;

  // 9 Columns in the daily tracking table:
  // Day #, Tracking Date, Day of Week, Daily Views, Daily Likes, Daily Shares, Daily Comments, Growth Rate (%), Avg Watch Duration
  const tableHeaders = [
    { header: 'Day #', width: 14 },
    { header: 'Tracking Date', width: 16 },
    { header: 'Day of Week', width: 16 },
    { header: 'Daily Views', width: 18 },
    { header: 'Daily Likes', width: 14 },
    { header: 'Daily Shares', width: 14 },
    { header: 'Daily Comments', width: 16 },
    { header: 'Growth Rate (%)', width: 22 },
    { header: 'Avg Watch Duration', width: 20 }
  ];

  // Set column widths
  tableHeaders.forEach((col, idx) => {
    sheet.getColumn(idx + 1).width = col.width;
  });

  // Row 4: Table Header row
  const headerRow = sheet.getRow(4);
  headerRow.height = 28;
  tableHeaders.forEach((col, idx) => {
    const cell = headerRow.getCell(idx + 1);
    cell.value = col.header;
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0C1B32' } // Dark Navy matching dashboard theme
    };
    cell.font = {
      name: 'Calibri',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' }
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF18345C' } },
      left: { style: 'thin', color: { argb: 'FF18345C' } },
      bottom: { style: 'medium', color: { argb: 'FF00F2FE' } },
      right: { style: 'thin', color: { argb: 'FF18345C' } }
    };
  });

  // Determine records to populate:
  // If dailyData has items: use dailyData.
  // If video is the default initial video (CobjbCF-Rvw) and dailyData is empty: use VERIFIED_DAILY_ANALYTICS.
  // Otherwise for any other video loaded without OAuth: generate a single Lifetime summary row.
  const hasDailyData = dailyData && Array.isArray(dailyData) && dailyData.length > 0;
  const isDefaultVideo = videoId === 'CobjbCF-Rvw';

  let dailyRecords = [];
  if (hasDailyData) {
    dailyRecords = dailyData;
  } else if (isDefaultVideo) {
    dailyRecords = generateTimelineCalendar({
      publishedAt: currentVideo?.publishedAt || VERIFIED_VIDEO_METADATA.publishedAt,
      latestDate: new Date().toISOString().split('T')[0],
      verifiedDailyAnalytics: VERIFIED_DAILY_ANALYTICS,
      isDefaultVideo: true
    });
  } else if (currentVideo && currentVideo.publishedAt) {
    dailyRecords = generateTimelineCalendar({
      publishedAt: currentVideo.publishedAt,
      latestDate: new Date().toISOString().split('T')[0],
      isDefaultVideo: false
    });
  }

  let totalDataRowsCount = 0;

  if (dailyRecords.length > 0) {
    dailyRecords.forEach((d, idx) => {
      totalDataRowsCount++;
      const rowNumber = 4 + totalDataRowsCount;
      const row = sheet.getRow(rowNumber);
      row.height = 24;

      const prevD = idx > 0 ? dailyRecords[idx - 1] : null;
      const prevViews = prevD ? prevD.views : null;
      const growth = (prevViews !== null && d.views !== null) ? calculateGrowthRate(d.views, prevViews) : null;

      let growthStr = 'N/A (Launch Baseline)';
      if (idx > 0) {
        if (d.views === null || d.views === undefined) {
          growthStr = 'N/A (Requires Channel OAuth)';
        } else if (growth !== null && !isNaN(growth) && isFinite(growth)) {
          const sign = growth > 0 ? '+' : '';
          growthStr = `${sign}${growth.toFixed(2)}%`;
        } else {
          growthStr = 'N/A';
        }
      }

      // Format average watch duration
      let durationFormatted = 'N/A';
      if (d.averageViewDurationSeconds !== undefined && d.averageViewDurationSeconds !== null) {
        const durationSec = Number(d.averageViewDurationSeconds);
        const mins = Math.floor(durationSec / 60);
        const secs = durationSec % 60;
        durationFormatted = `${mins}m ${secs}s`;
      }

      const cellValues = [
        `Day ${d.dayIndex || idx + 1}`,
        d.date || 'N/A',
        d.dayName || 'N/A',
        d.views !== undefined && d.views !== null ? Number(d.views) : 'N/A',
        d.likes !== undefined && d.likes !== null ? Number(d.likes) : 'N/A',
        d.shares !== undefined && d.shares !== null ? Number(d.shares) : 'N/A',
        d.comments !== undefined && d.comments !== null ? Number(d.comments) : 'N/A',
        growthStr,
        durationFormatted
      ];

      cellValues.forEach((val, colIdx) => {
        const colNumber = colIdx + 1;
        const cell = row.getCell(colNumber);
        cell.value = val;

        // Thin borders
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };

        // Alignment & Typography per column
        if (colNumber === 4) {
          // Daily Views (with Data Bar)
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF0F172A' }, bold: true };
          if (typeof cell.value === 'number') {
            cell.numFmt = '#,##0';
          }
        } else {
          // Other data columns
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF1E293B' } };
          if (typeof cell.value === 'number') {
            cell.numFmt = '#,##0';
          }
        }

        // Alternating row background for clean readability
        if (totalDataRowsCount % 2 === 0) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF8FAFC' }
          };
        }
      });
    });
  } else {
    // For newly loaded videos without OAuth daily records: write genuine Lifetime summary metrics row
    totalDataRowsCount = 1;
    const row = sheet.getRow(5);
    row.height = 24;

    const lifetimeViews = Number(currentVideo?.statistics?.viewCount ?? currentVideo?.viewCount ?? 0);
    const rawLikes = currentVideo?.statistics?.likeCount ?? currentVideo?.likeCount;
    const lifetimeLikes = rawLikes !== undefined && rawLikes !== null ? Number(rawLikes) : 'N/A';
    const rawComments = currentVideo?.statistics?.commentCount ?? currentVideo?.commentCount;
    const lifetimeComments = rawComments !== undefined && rawComments !== null ? Number(rawComments) : 'N/A';
    const durationFormatted = currentVideo?.formattedDuration || currentVideo?.duration || 'N/A';

    const cellValues = [
      'Lifetime Total',
      'All Time',
      'Lifetime',
      lifetimeViews > 0 ? lifetimeViews : 'N/A',
      lifetimeLikes,
      'N/A',
      lifetimeComments,
      'N/A (Day-wise requires channel OAuth)',
      durationFormatted
    ];

    cellValues.forEach((val, colIdx) => {
      const colNumber = colIdx + 1;
      const cell = row.getCell(colNumber);
      cell.value = val;

      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };

      if (colNumber === 4) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' };
        cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF0F172A' }, bold: true };
        if (typeof cell.value === 'number') {
          cell.numFmt = '#,##0';
        }
      } else {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { name: 'Calibri', size: 11, color: { argb: 'FF1E293B' } };
        if (typeof cell.value === 'number') {
          cell.numFmt = '#,##0';
        }
      }
    });
  }

  // Enable AutoFilter on row 4 across all 9 columns (A4:I{totalRows})
  const totalRows = 4 + totalDataRowsCount;
  sheet.autoFilter = `A4:I${totalRows}`;

  // Apply Excel-style Conditional Formatting Data Bars to Column D (Daily Views)
  if (totalDataRowsCount > 0) {
    sheet.addConditionalFormatting({
      ref: `D5:D${totalRows}`,
      rules: [
        {
          type: 'dataBar',
          priority: 1,
          cfvo: [
            { type: 'num', value: 0 },
            { type: 'max' }
          ],
          color: { argb: 'FF00A8CC' } // Professional blue-to-cyan style matching dashboard theme
        }
      ]
    });
  }

  return workbook;
}

/**
 * Triggers client-side download of the Excel report in browser
 */
export async function downloadYouTubeExcelReport({
  videoData,
  dailyData,
  trackedVideosList,
  fileName
}) {
  const workbook = await generateYouTubeExcelWorkbook({
    videoData,
    dailyData,
    trackedVideosList
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const videoId = videoData?.id || 'CobjbCF-Rvw';
  const today = new Date().toISOString().split('T')[0];
  const defaultName = `YouTube_Daily_Analytics_${videoId}_${today}.xlsx`;
  anchor.download = fileName || defaultName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
  return true;
}
