/**
 * Portfolio Central Configuration & Data Store
 * All details here are customizable and use clear placeholder tags [like this]
 * so you can tailor them to your personal profile easily.
 */

export const personalInfo = {
  name: "Alex Morgan", // Placeholder name - easily replace with your name
  title: "Data Analyst | AI Developer",
  tagline: "Bridging the gap between empirical data intelligence and generative AI engineering.",
  status: "Open to Full-Time & Contract Opportunities",
  location: "[City, Country]", // Editable placeholder
  email: "your.email@example.com", // Editable placeholder
  github: "https://github.com/yourusername", // Editable placeholder
  linkedin: "https://linkedin.com/in/yourprofile", // Editable placeholder
  phone: "[+1 (555) 000-0000]", // Editable placeholder
  resumePdfUrl: "/resume.pdf", // Place your resume.pdf into the public/ folder
  about: {
    lead: "A results-oriented Data Analyst and AI Developer specializing in transforming messy raw telemetry and business records into high-impact visual intelligence and autonomous AI agent workflows.",
    paragraphs: [
      "With a solid analytical grounding in SQL data modeling, advanced Excel/Power Query pipelines, and enterprise BI tools (Power BI, Tableau), I construct robust reporting architectures that empower stakeholders to make informed decisions.",
      "Concurrently, I build next-generation AI workflows by leveraging local LLM runtimes (Ollama, Qwen), fine-tuning contextual prompts, and integrating third-party APIs (Meta Marketing API, REST endpoints) into end-to-end analytical pipelines."
    ],
    highlights: [
      {
        label: "Dual Expertise",
        value: "Data + AI",
        description: "Uniting deep statistical reporting with modern autonomous LLM toolchains."
      },
      {
        label: "Core Pipeline",
        value: "ETL to Insights",
        description: "Transforming unstructured sources via Power Query & SQL into interactive dashboards."
      },
      {
        label: "Local GenAI",
        value: "Private & Fast",
        description: "Deploying self-hosted Ollama & Qwen models for on-premise data analytics."
      },
      {
        label: "Integration",
        value: "API Automations",
        description: "Ingesting live marketing & user signals via Meta Graph APIs and Python."
      }
    ]
  }
};

export const skillsData = [
  {
    category: "Data Analytics & BI",
    description: "Core analytical querying, dimensional modeling, and executive dashboarding.",
    skills: [
      {
        name: "SQL",
        level: "Advanced",
        icon: "Database",
        description: "Complex CTEs, window functions, query optimization, indexing & relational schemas."
      },
      {
        name: "Power BI",
        level: "Advanced",
        icon: "BarChart3",
        description: "DAX calculations, star schema data modeling, drill-down executive reporting."
      },
      {
        name: "Tableau",
        level: "Intermediate / Advanced",
        icon: "PieChart",
        description: "Interactive visual storytelling, calculated fields, parameters, and cohort heatmaps."
      },
      {
        name: "Excel",
        level: "Advanced",
        icon: "Sheet",
        description: "Financial modeling, advanced lookup functions, dynamic arrays, VBA macros & pivot tables."
      },
      {
        name: "Power Query",
        level: "Advanced",
        icon: "FileSpreadsheet",
        description: "M-code transformations, automated schema normalization, API data cleansing & ETL."
      }
    ]
  },
  {
    category: "AI, LLMs & Development",
    description: "Local large language model deployments, prompt engineering, and custom scripting.",
    skills: [
      {
        name: "Python",
        level: "Advanced",
        icon: "Terminal",
        description: "Pandas, NumPy, data wrangling, automation scripts, FastAPI endpoints & data pipelines."
      },
      {
        name: "Ollama",
        level: "Intermediate",
        icon: "Cpu",
        description: "Local containerized LLM orchestration, model quantizations, and low-latency inference."
      },
      {
        name: "Qwen",
        level: "Intermediate",
        icon: "Sparkles",
        description: "Reasoning and coding with Qwen series models for SQL generation and automated EDA."
      },
      {
        name: "LLMs",
        level: "Intermediate / Advanced",
        icon: "Bot",
        description: "RAG architectures, function calling, structured JSON output extraction, context engineering."
      },
      {
        name: "Meta API integration",
        level: "Intermediate",
        icon: "Share2",
        description: "Graph API extraction for campaign metrics, ad spend aggregation, and real-time webhook sync."
      }
    ]
  }
];

export const experienceData = [
  {
    company: "Aram Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Month, Year] – [End Month, Year]", // Editable placeholder
    location: "[City, Country / Remote]", // Editable placeholder
    type: "Internship",
    badge: "Analytics & Reporting",
    summary: "Focused on exploratory data analysis, business metric tracking, and report pipeline hygiene.",
    bulletPoints: [
      "Extracted, sanitized, and modeled multi-table operational datasets using SQL queries and relational joins.",
      "Developed interactive internal report views and spreadsheet models to monitor departmental KPI metrics.",
      "Collaborated with cross-functional team members to document business requirements and data dictionary definitions.",
      "Identified data discrepancies and assisted in streamlining recurring monthly data cleansing routines."
    ],
    technologies: ["SQL", "Excel", "Data Cleansing", "KPI Reporting", "Documentation"]
  },
  {
    company: "Eagle Eye SafDrive Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Month, Year] – [End Month, Year]", // Editable placeholder
    location: "[City, Country / Remote]", // Editable placeholder
    type: "Internship",
    badge: "Telemetry & Telematics",
    summary: "Assisted in processing vehicular telematics and safety metrics for analytical reporting.",
    bulletPoints: [
      "Analyzed time-series driving safety datasets and device logs to identify patterns and anomalies.",
      "Built visual dashboard mockups to assist senior analysts in presenting safety compliance trends.",
      "Utilized Power Query and automated scripts to aggregate multi-source telemetry logs for scheduled reviews.",
      "Conducted data validation checks to ensure telemetry feeds complied with ingestion schemas."
    ],
    technologies: ["Python", "Power Query", "Excel", "Time-Series Data", "Anomaly Detection"]
  },
  {
    company: "AR4 Tech Pvt Ltd",
    role: "Data Analytics Intern",
    period: "[Start Month, Year] – [End Month, Year]", // Editable placeholder
    location: "[City, Country / Remote]", // Editable placeholder
    type: "Internship",
    badge: "BI & Process Automation",
    summary: "Contributed to business intelligence dashboarding and data transformation pipelines.",
    bulletPoints: [
      "Designed and maintained visual dashboards in Power BI/Tableau to track operational performance metrics.",
      "Drafted analytical queries and summary views to support ad-hoc stakeholder business inquiries.",
      "Assisted in testing ETL transformation routines to consolidate disparate customer interaction records.",
      "Participated in agile data sprint reviews, presenting weekly visual summaries and insights."
    ],
    technologies: ["Power BI", "Tableau", "SQL", "ETL Pipelines", "Data Storytelling"]
  }
];

export const projectsData = [
  {
    id: "lead-analytics-dashboard",
    title: "Lead Analytics Dashboard",
    category: "Data Analytics",
    badge: "Analytics & BI",
    summary: "End-to-end lead conversion funnel, cohort analysis, and sales metrics tracking with interactive filtering.",
    description: "An executive-grade analytical dashboard engineered to track lead lifecycles from first-touch acquisition through deal closure. Integrates multi-channel campaign feeds, computes conversion rates across distinct buyer segments, and surfaces velocity bottlenecks along the sales pipeline.",
    problemSolved: "Consolidated fragmented lead records across marketing channels into a unified single pane of glass, eliminating manual spreadsheet consolidation.",
    stack: ["Power BI", "SQL", "Power Query", "Excel", "DAX"],
    keyFeatures: [
      "Dynamic conversion funnel visualization with step drop-off analytics",
      "Lead source ROI comparison and customer acquisition cost (CAC) tracking",
      "Cohort analysis matrix grouping leads by month and industry vertical",
      "Interactive slicers for date ranges, rep assignments, and campaign tags"
    ],
    metricsPreview: [
      { label: "Pipeline Velocity", value: "+34%" },
      { label: "Data Latency", value: "< 1 hr" },
      { label: "Funnel Stages", value: "6 Tiers" }
    ],
    demoLink: "#lead-analytics",
    githubLink: "https://github.com/yourusername/lead-analytics-dashboard"
  },
  {
    id: "power-bi-tableau-reporting",
    title: "Power BI / Tableau Reporting Suite",
    category: "Data Analytics",
    badge: "Enterprise BI",
    summary: "Executive KPI dashboards, multi-source star schema data models, and automated business intelligence reporting.",
    description: "A dual-suite business intelligence implementation built across Power BI and Tableau. Features normalized star-schema data modeling, parameterized drill-through hierarchies, and DAX / calculated field logic designed for executive decision-makers.",
    problemSolved: "Automated recurring executive report generation that previously consumed hours of manual export and formatting every week.",
    stack: ["Power BI", "Tableau", "DAX", "SQL Server", "Data Modeling"],
    keyFeatures: [
      "Cross-platform reporting parity between Power BI and Tableau workbooks",
      "Custom DAX measures for Year-over-Year (YoY) and Moving Average trends",
      "Role-level security (RLS) simulation for regional branch managers",
      "Automated refresh scheduling with data validation integrity checks"
    ],
    metricsPreview: [
      { label: "Time Saved", value: "12 hrs/wk" },
      { label: "KPIs Monitored", value: "24 Metrics" },
      { label: "Data Sources", value: "3 DBs" }
    ],
    demoLink: "#bi-reporting",
    githubLink: "https://github.com/yourusername/powerbi-tableau-reporting"
  },
  {
    id: "ollama-qwen-ai-data-analyst",
    title: "Ollama + Qwen AI Data Analyst",
    category: "AI & LLMs",
    badge: "Generative AI",
    summary: "Local AI agent utilizing Ollama and Qwen models to execute natural language querying against SQL databases.",
    description: "A privacy-preserving, local AI analytical assistant that converts natural language business inquiries into validated SQL queries. Powered by containerized Ollama running Qwen quantized models, this system executes safe read-only queries and returns narrative insights alongside chart-ready dataframes.",
    problemSolved: "Enables non-technical team members to query relational databases in plain English without leaking sensitive internal data to external third-party cloud APIs.",
    stack: ["Python", "Ollama", "Qwen 2.5", "SQLite / PostgreSQL", "LangChain / Prompt Engineering"],
    keyFeatures: [
      "Zero-cloud data privacy: 100% on-premise execution via local Ollama runtime",
      "Automated SQL dialect generation with AST safety parser (read-only enforcement)",
      "Narrative summary generator explaining analytical findings in plain language",
      "Dynamic data visualization generation using Matplotlib / Plotly export"
    ],
    metricsPreview: [
      { label: "Cloud Cost", value: "$0 / Month" },
      { label: "Query Accuracy", value: "92%" },
      { label: "Avg Response", value: "1.4s" }
    ],
    demoLink: "#ollama-qwen",
    githubLink: "https://github.com/yourusername/ollama-qwen-data-analyst"
  },
  {
    id: "meta-api-integration",
    title: "Meta API Integration Pipeline",
    category: "AI & Development",
    badge: "Data Engineering",
    summary: "Real-time ad spend, campaign performance, and audience analytics extraction pipeline into relational storage.",
    description: "An automated data extraction engine that interfaces directly with the Meta Graph API (Marketing API). Ingests daily campaign metrics, ad set performance, creative impressions, and ROAS numbers, normalizing JSON payloads into clean tabular databases ready for BI ingestion.",
    problemSolved: "Eliminated fragmented ad reporting and manual CSV exports by providing a resilient, automated data ingestion pipeline with rate-limit handling.",
    stack: ["Python", "Meta Graph API", "SQL", "FastAPI", "JSON Parsing"],
    keyFeatures: [
      "OAuth token management with automated token refresh cycles",
      "Exponential backoff handling for Meta Graph API rate-limiting",
      "Automated schema mapping converting nested JSON payloads into relational rows",
      "Automated alerting for significant ROAS deviations or budget overspends"
    ],
    metricsPreview: [
      { label: "Sync Schedule", value: "Automated" },
      { label: "Endpoints", value: "8 Routes" },
      { label: "Error Rate", value: "< 0.1%" }
    ],
    demoLink: "#meta-api",
    githubLink: "https://github.com/yourusername/meta-api-integration"
  },
  {
    id: "antigravity-dashboard",
    title: "Antigravity Dashboard",
    category: "Data Analytics",
    badge: "Telemetry & Monitoring",
    summary: "Modern telemetry and performance visualization platform showcasing real-time metric streams and task orchestration.",
    description: "A dark-mode telemetry operations dashboard crafted to visualize system throughput, active analytical jobs, and AI inference latency. Designed with high-contrast glassmorphism aesthetics, live-updating charts, and instant anomaly flags.",
    problemSolved: "Provides operators with immediate visibility into concurrently running analytics pipelines, model latency, and system resource loads.",
    stack: ["React", "JavaScript", "CSS Glassmorphism", "Chart Analytics", "WebSocket Simulation"],
    keyFeatures: [
      "Live real-time metric gauges for latency, throughput, and error rates",
      "Interactive task orchestration view monitoring queued analytical jobs",
      "Adaptive dark glassmorphism theme with violet/cyan accent hierarchy",
      "Instant CSV and JSON metric export for historical audit reviews"
    ],
    metricsPreview: [
      { label: "FPS Render", value: "60 FPS" },
      { label: "UI Latency", value: "< 16ms" },
      { label: "Components", value: "100% Mod" }
    ],
    demoLink: "#antigravity-dashboard",
    githubLink: "https://github.com/yourusername/antigravity-dashboard"
  },
  {
    id: "power-query-engine",
    title: "Power Query Engine",
    category: "Data Analytics",
    badge: "ETL & Automation",
    summary: "Automated ETL pipelines, data schema cleansing, deduplication, and transformation workflows across disparate sources.",
    description: "A library of specialized Power Query (M-Code) templates and automated data transformation scripts. Normalizes messy data exports, merges disparate CRM/ERP tables, handles fuzzy matching, and outputs analysis-ready schemas.",
    problemSolved: "Transformed hours of manual repetitive data cleaning across dirty sales ledgers into a single-click automated refresh flow.",
    stack: ["Power Query", "M Code", "Excel", "Data Wrangling", "Schema Validation"],
    keyFeatures: [
      "Reusable M-code functions for recursive header cleaning and type coercion",
      "Fuzzy logic algorithms for customer name matching and deduplication",
      "Automated currency conversion and multi-locale date standardizations",
      "Error-trapping steps that isolate invalid records for audit triage"
    ],
    metricsPreview: [
      { label: "Cleansing Steps", value: "40+ M-Rules" },
      { label: "Data Quality", value: "99.8%" },
      { label: "Refresh Time", value: "30 sec" }
    ],
    demoLink: "#power-query-engine",
    githubLink: "https://github.com/yourusername/power-query-engine"
  }
];

export const resumeData = {
  fileName: "Resume_Data_Analyst_AI_Developer.pdf",
  lastUpdated: "October 2026",
  highlights: [
    "Proficient across full data lifecycle: SQL querying, ETL (Power Query), and BI reporting (Power BI, Tableau)",
    "Hands-on experience deploying local LLM models (Ollama, Qwen) for privacy-first analytics and text-to-SQL",
    "Solid track record in 3 professional internships: Aram Pvt Ltd, Eagle Eye SafDrive Pvt Ltd, and AR4 Tech Pvt Ltd",
    "Skilled in Python scripting, Meta API data extraction, and relational database design"
  ]
};
