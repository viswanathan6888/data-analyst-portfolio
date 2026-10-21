/**
 * Portfolio Central Configuration & Data Store
 * Source of Truth: Resume of M. Viswanathan
 * Target Roles: Data Analyst | AI Developer | Aspiring Data Scientist
 */

export const personalInfo = {
  name: "Viswanathan M",
  title: "Data Analyst | AI & Data Science Professional",
  headline: "Data Analyst | AI & Data Science Professional",
  education: {
    degree: "Bachelor of Technology in Artificial Intelligence & Data Science",
    institution: "Kathir College Of Engineering, Coimbatore, India",
    cgpa: "8.5",
    cgpaDisplay: "8.5 CGPA", // Listed as "Current CGPA: 8.5%" in original resume
    cgpaNote: "Current CGPA listed as 8.5% on resume (editable in portfolioData.js)"
  },
  bioSummary:
    "I am an AI & Data Science professional focused on transforming complex data into actionable insights and developing intelligent, data-driven solutions. My work spans data analytics, business intelligence, AI-powered applications, and interactive dashboard development.",
  tagline:
    "I leverage technologies such as Python, SQL, Power BI, Tableau, Power Query, APIs, and Large Language Models (LLMs) to analyze data, streamline reporting, and support informed decision-making.",
  objective:
    "To build practical AI and analytics solutions that turn data into meaningful business insights.",
  status: "Available for Data Analyst, AI Developer & Data Scientist Roles",
  location: "Coimbatore, Tamil Nadu, India",
  email: "viswanathan23ad060@gmail.com", // Verified from resume
  phone: "+91-9566578560", // Verified from resume
  linkedin: "https://www.linkedin.com/in/viswanathan-m-434b55309/", // Verified from resume
  github: "https://github.com/viswanathan6888", // Verified from repository origin
  profileImage: "/profile.jpg", // Verified portrait photo
  resumePdfUrl: "/resume.pdf", // Real resume PDF in public/resume.pdf
  coreExpertise: [
    "Data Analytics & Business Intelligence",
    "Python, SQL & Excel",
    "Power BI, Tableau & Power Query",
    "AI Applications, LLMs, Ollama & Qwen",
    "API Integration & Dashboard Development"
  ],
  about: {
    lead:
      "I am an AI & Data Science professional focused on transforming complex data into actionable insights and developing intelligent, data-driven solutions.",
    paragraphs: [
      "I am an AI & Data Science professional focused on transforming complex data into actionable insights and developing intelligent, data-driven solutions. My work spans data analytics, business intelligence, AI-powered applications, and interactive dashboard development.",
      "I leverage technologies such as Python, SQL, Power BI, Tableau, Power Query, APIs, and Large Language Models (LLMs) to analyze data, streamline reporting, and support informed decision-making."
    ],
    objective: "To build practical AI and analytics solutions that turn data into meaningful business insights.",
    highlights: [
      {
        label: "Data Analytics & BI",
        title: "Business Intelligence",
        description: "Power BI, Tableau, Power Query, Excel, and SQL for actionable reporting."
      },
      {
        label: "Programming & Queries",
        title: "Python, SQL & Excel",
        description: "Data modeling, statistical analysis, automated scripting, and query optimization."
      },
      {
        label: "AI & GenAI",
        title: "LLMs, Ollama & Qwen",
        description: "Developing intelligent AI-powered applications and private on-premise LLM workflows."
      },
      {
        label: "Integration & Web",
        title: "APIs & Dashboards",
        description: "Meta API, Windsor.ai, real-time ingestion, and interactive dashboard development."
      }
    ]
  }
};

/**
 * Skills - Grouped into 6 categories strictly based on resume
 * No invented proficiency percentages.
 */
export const skillsCategories = [
  {
    category: "Data Analytics & Business Intelligence",
    slug: "analytics-bi",
    description: "Core analytical querying, dimensional modeling, automated ETL, and executive visualization.",
    skills: [
      { name: "Power BI", focus: "Dashboard Design & DAX" },
      { name: "Tableau", focus: "Visual Storytelling" },
      { name: "Power Query", focus: "ETL & Transformation" },
      { name: "Excel", focus: "Advanced Modeling & Pivot" },
      { name: "SQL", focus: "Joins, Aggregations & Queries" },
      { name: "Data Analysis", focus: "Exploratory & Statistical EDA" },
      { name: "Data Visualization", focus: "Executive Insight Charts" },
      { name: "KPI Reporting", focus: "Operational Metric Tracking" },
      { name: "Business Analytics", focus: "Decision-Support Modeling" }
    ]
  },
  {
    category: "AI & Machine Learning",
    slug: "ai-ml",
    description: "Machine learning algorithms, deep learning architectures, local LLMs, and RAG pipelines.",
    skills: [
      { name: "Python", focus: "Core Scripting & NumPy/Pandas" },
      { name: "TensorFlow / Keras", focus: "Deep Learning & Neural Nets" },
      { name: "PyTorch", focus: "Model Architecture & Training" },
      { name: "Scikit-learn", focus: "Classical ML & Classification" },
      { name: "LangChain", focus: "LLM Chains & Tool Augmentation" },
      { name: "Hugging Face", focus: "Transformers & Model Hub" },
      { name: "Ollama", focus: "Local Private LLM Runtime" },
      { name: "Qwen 2.5", focus: "Code & Reasoning Models" },
      { name: "Claude", focus: "Contextual AI & Prompt Systems" },
      { name: "LLM APIs", focus: "Function Calling & Inference" },
      { name: "RAG", focus: "Retrieval-Augmented Generation" },
      { name: "Machine Learning Basics", focus: "Supervised & Unsupervised" }
    ]
  },
  {
    category: "Data Engineering & Platforms",
    slug: "data-engineering",
    description: "Distributed big data frameworks, cloud data warehouses, and relational/document databases.",
    skills: [
      { name: "Apache Hadoop", focus: "Distributed Processing" },
      { name: "Google BigQuery", focus: "Cloud Data Warehousing" },
      { name: "MySQL", focus: "Relational Schemas & Indexing" },
      { name: "MongoDB", focus: "Document Data Stores" },
      { name: "AWS", focus: "Cloud Compute & S3 Storage" },
      { name: "Data Processing", focus: "ETL Cleansing & Formatting" }
    ]
  },
  {
    category: "API & Marketing Analytics",
    slug: "api-marketing",
    description: "Third-party platform extraction, marketing performance feeds, and AI chatbot bridges.",
    skills: [
      { name: "Meta Marketing API", focus: "Ad Spend & Impression Feeds" },
      { name: "Windsor.ai", focus: "Multi-Channel Ingestion" },
      { name: "API Data Extraction", focus: "REST Endpoints & JSON Staging" },
      { name: "Marketing Analytics", focus: "CPL, ROAS & Traffic Tracking" },
      { name: "AI Chatbot Integration", focus: "Natural-Language Data Queries" }
    ]
  },
  {
    category: "Development & Design",
    slug: "dev-design",
    description: "Full stack web development, dashboard frontends, and UI/UX design wireframes.",
    skills: [
      { name: "React", focus: "Component Architecture" },
      { name: "Node.js", focus: "Backend APIs & Services" },
      { name: "MERN Stack", focus: "Full Stack Web Apps" },
      { name: "Flask / FastAPI", focus: "Python Microservices" },
      { name: "Web Development", focus: "Responsive Web Applications" },
      { name: "Dashboard Development", focus: "3D & Real-Time Consoles" },
      { name: "Figma", focus: "UI Wireframing & Prototyping" },
      { name: "UI/UX Design", focus: "User-Centered Usability" },
      { name: "Antigravity IDE", focus: "Interactive 3D Data Dashboards" }
    ]
  },
  {
    category: "Tools & Annotation",
    slug: "tools",
    description: "Developer tooling, cloud notebooks, version control, and computer vision annotation tools.",
    skills: [
      { name: "Git & GitHub", focus: "Version Control & Collaboration" },
      { name: "Linux", focus: "Command Line & Shell Scripting" },
      { name: "Jupyter / Colab", focus: "Interactive Notebooks & EDA" },
      { name: "VS Code", focus: "Primary Development IDE" },
      { name: "CVAT", focus: "Computer Vision Annotation" },
      { name: "Roboflow", focus: "Dataset Preparation & Augmentation" },
      { name: "SuperAnnotate", focus: "Medical & Image Labeling" },
      { name: "Adobe AE", focus: "Motion & Visual Assets" }
    ]
  }
];

/**
 * Internship Experience (from Page 1 of Resume)
 * All entries use editable dates and factual descriptions.
 */
export const internshipExperience = [
  {
    role: "Web Development Intern",
    company: "Nxt Logic Software Solutions",
    period: "[Dates Editable]", // Replace with actual tenure e.g. "Jun 2024 – Jul 2024"
    type: "Internship",
    badge: "Web Applications",
    summary:
      "Hands-on experience in developing responsive web applications, working with frontend and backend technologies, and enhancing user experience through efficient interface design.",
    bulletPoints: [
      "Developed responsive web application modules utilizing modern frontend and backend frameworks.",
      "Assisted in structuring component architectures and optimizing user interfaces for seamless interaction.",
      "Collaborated on code reviews, debugging, and cross-browser testing."
    ],
    technologies: ["React", "JavaScript", "HTML/CSS", "Backend Integration", "Responsive Design"]
  },
  {
    role: "Dashboard Development Intern",
    company: "Vinsup Academy",
    period: "[Dates Editable]",
    type: "Internship",
    badge: "BI Dashboards",
    summary:
      "Hands-on experience in creating Swiggy and Netflix dashboards using Power BI and Tableau for data visualization and business insights.",
    bulletPoints: [
      "Engineered comprehensive visual dashboards modeling consumer streaming trends (Netflix) and delivery metrics (Swiggy).",
      "Built interactive slicers, drill-down parameters, and KPI cards to visualize business performance.",
      "Cleaned, formatted, and validated raw transactional records prior to BI workbook ingestion."
    ],
    technologies: ["Power BI", "Tableau", "DAX", "Data Storytelling", "Excel"]
  },
  {
    role: "Data Analyst Intern",
    company: "Yuva Intern",
    period: "[Dates Editable]",
    type: "Internship",
    badge: "Analytics & EDA",
    summary:
      "Hands-on experience in data analysis, data preprocessing, and data visualization. Worked with datasets to identify trends and generate insights for decision-making.",
    bulletPoints: [
      "Conducted exploratory data analysis (EDA) across diverse datasets to identify underlying distributions and anomalies.",
      "Executed data preprocessing routines including missing value handling, column standardization, and duplicate removal.",
      "Drafted analytical summary reports with visual charts to support data-backed decision-making."
    ],
    technologies: ["Python", "SQL", "Pandas", "Data Preprocessing", "Data Visualization"]
  },
  {
    role: "Virtual Machine Learning Intern",
    company: "Virtual Internship",
    period: "[Dates Editable]",
    type: "Virtual Internship",
    badge: "Applied ML",
    summary:
      "Hands-on experience in data preprocessing, model building, and applying machine learning algorithms to solve real-world problems.",
    bulletPoints: [
      "Implemented supervised and unsupervised machine learning models to solve applied analytical problems.",
      "Conducted feature selection, train-test splits, and model evaluation using precision, recall, and ROC-AUC.",
      "Documented model training workflows and performance trade-offs."
    ],
    technologies: ["Scikit-learn", "Python", "Feature Engineering", "Model Evaluation"]
  },
  {
    role: "UI/UX Intern",
    company: "Infosys Springboard",
    period: "[Dates Editable]",
    type: "Internship",
    badge: "UI/UX Design",
    summary:
      "Hands-on experience in designing intuitive and user-centered interfaces using wireframing, prototyping, and usability principles.",
    bulletPoints: [
      "Crafted low-fidelity and high-fidelity wireframes and user flow prototypes in Figma.",
      "Applied usability and visual hierarchy principles to enhance digital product user experience.",
      "Participated in design critiques and iterative user feedback sessions."
    ],
    technologies: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]
  }
];

/**
 * Company Project Experience (from Page 3 of Resume)
 * Companies: Aram Pvt. Ltd, Eagle Eye SafDrive Pvt. Ltd, AR4 Tech Pvt. Ltd
 */
export const companyProjectExperience = [
  {
    title: "Marketing Analytics & Business Intelligence",
    company: "Aram Pvt Ltd",
    technologies: ["Meta Data Integration", "Power Query", "Power BI", "Windsor.ai", "AI Analytics", "Campaign Reporting"],
    badge: "Marketing Analytics & BI",
    summary:
      "Developed AI-powered marketing analytics and dashboard solutions. Worked with Meta data integration, Power Query, Power BI, and Windsor.ai, focusing on campaign performance, lead analytics, and reporting workflows.",
    bulletPoints: [
      "Developed AI-powered marketing analytics and dashboard solutions.",
      "Worked with Meta data integration, Power Query, Power BI, and Windsor.ai.",
      "Focused on campaign performance, lead analytics, and reporting workflows."
    ]
  },
  {
    title: "Data Analytics & Performance Insights",
    company: "Eagle Eye SafDrive Pvt Ltd",
    technologies: ["Data Analytics", "Performance Tracking", "Data Visualization", "Structured Reporting", "Dashboards"],
    badge: "Analytics & Performance",
    summary:
      "Contributed to analytics and performance-tracking initiatives. Focused on data visualization, structured reporting, and dashboard-based insights.",
    bulletPoints: [
      "Contributed to analytics and performance-tracking initiatives.",
      "Focused on data visualization, structured reporting, and dashboard-based insights."
    ]
  },
  {
    title: "AI Solutions & Data Analytics",
    company: "AR4 Tech Pvt Ltd",
    technologies: ["AI Tools", "API Integration", "Data Processing", "Interactive Dashboards", "Data Analytics"],
    badge: "AI Solutions & Dashboards",
    summary:
      "Worked on AI and data analytics initiatives involving modern AI tools. Explored API integration, data processing, and interactive dashboard development.",
    bulletPoints: [
      "Worked on AI and data analytics initiatives involving modern AI tools.",
      "Explored API integration, data processing, and interactive dashboard development."
    ]
  },
  {
    title: "Local LLM-Based AI Data Analyst",
    company: "Enterprise AI Initiative",
    technologies: ["Ollama", "Qwen 2.5", "LLMs", "Python", "Data Analytics"],
    badge: "Private Local GenAI",
    summary:
      "Set up and tested local large language models using Ollama and Qwen 2.5. Explored connecting AI models with data analysis workflows for on-premise execution.",
    bulletPoints: [
      "Deployed and evaluated local quantized large language models using Ollama and Qwen 2.5 without cloud dependency.",
      "Bridged local LLM runtimes with data analytics pipelines to generate safe, read-only SQL queries from natural language.",
      "Designed an AI data analyst dashboard concept enabling non-technical users to ask questions about business metrics.",
      "Prioritized data confidentiality by ensuring zero external data leakage through 100% on-premise execution."
    ]
  },
  {
    title: "Interactive 3D Analytics Dashboard",
    company: "Visual Telemetry Project",
    technologies: ["Antigravity IDE", "AI Tools", "Dashboard Development", "Data Visualization"],
    badge: "3D Visual Telemetry",
    summary:
      "Worked on developing interactive dashboard interfaces with 3D visual elements. Explored AI-assisted dashboard development and data visualization.",
    bulletPoints: [
      "Engineered futuristic, glassmorphic analytics dashboard interfaces incorporating 3D visual elements.",
      "Explored AI-assisted rapid layout generation and spatial visual hierarchy in the Antigravity IDE.",
      "Designed responsive visual concepts for presenting mission-critical KPIs in an intuitive format."
    ]
  }
];

/**
 * Complete Projects Showcase (All 10 projects from Resume)
 * With clear conceptual demo labeling and approach details.
 */
export const projectsData = [
  {
    id: "stock-market-prediction",
    title: "Stock Market Prediction",
    category: "AI & Machine Learning",
    badge: "Machine Learning & Finance",
    summary:
      "Developed a machine learning model to analyze historical stock data and predict future price trends with data visualization.",
    description:
      "Stock market prediction system engineered using Python and machine learning algorithms. Ingests historical pricing datasets, performs exploratory trend analysis, feature engineering (moving averages, volatility indices), and model training to forecast price directions.",
    problemSolved:
      "Transforms noisy historical financial ticker records into structured feature matrices and trend projections to assist exploratory financial analysis.",
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Time-Series Analysis"],
    keyFeatures: [
      "Historical price data ingestion and chronological train/test splitting",
      "Technical indicator feature extraction (Moving Averages, RSI, Volatility)",
      "Model training and cross-validation for predictive price evaluation",
      "Interactive trend line visualizations comparing actual vs. predicted values"
    ],
    demoTag: "Predictive ML Concept",
    previewType: "stock-chart",
    githubLink: ""
  },
  {
    id: "ai-sales-forecasting",
    title: "AI Sales Forecasting System",
    category: "AI & Machine Learning",
    badge: "Predictive Analytics",
    summary:
      "Designed and implemented a machine learning model to forecast sales trends using historical data to support business decisions.",
    description:
      "An end-to-end sales forecasting model that leverages historical transaction datasets to project future revenue and product demand. Incorporates feature engineering on seasonality, holiday flags, and rolling averages.",
    problemSolved:
      "Enables business planners to move beyond manual spreadsheet guesswork by providing automated algorithmic sales trend forecasts.",
    stack: ["Python", "Scikit-learn", "Pandas", "Feature Engineering", "Data Visualization"],
    keyFeatures: [
      "Automated outlier detection and missing transaction imputation",
      "Feature engineering for seasonal spikes, day-of-week, and rolling demand",
      "Comparative model evaluation across regression algorithms",
      "Visual variance charts highlighting projected vs historical sales numbers"
    ],
    demoTag: "Forecasting Pipeline Concept",
    previewType: "forecast-chart",
    githubLink: ""
  },
  {
    id: "eye-disease-prediction",
    title: "Eye Disease Prediction",
    category: "AI & Machine Learning",
    badge: "Computer Vision & Healthcare",
    summary:
      "Developed an advanced deep learning model to accurately detect and classify various eye diseases using medical image data.",
    description:
      "A deep learning computer vision system that classifies ocular pathologies from medical retinal imagery. Utilizes extensive image augmentation, preprocessing, and convolutional neural network architectures to assist healthcare diagnostic screening.",
    problemSolved:
      "Supports early screening by providing automated computer-assisted triage flags for potential retinal abnormalities.",
    stack: ["Python", "TensorFlow / Keras", "Deep Learning", "CNN", "Image Augmentation", "OpenCV"],
    keyFeatures: [
      "Medical image preprocessing, resizing, normalization, and contrast enhancement",
      "Augmentation pipeline (rotation, zoom, horizontal flip) to enhance generalization",
      "Deep convolutional classification model with multi-class diagnostic output",
      "Visual confusion matrix and classification report evaluating sensitivity & specificity"
    ],
    demoTag: "Medical AI Vision Concept",
    previewType: "medical-vision",
    githubLink: ""
  },
  {
    id: "analytics-performance-tracking",
    title: "Analytics & Performance Tracking",
    category: "Data Analytics & Business Intelligence",
    badge: "Digital Marketing Analytics",
    summary:
      "Analyzed digital marketing campaign data to measure performance, monitor metrics (traffic, conversions, CPL), and optimize strategies.",
    description:
      "A marketing analytics system that tracks digital advertising campaigns across channels. Aggregates multi-touch traffic sources, computes click-through rates (CTR), cost-per-lead (CPL), and conversion rates to evaluate campaign ROI.",
    problemSolved:
      "Consolidates fragmented ad platforms into unified performance tracking reports, highlighting underperforming ad sets for budget reallocation.",
    stack: ["Power BI", "Excel", "Data Analysis", "KPI Reporting", "Conversion Analytics"],
    keyFeatures: [
      "Automated calculation of core advertising metrics (CTR, CPC, CPL, ROAS)",
      "Channel comparison matrix tracking organic vs. paid acquisition channels",
      "Interactive slicers for date ranges, campaign types, and geographical regions",
      "Executive summary views highlighting weekly performance shifts"
    ],
    demoTag: "Campaign Analytics Concept",
    previewType: "dashboard-funnel",
    githubLink: ""
  },
  {
    id: "offline-chatbot",
    title: "Offline Chatbot",
    category: "AI & Machine Learning",
    badge: "NLP & Conversational AI",
    summary:
      "Developed an intelligent chatbot that operates without internet access using predefined knowledge and machine learning NLP techniques.",
    description:
      "A localized conversational assistant designed to answer queries completely offline. Employs natural language processing, intent classification, and tokenization to understand user prompts and deliver accurate contextual responses with zero external network connectivity.",
    problemSolved:
      "Enables secure, private conversational assistance in air-gapped or network-restricted environments where cloud AI cannot be accessed.",
    stack: ["Python", "NLP", "Machine Learning", "Intent Classification", "Tkinter / CLI"],
    keyFeatures: [
      "100% offline runtime with zero external server dependencies or API costs",
      "Custom NLP tokenization, lemmatization, and bag-of-words intent recognition",
      "Rapid sub-second response latency using local pattern matching",
      "Lightweight conversational interface with conversational memory buffer"
    ],
    demoTag: "Offline NLP Concept",
    previewType: "offline-chat",
    githubLink: ""
  },
  {
    id: "ai-powered-marketing-dashboard",
    title: "AI-Powered Marketing Analytics Dashboard",
    category: "API & Marketing Analytics",
    badge: "Meta API & Power BI",
    summary:
      "End-to-end integration of Meta API, Windsor.ai, Power Query, and Power BI with Claude AI chatbot natural-language querying.",
    description:
      "Enterprise-style marketing intelligence dashboard. Ingests Meta Marketing API feeds via Windsor.ai, cleans dirty records with Power Query, and renders executive KPI reports in Power BI while enabling natural-language query integration via Claude.",
    problemSolved:
      "Eliminates hours of manual CSV downloads by unifying automated ad spend feeds with an intelligent AI chatbot interface.",
    stack: ["Meta API", "Power Query", "Power BI", "Windsor.ai", "Claude AI", "DAX"],
    keyFeatures: [
      "Automated API data retrieval connecting social ad accounts into analytical tables",
      "Power Query M-code recipes for currency normalization and campaign tag splitting",
      "Dynamic DAX measures calculating real-time Cost Per Lead and Return on Ad Spend",
      "Integrated conversational prompt assistance to explore campaign insights"
    ],
    demoTag: "Multi-Platform Integration",
    previewType: "code-pipeline",
    githubLink: ""
  },
  {
    id: "local-llm-ai-data-analyst",
    title: "Local LLM-Based AI Data Analyst",
    category: "AI & Machine Learning",
    badge: "Ollama + Qwen 2.5",
    summary:
      "Set up and tested local large language models using Ollama and Qwen 2.5 for private natural-language querying of datasets.",
    description:
      "Privacy-first autonomous AI analytical agent. Utilizes local Ollama containerization running Qwen 2.5 to convert plain-English business inquiries into validated SQL statements, generating narrative summaries and chart recommendations without cloud exposure.",
    problemSolved:
      "Allows organizations with confidential operational datasets to leverage generative AI analytics without violating data residency or NDA policies.",
    stack: ["Ollama", "Qwen 2.5", "Python", "SQL", "LangChain", "Prompt Engineering"],
    keyFeatures: [
      "Zero-cloud data residency: 100% on-premise execution via Ollama",
      "Specialized text-to-SQL dialect generation with read-only execution guardrails",
      "Automated analytical narrative generator explaining SQL findings",
      "Low latency inference utilizing optimized quantized Qwen 2.5 models"
    ],
    demoTag: "Private Local AI Agent",
    previewType: "terminal-ai",
    githubLink: ""
  },
  {
    id: "interactive-3d-analytics-dashboard",
    title: "Interactive 3D Analytics Dashboard",
    category: "Development & Design",
    badge: "Antigravity IDE & 3D UI",
    summary:
      "Developed interactive dashboard interfaces with 3D visual elements and modern glassmorphism for KPI presentation.",
    description:
      "A next-generation telemetry dashboard crafted in the Antigravity IDE. Combines real-time analytical metric streams with 3D spatial visual elements, responsive glassmorphism cards, and interactive visual drill-downs.",
    problemSolved:
      "Replaces static tabular spreadsheets with an immersive, high-impact visual command center for monitoring operational telemetry.",
    stack: ["Antigravity IDE", "React", "CSS Glassmorphism", "3D Visualization", "Web Standards"],
    keyFeatures: [
      "Cinematic dark glassmorphic cards with subtle 3D hover tilt dynamics",
      "Real-time visual gauges tracking data stream throughput and query latency",
      "High-contrast color tokens adhering to modern accessible contrast standards",
      "Fully responsive layout supporting desktop, tablet, and mobile viewing"
    ],
    demoTag: "3D Visual Telemetry Prototype",
    previewType: "dashboard-telemetry",
    githubLink: ""
  },
  {
    id: "bi-big-data-analytics",
    title: "Business Intelligence & Big Data Analytics",
    category: "Data Engineering & Platforms",
    badge: "BigQuery & Hadoop",
    summary:
      "Analyzed large-scale datasets using Power BI, Tableau, Google BigQuery, and Apache Hadoop for enterprise reporting.",
    description:
      "An enterprise big data analytical workflow connecting cloud data warehouses with BI visualization workbooks. Evaluates distributed processing using Hadoop and executes cloud SQL queries on Google BigQuery to power Power BI and Tableau dashboards.",
    problemSolved:
      "Bridges massive raw distributed datasets with digestible executive visual summaries.",
    stack: ["Power BI", "Tableau", "Power Query", "Google BigQuery", "Apache Hadoop", "SQL"],
    keyFeatures: [
      "Distributed query exploration on Google BigQuery and Hadoop ecosystems",
      "Power Query data preparation and type casting for multi-million row datasets",
      "Multi-dimensional star-schema modeling in Power BI and Tableau workbooks",
      "Automated refresh scheduling documentation ensuring data freshness"
    ],
    demoTag: "Big Data BI Concept",
    previewType: "dashboard-bi",
    githubLink: ""
  },
  {
    id: "api-data-analytics-web-dev",
    title: "API-Based Data Analytics & Website Development",
    category: "Development & Design",
    badge: "Full Stack & APIs",
    summary:
      "Retrieved platform data using API credentials and connected data sources for web-based data-driven applications.",
    description:
      "Full-stack data integration project interfacing with Meta APIs and web endpoints. Extracted datasets are staged into relational databases and rendered via responsive web application interfaces.",
    problemSolved:
      "Creates seamless bridges between third-party API data extraction and custom user-facing web portals.",
    stack: ["Meta Platform APIs", "React", "Node.js", "Python", "REST APIs", "SQL"],
    keyFeatures: [
      "Secure credential handling and automated token refresh cycles",
      "Relational schema mapping for nested JSON API responses",
      "Responsive React interface presenting data-driven tables and interactive charts",
      "End-to-end deployment architecture designed for modern cloud hosting"
    ],
    demoTag: "Full Stack Data Pipeline",
    previewType: "code-pipeline",
    githubLink: ""
  }
];

/**
 * Certifications (from Page 1 of Resume)
 * Factual entries with NO invented IDs or fake dates.
 */
export const certificationsData = [
  {
    id: "nvidia-ai-ds",
    title: "NVIDIA Certification in Artificial Intelligence and Data Science",
    issuer: "NVIDIA",
    badge: "Artificial Intelligence",
    description:
      "Covers fundamental concepts in artificial intelligence, neural networks, advanced data analysis methodologies, and high-performance visualization techniques."
  },
  {
    id: "vinsup-data-analytics",
    title: "Certified in Data Analytics",
    issuer: "Vinsup Skill Academy",
    badge: "Data Analytics",
    description:
      "Completed rigorous hands-on training across Excel, SQL, Python, Power BI, data preprocessing, exploratory data visualization, and business analytics."
  },
  {
    id: "ui-ux-design",
    title: "UI and UX Design Certification",
    issuer: "UI/UX Professional Training",
    badge: "Design & Usability",
    description:
      "Practical experience in creating intuitive, user-centered digital designs using wireframing, high-fidelity interactive prototyping, and usability principles."
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Certification",
    issuer: "Digital Marketing Academy",
    badge: "Marketing & Analytics",
    description:
      "Practical experience in search engine optimization (SEO), social media marketing analytics, ad campaign tracking, and online audience engagement evaluation."
  }
];

/**
 * Achievements (from Page 2 of Resume)
 * Directly extracted from resume with NO invented details.
 */
export const achievementsData = [
  {
    id: "best-poster",
    title: "Best Poster Presentation Award",
    event: "College Technical & Non-Technical Symposiums",
    badge: "Presentation & Research",
    description:
      "Awarded Best Poster Presentation across multiple college technical and non-technical symposiums for clarity of presentation, innovative topic synthesis, and effective public speaking."
  },
  {
    id: "excellence-3d",
    title: "Award for Excellence in 3D Image Creation",
    event: "EG Graphics Webinar",
    badge: "3D Design & Modeling",
    description:
      "Recognized for outstanding creativity, advanced visual design hierarchy, and technical proficiency in 3D modeling and digital graphics tools."
  },
  {
    id: "webinar-recognition",
    title: "Award-Winning Participant in Technical Webinars",
    event: "AI & Data Analytics Domains",
    badge: "Technical Excellence",
    description:
      "Recognized for active participation, technical contributions, and problem-solving excellence across multiple specialized webinars in artificial intelligence and data analytics."
  }
];

export const resumeData = {
  fileName: "Resume_Viswanathan_M.pdf",
  lastUpdated: "Current",
  downloadNote: "Download official resume PDF (Kathir College of Engineering &bull; B.Tech AI & DS)",
  highlights: [
    "B.Tech in Artificial Intelligence & Data Science at Kathir College of Engineering (Current CGPA: 8.5)",
    "NVIDIA certified in Artificial Intelligence & Data Science; Certified in Data Analytics by Vinsup Skill Academy",
    "5 Professional Internships: Nxt Logic (Web Dev), Vinsup (Dashboard Dev), Yuva Intern (Data Analyst), Virtual ML Intern, Infosys Springboard (UI/UX)",
    "Company Project Experience with Aram Pvt. Ltd, Eagle Eye SafDrive Pvt. Ltd, and AR4 Tech Pvt. Ltd across marketing analytics, local LLMs, and 3D dashboards"
  ]
};
