# Viswanathan M — Data Analyst & AI Developer Portfolio

A recruiter-ready, high-performance personal brand portfolio website built with **React**, **Vite**, and **vanilla CSS**. Designed with an obsidian dark **glassmorphism** design system, glowing radial backdrops, and signature **violet/cyan** accents.

---

## 🌟 Sections Included

1. **Hero**:
   - Prominent portrait photo on the right with a polished glassmorphic frame and glowing halo.
   - Name headline: **Viswanathan M**, headline: **Data Analyst | AI Developer**.
   - Concise introduction and direct actions:
     - **View Projects**
     - **Download Resume**
     - **LinkedIn** (Connected to your verified LinkedIn profile)
     - **Contact Me**
2. **About Me**:
   - Executive profile narrative explaining the synergy between empirical business intelligence and local AI development.
   - 4 core domain highlights with location and contact badges.
3. **Skills**:
   - Grouped into the 4 requested categories with zero fake percentages:
     - **Data Analytics**: `Python`, `SQL`, `Excel`, `Power BI`, `Tableau`, `Power Query`
     - **AI**: `Ollama`, `Qwen`, `LLMs`
     - **Data Integration**: `Meta API`
     - **Development**: `Dashboard Development`, `Website Development`
4. **Work Experience**:
   - Professional internship timeline with identical role title (**Data Analytics Intern**):
     - **Aram Pvt Ltd**
     - **Eagle Eye SafDrive Pvt Ltd**
     - **AR4 Tech Pvt Ltd**
   - Editable dates (`[Start Date] – [End Date]`) and neutral, non-fabricated analytical deliverables.
5. **Projects**:
   - Polished case-study cards featuring custom vector/CSS UI preview mockups and architecture inspection modals:
     1. **Aram Lead Analytics Dashboard** (Power BI, SQL, Funnel Drop-off Analytics)
     2. **Power BI / Tableau Reporting Suite** (Executive Star-Schema Dashboards)
     3. **Ollama + Qwen AI Data Analyst** (Private Local Text-to-SQL Agent)
     4. **Meta API Data Integration Pipeline** (Ad Spend & Performance Ingestion)
     5. **Antigravity Analytics Dashboard** (Telemetry & Real-Time Monitoring)
     6. **Power Query Engine** (Automated M-Code Cleansing & Transformation)
6. **Contact & Social Links**:
   - Verified clickable **LinkedIn** profile: `https://www.linkedin.com/in/viswanathan-m-434b55309...`
   - Configurable **GitHub** repository link.
   - Configurable **Gmail** address with 1-click clipboard copy and protected mailto trigger.
   - Direct working **Resume** download button.
   - Interactive message inquiry form.
7. **Floating Controls**:
   - Floating **Back to Top** button with smooth scrolling and reduced-motion support.

---

## 📍 Quick Customization Guide (Where to add your details)

| Item | File Location | How to Update |
| :--- | :--- | :--- |
| **Profile Photo** | `public/profile.jpg` | Your uploaded portrait is already placed here! To change it, simply replace this file with any image named `profile.jpg`. |
| **LinkedIn URL** | `src/data/portfolioData.js` | Already pre-connected to your provided LinkedIn profile (`https://www.linkedin.com/in/viswanathan-m-434b55309...`). |
| **GitHub URL** | `src/data/portfolioData.js` | Update the `github` field (e.g. `https://github.com/your-username`). |
| **Gmail Address** | `src/data/portfolioData.js` | Update the `email` field (e.g. `yourname@gmail.com`). This automatically activates the live `mailto:` button. |
| **Resume PDF** | `public/resume.pdf` | Replace `public/resume.pdf` with your real resume PDF file. The download button will immediately serve your document. |
| **Internship Dates** | `src/data/portfolioData.js` | Edit the `period` field under each company in `experienceData` (e.g., `"Jun 2024 – Aug 2024"`). |

---

## 🚀 Running Locally with Windows PowerShell

### 1. Open PowerShell in this folder:
```powershell
cd c:\Users\sanjeevkumar\Downloads\portfolio
```

### 2. Start the local development server:
```powershell
npm.cmd run dev
```
Open **`http://localhost:3000`** in your browser to view the site with instant hot-reload.

### 3. Build & Test Production Bundle:
```powershell
npm.cmd run build
npm.cmd run preview
```

---

## 🌐 Free Deployment (GitHub & Vercel)

1. **Commit and Push to GitHub**:
   ```powershell
   git add .
   git commit -m "Upgrade Data Analyst + AI Developer portfolio"
   git push origin main
   ```
2. **Deploy on Vercel**:
   - Go to [https://vercel.com](https://vercel.com) and log in with GitHub.
   - Click **Add New...** → **Project** → select this repo.
   - Framework preset is automatically detected as **Vite**.
   - Click **Deploy**.
   - Your site is live worldwide with free automated SSL at `https://your-portfolio.vercel.app`!
