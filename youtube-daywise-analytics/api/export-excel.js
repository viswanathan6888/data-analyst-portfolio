/**
 * Vercel Serverless Function: GET /api/export-excel
 * Server-side fallback for generating and downloading the YouTube Analytics Excel report (.xlsx)
 */

import { generateYouTubeExcelWorkbook } from '../src/services/excelExportService.js';
import { VERIFIED_VIDEO_METADATA, VERIFIED_DAILY_ANALYTICS } from '../src/services/dataSnapshot.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { videoId } = req.query;
    const targetVideo = VERIFIED_VIDEO_METADATA;
    const targetDaily = VERIFIED_DAILY_ANALYTICS;

    const workbook = await generateYouTubeExcelWorkbook({
      videoData: targetVideo,
      dailyData: targetDaily,
      trackedVideosList: [{ videoData: targetVideo, dailyData: targetDaily }]
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `YouTube_Analytics_Report_${videoId || 'CobjbCF-Rvw'}_${new Date().toISOString().split('T')[0]}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Vercel serverless Excel export error:', error);
    return res.status(500).json({ error: error.message });
  }
}
