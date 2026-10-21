/**
 * Portfolio Central Configuration & Data Store
 * Recruiter-ready Personal Brand Website for Data Analyst + AI Developer
 *
 * NOTE FOR USER:
 * - Update your personal info (Email, GitHub, Location) right here.
 * - Your uploaded photo has been placed in public/profile.jpg.
 * - Your real LinkedIn profile is already connected below.
 * - Replace public/resume.pdf with your real resume file when ready.
 */

export const personalInfo = {
  name: "Viswanathan M", // Sourced from your provided LinkedIn profile. Editable if needed.
  title: "Data Analyst | AI Developer",
  headline: "Data Analyst | AI Developer",
  tagline: "Empowering business decisions through robust data analytics, BI dashboards, and private on-premise AI automation.",
  status: "Available for Data Analyst & AI Engineering Roles",
  location: "[City, State / Remote]", // Editable placeholder
  email: "your.email@gmail.com", // Replace with your real Gmail address
  linkedin: "https://www.linkedin.com/in/viswanathan-m-434b55309?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/your-github-username", // Replace with your GitHub profile URL
  phone: "[Phone Number - Optional]", // Editable placeholder
  profileImage: "/profile.jpg", // Saved in public/profile.jpg (replace with any portrait anytime)
  resumePdfUrl: "/resume.pdf", // Place your real resume PDF in public/resume.pdf
  about: {
    lead: "A passionate Data Analyst & AI Developer dedicated to transforming multi-source operational data into clean, intuitive business intelligence and autonomous AI agent workflows.",
    paragraphs: [
      "My analytical background centers on building structured data pipelines, crafting normalized relational models in SQL, and developing high-impact executive dashboards across Power BI and Tableau. I focus on data integrity, clean transformation logic with Power Query, and delivering clear answers to complex business questions.",
      "Alongside core data analytics, I specialize in practical AI engineering: running private, on-premise Large Language Models (Ollama, Qwen), building conversational text-to-SQL assistants, and integrating live third-party data streams through the Meta Marketing API and custom web dashboards."
    ],
    highlights: [
      {
        label: "Domain Focus",
        title: "Data Analytics & BI",
        description: "SQL modeling, executive KPI reporting, Power BI, Tableau, and automated Power Query ETL."
      },
      {
        label: "AI Specialization",
        title: "Private Local LLMs",
        description: "Deploying self-hosted Ollama & Qwen models for on-premise data synthesis and text-to-SQL."
      },
      {
        label: "Data Ingestion",
        title: "API Data Integration",
        description: "Automating campaign and marketing performance feeds via Meta Graph API."
      },
      {
        label: "Interface Engineering",
        title: "Dashboards & Web UI",
        description: "Creating responsive, interactive web dashboards and analytics interfaces with modern web standards."
      }
    ]
  }
};

/**
 * Technical Skills
 * Grouped strictly into the 4 requested categories:
 * 1. Data Analytics (Python, SQL, Excel, Power BI, Tableau, Power Query)
 * 2. AI (Ollama, Qwen, LLMs)
 * 3. Data Integration (Meta API)
 * 4. Development (Dashboard & Website Development)
 *
 * *No arbitrary or fake percentage scores* — focuses on actual technical capabilities.
 */
export const skillsData = [
  {
    category: "Data Analytics",
    categorySlug: "data-analytics",
    description: "Core analytical querying, dimensional modeling, automated ETL, and executive visualization.",
    skills: [
      {
        name: "Python",
        icon: "Terminal",
        tag: "Analytics & Automation",
        description: "Pandas, NumPy, data wrangling, automation scripts, exploratory data analysis (EDA)."
      },
      {
        name: "SQL",
        icon: "Database",
        tag: "Relational Querying",
        description: "Complex joins, CTEs, subqueries, window functions, and schema normalization."
      },
      {
        name: "Excel",
        icon: "FileSpreadsheet",
        tag: "Spreadsheet Modeling",
        description: "Advanced functions (XLOOKUP, INDEX/MATCH), pivot analysis, data validation, and modeling."
      },
      {
        name: "Power BI",
        icon: "BarChart3",
        tag: "Business Intelligence",
        description: "Interactive report design, DAX measures, star-schema data modeling, and KPI tracking."
      },
      {
        name: "Tableau",
        icon: "PieChart",
        tag: "Visual Storytelling",
        description: "Calculated fields, dynamic parameters, cohort heatmaps, and executive storyboards."
      },
      {
        name: "Power Query",
        icon: "FileSpreadsheet",
        tag: "ETL & Data Cleansing",
        description: "Automated M-Code transformations, schema normalization, multi-table consolidation."
      }
    ]
  },
  {
    category: "AI",
    categorySlug: "ai",
    description: "Private local LLM runtimes, contextual prompt engineering, and intelligent assistants.",
    skills: [
      {
        name: "Ollama",
        icon: "Cpu",
        tag: "Local LLM Runtime",
        description: "Self-hosted model execution, quantized model deployment, and private offline inference."
      },
      {
        name: "Qwen",
        icon: "Sparkles",
        tag: "Reasoning & Code Models",
        description: "Qwen 2.5 series models for automated text-to-SQL translation and report summarization."
      },
      {
        name: "LLMs",
        icon: "Bot",
        tag: "Generative AI Systems",
        description: "Retrieval-augmented workflows, structured JSON extraction, and prompt optimization."
      }
    ]
  },
  {
    category: "Data Integration",
    categorySlug: "data-integration",
    description: "Automated data ingestion pipelines, third-party APIs, and data transformation.",
    skills: [
      {
        name: "Meta API",
        icon: "Share2",
        tag: "Graph API Ingestion",
        description: "Extracting campaign performance, ad spend, and impressions into clean analytical tables."
      }
    ]
  },
  {
    category: "Development",
    categorySlug: "development",
    description: "Designing and engineering responsive, user-friendly analytics dashboards and web interfaces.",
    skills: [
      {
        name: "Dashboard Development",
        icon: "Monitor",
        tag: "Interactive Analytics",
        description: "Real-time metric telemetry, filterable KPI charts, and modern dark-mode dashboards."
      },
      {
        name: "Website Development",
        icon: "Code2",
        tag: "Frontend Architecture",
        description: "React, Vite, modern CSS glassmorphism, responsive mobile layouts, and web accessibility."
      }
    ]
  }
];

/**
 * Work Experience
 * Strictly features:
 * - Aram Pvt Ltd (Data Analytics Intern)
 * - Eagle Eye SafDrive Pvt Ltd (Data Analytics Intern)
 * - AR4 Tech Pvt Ltd (Data Analytics Intern)
 *
 * *Dates and descriptions are explicitly editable placeholders with NO fabricated metrics.*
 */
export const experienceData = [
  {
    company: "Aram Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Date] – [End Date]", // Editable: Replace with your actual dates e.g. "Jun 2024 – Aug 2024"
    location: "[Location / Remote]", // Editable: Replace with city or "Remote"
    type: "Internship",
    badge: "Lead & Operational Analytics",
    summary: "Supported analytical workflows, operational data hygiene, and recurring reporting requirements.",
    bulletPoints: [
      "Queried and consolidated operational records using SQL joins and aggregation filters for business reporting.",
      "Developed spreadsheet models and summary views in Excel to track departmental key performance indicators.",
      "Assisted in reviewing data pipeline outputs, identifying missing values, and documenting table relationships.",
      "Collaborated with team leads to clarify reporting metrics and support ad-hoc analytical requests."
    ],
    technologies: ["SQL", "Excel", "Data Cleansing", "Operational Analytics", "Reporting"]
  },
  {
    company: "Eagle Eye SafDrive Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Date] – [End Date]", // Editable: Replace with your actual dates
    location: "[Location / Remote]", // Editable
    type: "Internship",
    badge: "Telematics & Driving Safety",
    summary: "Assisted in aggregating and analyzing vehicular safety telematics and sensor log datasets.",
    bulletPoints: [
      "Worked with time-series device logs and sensor feeds to help structure reporting tables for safety trends.",
      "Utilized Power Query and automated scripts to clean and merge disparate monthly telemetry log files.",
      "Created preliminary visual mockups to illustrate driving patterns and assist senior analysts in presentations.",
      "Conducted data quality checks to ensure incoming telemetry feeds conformed to standard schema definitions."
    ],
    technologies: ["Python", "Power Query", "Excel", "Time-Series Data", "Data Validation"]
  },
  {
    company: "AR4 Tech Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Date] – [End Date]", // Editable: Replace with your actual dates
    location: "[Location / Remote]", // Editable
    type: "Internship",
    badge: "BI Dashboarding & ETL",
    summary: "Contributed to business intelligence dashboarding and automated data preparation flows.",
    bulletPoints: [
      "Designed and maintained visual reports in Power BI and Tableau to display key operational metrics.",
      "Wrote structured SQL queries to extract source data and feed scheduled reporting workbooks.",
      "Participated in data schema reviews, documenting transformation steps and field definitions.",
      "Assisted in testing data refreshes to ensure dashboard visualizations accurately matched source datasets."
    ],
    technologies: ["Power BI", "Tableau", "SQL", "Data Modeling", "ETL Verification"]
  }
];

/**
 * Projects Showcase
 * Strictly includes:
 * 1. Aram Lead Analytics Dashboard
 * 2. Power BI/Tableau Reporting
 * 3. Ollama + Qwen AI Data Analyst
 * 4. Meta API Data Integration
 * 5. Antigravity Analytics Dashboard
 * 6. Power Query Engine
 *
 * *All demo metrics are clearly labeled as conceptual architecture demonstrations.*
 */
export const projectsData = [
  {
    id: "aram-lead-analytics-dashboard",
    title: "Aram Lead Analytics Dashboard",
    category: "Data Analytics",
    badge: "Business Intelligence",
    summary: "End-to-end lead conversion funnel, cohort analysis, and sales metrics tracking with interactive filtering.",
    description: "An analytical dashboard engineered to track lead lifecycles from first-touch acquisition through deal stages. Integrates multi-channel marketing feeds, computes conversion rates across distinct segments, and surfaces velocity bottlenecks along the pipeline.",
    problemSolved: "Consolidates fragmented lead records into a structured view, simplifying weekly reporting and eliminating manual spreadsheet consolidation.",
    stack: ["Power BI", "SQL", "Power Query", "Excel", "DAX"],
    keyFeatures: [
      "Multi-stage conversion funnel visualization with drop-off analytics",
      "Lead channel comparison tracking acquisition source distributions",
      "Cohort analysis matrix grouping leads by month and industry",
      "Interactive slicers for date ranges, status filters, and category tags"
    ],
    demoTag: "Architecture & Visual Prototype",
    previewType: "dashboard-funnel",
    githubLink: "https://github.com/your-github-username/aram-lead-analytics-dashboard",
    isConfigured: false // Set to true when your real repository or live demo URL is ready
  },
  {
    id: "power-bi-tableau-reporting",
    title: "Power BI / Tableau Reporting Suite",
    category: "Data Analytics",
    badge: "Enterprise BI",
    summary: "Executive KPI dashboards, multi-source star-schema data models, and automated business intelligence reporting.",
    description: "A dual-platform reporting implementation built across Power BI and Tableau. Features normalized star-schema data modeling, parameterized drill-through hierarchies, and DAX / calculated field logic designed for executive decision-makers.",
    problemSolved: "Automates recurring operational summary views that previously required extensive manual data exports and repetitive formatting.",
    stack: ["Power BI", "Tableau", "DAX", "SQL", "Data Modeling"],
    keyFeatures: [
      "Cross-platform reporting parity between Power BI and Tableau workbooks",
      "Custom DAX calculations for Year-over-Year (YoY) and moving average trends",
      "Interactive drill-through pages for granular departmental investigations",
      "Documented star-schema architecture ensuring consistent metric definitions"
    ],
    demoTag: "Dashboard Design Concept",
    previewType: "dashboard-bi",
    githubLink: "https://github.com/your-github-username/powerbi-tableau-reporting",
    isConfigured: false
  },
  {
    id: "ollama-qwen-ai-data-analyst",
    title: "Ollama + Qwen AI Data Analyst",
    category: "AI",
    badge: "Local AI Engineering",
    summary: "Local AI analytical agent utilizing Ollama and Qwen models to execute natural language querying against SQL databases.",
    description: "A privacy-preserving, local AI analytical assistant that converts natural language business questions into validated SQL queries. Powered by containerized Ollama running Qwen models, this system executes safe read-only queries and returns narrative insights alongside chart-ready dataframes.",
    problemSolved: "Enables non-technical users to explore relational databases in plain English with 100% on-premise execution, ensuring sensitive business data never leaves the local machine.",
    stack: ["Python", "Ollama", "Qwen 2.5", "SQL", "Prompt Engineering"],
    keyFeatures: [
      "Zero-cloud data privacy: 100% local execution via the Ollama model runtime",
      "Automated SQL dialect generation with safety verification for read-only execution",
      "Plain-language insight generator summarizing query results for business readers",
      "Support for multi-turn analytical follow-up queries and clarification"
    ],
    demoTag: "Local AI Toolchain Concept",
    previewType: "terminal-ai",
    githubLink: "https://github.com/your-github-username/ollama-qwen-data-analyst",
    isConfigured: false
  },
  {
    id: "meta-api-data-integration",
    title: "Meta API Data Integration Pipeline",
    category: "Data Integration",
    badge: "API Data Pipeline",
    summary: "Real-time ad spend, campaign performance, and audience analytics extraction pipeline into relational storage.",
    description: "An automated data extraction engine interfacing directly with the Meta Graph API. Ingests campaign metrics, ad set performance, impressions, and click data, transforming nested JSON payloads into clean tabular schemas ready for BI ingestion.",
    problemSolved: "Eliminates fragmented ad reporting and manual CSV exports by providing a scheduled, automated data ingestion routine with robust error handling.",
    stack: ["Python", "Meta Graph API", "SQL", "JSON Processing", "ETL"],
    keyFeatures: [
      "Token authentication management with automated query paging",
      "Exponential backoff retry logic to respect Meta Graph API rate limits",
      "Automated schema normalization converting nested JSON payloads into clean rows",
      "Daily automated staging runs creating ready-to-query analytical tables"
    ],
    demoTag: "Pipeline Architecture",
    previewType: "code-pipeline",
    githubLink: "https://github.com/your-github-username/meta-api-data-integration",
    isConfigured: false
  },
  {
    id: "antigravity-analytics-dashboard",
    title: "Antigravity Analytics Dashboard",
    category: "Development",
    badge: "Telemetry UI",
    summary: "Modern telemetry and performance visualization platform showcasing real-time metric streams and analytical job monitoring.",
    description: "A dark-mode telemetry operations dashboard crafted to visualize pipeline throughput, active analytical jobs, and data refresh latency. Built with high-contrast glassmorphism aesthetics, responsive layouts, and instant status flags.",
    problemSolved: "Provides operators with immediate visibility into concurrently running analytics pipelines, system health, and scheduled query jobs.",
    stack: ["React", "JavaScript", "CSS Glassmorphism", "Responsive UI", "Web Standards"],
    keyFeatures: [
      "Real-time visual gauges monitoring task throughput and query response times",
      "Filterable job execution table tracking scheduled pipeline refreshes",
      "Adaptive dark glassmorphism theme with violet/cyan accent hierarchy",
      "Fully accessible layout supporting keyboard navigation and reduced motion"
    ],
    demoTag: "UI & Telemetry Prototype",
    previewType: "dashboard-telemetry",
    githubLink: "https://github.com/your-github-username/antigravity-analytics-dashboard",
    isConfigured: false
  },
  {
    id: "power-query-engine",
    title: "Power Query Engine",
    category: "Data Analytics",
    badge: "ETL & Transformation",
    summary: "Automated ETL pipelines, data schema cleansing, deduplication, and transformation workflows across disparate sources.",
    description: "A structured library of specialized Power Query (M-Code) transformation recipes and data cleansing routines. Normalizes messy data exports, merges disparate tables, standardizes formats, and outputs analysis-ready tables.",
    problemSolved: "Transforms repetitive, error-prone manual data cleaning across inconsistent spreadsheet ledgers into a single-click automated refresh flow.",
    stack: ["Power Query", "M Code", "Excel", "Data Wrangling", "Schema Cleaning"],
    keyFeatures: [
      "Reusable M-code functions for recursive column header cleaning and type casting",
      "Automated deduplication and record validation logic across merged sources",
      "Standardization routines for varied date formats, currencies, and text cases",
      "Documented transformation audit steps to verify data provenance"
    ],
    demoTag: "ETL Transformation Template",
    previewType: "etl-flow",
    githubLink: "https://github.com/your-github-username/power-query-engine",
    isConfigured: false
  }
];

export const resumeData = {
  fileName: "Resume_Viswanathan_M.pdf",
  lastUpdated: "Current",
  highlights: [
    "Proficient across the full data analytics lifecycle: SQL querying, ETL (Power Query), and BI reporting (Power BI, Tableau)",
    "Hands-on experience deploying private local LLMs (Ollama, Qwen) for on-premise text-to-SQL and data synthesis",
    "Solid internship foundation at Aram Pvt Ltd, Eagle Eye SafDrive Pvt Ltd, and AR4 Tech Pvt Ltd",
    "Skilled in Python scripting, Meta Graph API data ingestion, and building responsive analytical dashboards"
  ]
};
