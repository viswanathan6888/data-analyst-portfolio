import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Download,
  ArrowRight,
  Database,
  Bot,
  Sparkles,
  Terminal,
  Code2,
  FileSpreadsheet,
  CheckCircle2
} from './Icons';

export default function Hero({ onOpenResume }) {
  const [activeTab, setActiveTab] = useState('sql');

  const codeSnippets = {
    sql: {
      title: 'lead_conversion_analytics.sql',
      badge: 'SQL & BI',
      code: `-- Aggregating lead conversion cohorts & velocity
WITH lead_cohorts AS (
  SELECT 
    DATE_TRUNC('month', created_at) AS cohort_month,
    lead_source,
    COUNT(lead_id) AS total_leads,
    COUNT(CASE WHEN status = 'WON' THEN 1 END) AS converted_leads,
    ROUND(AVG(sales_cycle_days), 1) AS avg_velocity
  FROM marketing_leads
  GROUP BY 1, 2
)
SELECT 
  cohort_month,
  lead_source,
  total_leads,
  converted_leads,
  ROUND((converted_leads::NUMERIC / total_leads) * 100, 2) AS conversion_rate_pct
FROM lead_cohorts
ORDER BY cohort_month DESC;`
    },
    ai: {
      title: 'ollama_qwen_analyst.py',
      badge: 'Local LLM / Qwen',
      code: `import ollama
from sqlalchemy import create_engine

# Initialize private local inference with Qwen
def analyze_telemetry_insights(prompt: str, schema_context: str):
    response = ollama.chat(
        model="qwen2.5-coder:7b",
        messages=[
            {"role": "system", "content": "You are a private Data Analyst AI agent. Generate safe SQL and brief insights."},
            {"role": "user", "content": f"Context: {schema_context}\\nQuery: {prompt}"}
        ],
        options={"temperature": 0.1}
    )
    return response['message']['content']

# Zero external cloud latency, 100% data confidentiality`
    },
    meta: {
      title: 'meta_api_pipeline.py',
      badge: 'Meta Graph API',
      code: `import requests

def fetch_campaign_roas(ad_account_id: str, access_token: str):
    url = f"https://graph.facebook.com/v21.0/{ad_account_id}/insights"
    params = {
        "fields": "campaign_name,spend,impressions,clicks,purchase_roas",
        "date_preset": "last_30d",
        "access_token": access_token
    }
    response = requests.get(url, params=params).json()
    # Normalize nested payloads into analytical star schema
    return [parse_ad_row(item) for item in response.get("data", [])]`
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Text Content */}
          <div className="hero-content">
            <div className="hero-status-pill animate-pulse-subtle">
              <span className="status-indicator"></span>
              <span className="status-text">{personalInfo.status}</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
            </h1>

            <div className="hero-subtitle-wrapper">
              <h2 className="hero-subtitle">
                <span className="text-gradient-cyan">Data Analyst</span>
                <span className="hero-divider">|</span>
                <span className="text-gradient">AI Developer</span>
              </h2>
            </div>

            <p className="hero-description">
              {personalInfo.tagline} Experienced in building high-clarity business intelligence 
              dashboards, advanced SQL pipelines, and autonomous AI agents powered by local LLMs (Ollama & Qwen).
            </p>

            {/* Quick Meta Stats / Highlights */}
            <div className="hero-meta-list">
              <div className="hero-meta-item">
                <CheckCircle2 size={16} className="hero-check-icon" />
                <span>3 Professional Internships</span>
              </div>
              <div className="hero-meta-item">
                <CheckCircle2 size={16} className="hero-check-icon" />
                <span>Local AI + Cloud Analytics</span>
              </div>
              <div className="hero-meta-item">
                <CheckCircle2 size={16} className="hero-check-icon" />
                <span>BI Dashboards & Meta API</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenResume}
                className="btn btn-secondary"
              >
                <Download size={16} />
                <span>Resume</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary"
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Stack Micro Pills */}
            <div className="hero-stack-row">
              <span className="stack-label">Core Ecosystem:</span>
              <div className="stack-pills">
                <span className="chip chip-violet">SQL & Python</span>
                <span className="chip chip-cyan">Power BI & Tableau</span>
                <span className="chip chip-violet">Ollama & Qwen</span>
                <span className="chip chip-cyan">Meta API & ETL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code & Pipeline Simulator */}
          <div className="hero-interactive-column">
            <div className="glass-card hero-terminal-card">
              {/* Terminal Window Header */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="terminal-title">
                  <Terminal size={14} />
                  <span>{codeSnippets[activeTab].title}</span>
                </div>
                <span className="chip chip-cyan" style={{ fontSize: '0.7rem' }}>
                  {codeSnippets[activeTab].badge}
                </span>
              </div>

              {/* Terminal Navigation Tabs */}
              <div className="terminal-tabs" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'sql'}
                  onClick={() => setActiveTab('sql')}
                  className={`terminal-tab ${activeTab === 'sql' ? 'terminal-tab-active' : ''}`}
                >
                  <Database size={14} />
                  <span>SQL Analytics</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'ai'}
                  onClick={() => setActiveTab('ai')}
                  className={`terminal-tab ${activeTab === 'ai' ? 'terminal-tab-active' : ''}`}
                >
                  <Bot size={14} />
                  <span>Ollama + Qwen</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'meta'}
                  onClick={() => setActiveTab('meta')}
                  className={`terminal-tab ${activeTab === 'meta' ? 'terminal-tab-active' : ''}`}
                >
                  <Code2 size={14} />
                  <span>Meta Graph API</span>
                </button>
              </div>

              {/* Code Display */}
              <div className="terminal-body">
                <pre className="terminal-code">
                  <code>{codeSnippets[activeTab].code}</code>
                </pre>
              </div>

              {/* Terminal Footer with Live Analytical Feed */}
              <div className="terminal-footer">
                <div className="terminal-stat">
                  <span className="terminal-stat-label">STATUS</span>
                  <span className="terminal-stat-val text-green">READY // OPTIMIZED</span>
                </div>
                <div className="terminal-stat">
                  <span className="terminal-stat-label">RUNTIME</span>
                  <span className="terminal-stat-val text-cyan">LOCAL / IN-MEMORY</span>
                </div>
                <div className="terminal-stat">
                  <span className="terminal-stat-label">SECURITY</span>
                  <span className="terminal-stat-val text-violet">ZERO DATA LEAKAGE</span>
                </div>
              </div>
            </div>

            {/* Float Highlight Badge */}
            <div className="glass-card hero-floating-badge animate-pulse-subtle">
              <div className="floating-badge-icon">
                <Sparkles size={20} className="text-cyan" />
              </div>
              <div className="floating-badge-text">
                <span className="floating-badge-title">Empirical + Generative</span>
                <span className="floating-badge-sub">Data Analyst + AI Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
