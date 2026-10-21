# Data Analyst & AI Developer Portfolio

A modern, responsive, high-performance portfolio website built with **React**, **Vite**, and **vanilla CSS**. Engineered with an obsidian dark **glassmorphism** design system, glowing radial backdrops, and signature **violet/cyan** accents.

---

## 🌟 Sections Included

1. **Home — Data Analyst | AI Developer**: High-impact hero section with role titles, glowing status indicator, interactive terminal preview (SQL Analytics, Ollama + Qwen Local LLM, and Meta Graph API), and fast-action CTAs.
2. **About Me**: Professional dual-domain profile narrative, 4 core value pillars, analyst-developer synergy overview, and location/email tags.
3. **Skills**: Full interactive catalog of all 10 core competencies with category filter tabs:
   - **Data Analytics & BI**: `SQL`, `Excel`, `Power BI`, `Tableau`, `Power Query`
   - **AI, LLMs & Development**: `Python`, `Ollama`, `Qwen`, `LLMs`, `Meta API integration`
4. **Work Experience**: Structured career timeline featuring all 3 specified companies with identical role title:
   - **Aram Pvt Ltd** — `Data Analytics Intern`
   - **Eagle Eye SafDrive Pvt Ltd** — `Data Analytics Intern`
   - **AR4 Tech Pvt Ltd** — `Data Analytics Intern`
   - *All dates and specific responsibilities are clearly formatted with editable placeholders.*
5. **Projects**: Comprehensive case-study showcase with category filtering, instant keyword search, and in-depth architecture modal views:
   - **Lead Analytics Dashboard** (Power BI, SQL, DAX)
   - **Power BI / Tableau Reporting Suite** (Enterprise BI, star-schemas)
   - **Ollama + Qwen AI Data Analyst** (Local on-premise Text-to-SQL agent)
   - **Meta API Integration Pipeline** (Marketing Graph API ingestion)
   - **Antigravity Dashboard** (Telemetry & real-time monitoring)
   - **Power Query Engine** (Automated M-Code ETL pipelines)
6. **Resume Download**: Functional PDF download button, in-browser printable view, and live credential summary.
7. **Contact**: Editable email (`your.email@example.com`), LinkedIn, and GitHub links with 1-click clipboard copy and an interactive contact inquiry form.

---

## 🚀 Running Locally with Windows PowerShell

### Prerequisites
- Node.js (v18 or higher recommended). Check with:
  ```powershell
  node -v
  ```

### Step 1: Open PowerShell in the project directory
```powershell
cd c:\Users\sanjeevkumar\Downloads\portfolio
```

### Step 2: Install dependencies
If running scripts is restricted by PowerShell policy, use `npm.cmd`:
```powershell
npm.cmd install
```
*(If PowerShell execution policies are already enabled, `npm install` works directly).*

### Step 3: Start the local development server
```powershell
npm.cmd run dev
```
You will see output like:
```text
  VITE v6.x.x  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<your-ip>:3000/
```
Open **`http://localhost:3000`** in your web browser.

### Step 4: Run a Production Build & Preview
To test the optimized production bundle locally:
```powershell
# Build production bundle
npm.cmd run build

# Preview production build locally
npm.cmd run preview
```

---

## ✏️ How to Customize Your Personal Details

All personal details, dates, links, and project descriptions are centralized in **one single file**:
`src/data/portfolioData.js`

Open that file in your editor:
1. **Personal Information**:
   - Change `name`, `location`, `email`, `linkedin`, and `github`.
2. **Resume PDF**:
   - Place your actual resume PDF inside the `public/` directory named `resume.pdf`.
3. **Experience Dates**:
   - Update `[Start Month, Year] – [End Month, Year]` for each of the 3 internships.
4. **Project Links**:
   - Update repository URLs (`githubLink`) and demo links to point to your live repos.

---

## 🌐 Free Deployment Guide (GitHub + Vercel)

Deploying this portfolio online for free takes less than 3 minutes.

### Method A: Deploy via GitHub + Vercel (Recommended with Auto-Updates)

#### 1. Push Code to GitHub
Run the following in PowerShell:
```powershell
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit of Data Analyst + AI Developer portfolio"

# Create a new repository on https://github.com/new (e.g. 'portfolio')
# Link and push your code:
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

#### 2. Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in for free with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository from the list and click **"Import"**.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. In about 30 seconds, your site will be live at `https://your-project.vercel.app` with a free SSL certificate! Any future git push to `main` will automatically re-deploy your site.

---

### Method B: Deploy Directly with Vercel CLI (No Git Required)

If you prefer deploying directly from your terminal:
```powershell
# Run Vercel CLI directly without global install
npx.cmd vercel

# Follow the quick prompts in your terminal:
# - Set up and deploy? [Y]
# - Which scope? [Your Account]
# - Link to existing project? [N]
# - What's your project's name? [portfolio]
# - In which directory is your code located? [./]
```
For production release:
```powershell
npx.cmd vercel --prod
```

---

## 🛠️ Project Structure

```text
portfolio/
├── public/
│   └── resume.pdf                 # Downloadable resume file
├── src/
│   ├── components/
│   │   ├── About.jsx              # About me & philosophy section
│   │   ├── Contact.jsx            # Editable email, LinkedIn, GitHub & form
│   │   ├── Experience.jsx         # 3 Internships timeline with editable dates
│   │   ├── Footer.jsx             # Dark glass footer & navigation
│   │   ├── Hero.jsx               # Hero banner with terminal simulator
│   │   ├── Icons.jsx              # Lucide & brand SVG icon library
│   │   ├── Navbar.jsx             # Glassmorphism navbar & mobile drawer
│   │   ├── ProjectModal.jsx       # Deep-dive architecture modal
│   │   ├── Projects.jsx           # 6 projects grid with search & filters
│   │   └── ResumeSection.jsx      # Resume download banner & printable view
│   ├── data/
│   │   └── portfolioData.js       # Central data & editable placeholders
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Dark glassmorphism styling & tokens
│   └── main.jsx                   # Vite React entrypoint
├── index.html                     # HTML root & Google Fonts
├── package.json                   # Dependencies & build scripts
├── vite.config.js                 # Vite configuration
└── README.md                      # Documentation & deployment guide
```
