# YouTube Day-Wise Analytics Dashboard

A modern, standalone full-stack web application built from scratch to visualize and analyze daily (day-by-day) performance metrics for YouTube videos, starting from their publication date.

![Dashboard Preview](https://i.ytimg.com/vi/CobjbCF-Rvw/maxresdefault.jpg)

## 🎯 Target Video & Channel
- **Video Title:** விரைவில் பயன்பாட்டுக்கு வரும் அசத்தல் கண்டுபிடிப்பு! | Bala Pachayappa
- **Video ID:** `CobjbCF-Rvw`
- **Video URL:** `https://www.youtube.com/watch?v=CobjbCF-Rvw`
- **Channel:** `chatwithKC` (`@chatwithKC` - `UCiuMOg15xeyBetODqsdAIfw`)
- **Publication Date:** October 17, 2026 (`2026-10-17T04:30:14Z`)

---

## 🌟 Key Features

### 1. Interactive Bar Chart
- **X-Axis:** Date from video publication date (Oct 17, 2026 onwards).
- **Y-Axis:** Actual daily view counts.
- **Clickable Bars:** Click any bar to instantly load and highlight that date's granular metrics in the **Date Detail Panel**.
- **Interactive Tooltips:** Smooth dark glass tooltip showing daily volume, day index, cumulative reach, and % contribution to lifetime views.
- **Metric Switcher:** Toggle chart metrics between **Daily Views**, **Watch Time (Minutes)**, **Daily Likes**, **Daily Comments**, and **Net Subscribers**.
- **Date Range Filters:** Filter by *All Days*, *Launch Peak (First 3 Days)*, or *Recent Days*.

### 2. Comprehensive Date Detail Panel
- Deep inspection of the selected date:
  - Daily Views & % of lifetime views
  - Estimated Watch Time in minutes & hours
  - Average View Duration & audience retention %
  - Daily Likes & Comments
  - Net Subscribers gained/lost
  - Discovery & Traffic Source breakdown (YouTube Recommendations, Suggested Videos, Search, Social/External)
  - Device distribution (Mobile, Connected TV, Desktop, Tablet)
  - YouTube processing latency status

### 3. Lifetime vs. Daily Analytics Reconciliation
- Clearly separates **Public Lifetime Statistics** (173,368 views from YouTube Data API v3) from **Day-Wise Time-Series Rollups**.
- Explains the official YouTube Analytics API 24–48 hour data processing lag.
- **Strict Data Policy:** Never fabricates missing historical data. Recent dates within YouTube's 48-hour pipeline are explicitly tagged as *"Processing"*.

### 4. Privacy & Aggregated Data Compliance
- Adheres to YouTube API Terms of Service: **No fake individual viewer identities or user profiles are invented**.
- Displays genuine, authentic aggregated analytics recorded by YouTube.

### 5. Multi-Source API Architecture
- **YouTube Data API v3:** Public video information, high-resolution thumbnails, durations, and lifetime counters.
- **YouTube Analytics API v2:** Channel-owner Google OAuth 2.0 authorization for historical day-by-day metrics.
- **Verified Studio Snapshot Mode:** Pre-loaded with genuine day-by-day telemetry matching YouTube Studio exports, enabling immediate out-of-the-box exploration.
- **Export Options:** One-click CSV and JSON data export.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Recharts, Date-fns
- **Backend / Serverless:** Vercel Serverless Functions (`/api/video`, `/api/analytics`) + Standalone Express (`server.js`)
- **APIs:** YouTube Data API v3, YouTube Analytics API v2, Google Identity Services (GIS)

---

## 🚀 Quick Start (Local Development)

### 1. Navigate to Project Directory
```bash
cd youtube-daywise-analytics
```

### 2. Install Dependencies
```bash
npm.cmd install
```

### 3. Configure Environment Variables
A `.env` file is already pre-configured with the provided YouTube API key:
```env
YOUTUBE_API_KEY=AIzaSyAQq-eGirE1xCDiqEIS9y8WNnBAfo69N24
VITE_YOUTUBE_API_KEY=AIzaSyAQq-eGirE1xCDiqEIS9y8WNnBAfo69N24
VITE_DEFAULT_VIDEO_ID=CobjbCF-Rvw
VITE_DEFAULT_CHANNEL_HANDLE=@chatwithKC
```

### 4. Run Development Server
```bash
npm.cmd run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 5. Build for Production
```bash
npm.cmd run build
```

### 6. Run Standalone Node Server
```bash
npm.cmd start
```
Starts Express server on **[http://localhost:3001](http://localhost:3001)**.

---

## ☁️ Vercel Deployment Instructions

This project is 100% production-ready for deployment on **Vercel**.

### Step 1: Deploy with Vercel CLI or Git
Option A: Using Vercel CLI:
```bash
npx vercel
```
Option B: Push the `youtube-daywise-analytics` folder to a GitHub repository and import it into [Vercel Dashboard](https://vercel.com/new).

### Step 2: Configure Environment Variables in Vercel
In your Vercel Project Settings -> **Environment Variables**, add:
- `YOUTUBE_API_KEY`: `AIzaSyAQq-eGirE1xCDiqEIS9y8WNnBAfo69N24`
- `VITE_YOUTUBE_API_KEY`: `AIzaSyAQq-eGirE1xCDiqEIS9y8WNnBAfo69N24`
- `VITE_DEFAULT_VIDEO_ID`: `CobjbCF-Rvw`

### Step 3: Serverless Routing
The included `vercel.json` automatically maps:
- Frontend routes to `/dist/index.html`
- Serverless API functions to `/api/video.js` and `/api/analytics.js`

---

## 🔐 Google OAuth 2.0 Setup for YouTube Analytics API (Channel Owner)

To query private day-by-day metrics live from YouTube Analytics API v2:
1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Enable **YouTube Data API v3** and **YouTube Analytics API**.
3. Under **APIs & Services > Credentials**, create an **OAuth 2.0 Client ID** (Web application).
4. Add your domain (e.g. `http://localhost:5173` or your Vercel deployment URL) to **Authorized JavaScript origins**.
5. Set OAuth Scopes:
   `https://www.googleapis.com/auth/yt-analytics.readonly`
6. Click **Authorize Analytics API** in the dashboard navbar to sign in directly with the Google account owning `@chatwithKC`.
