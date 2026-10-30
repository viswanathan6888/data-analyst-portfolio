import React from 'react';
import {
  Database,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Terminal,
  Cpu,
  Sparkles,
  Bot,
  Share2,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Check,
  Copy,
  Code2,
  Layers,
  Briefcase,
  User,
  FolderGit2,
  ArrowUpRight,
  Menu,
  X,
  Send,
  Eye,
  FileText,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  Monitor,
  Lightbulb,
  Workflow,
  Info,
  Building,
  Printer,
  AlertCircle,
  Award,
  Trophy,
  GraduationCap,
  TrendingUp,
  Activity,
  ShieldCheck
} from 'lucide-react';

// Custom precision SVG icons for brand links
export const GithubIcon = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedinIcon = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.47 1.47 0 0 0 1.49-1.48 1.49 1.49 0 0 0-1.49-1.5 1.5 1.5 0 0 0-1.5 1.5 1.48 1.48 0 0 0 1.5 1.48m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export const PythonIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11.914 0C5.833 0 6.207 2.616 6.207 2.616l.007 2.71h5.81v.834H3.878S0 5.714 0 11.83c0 6.115 3.4 5.918 3.4 5.918h2.029v-2.853s-.11-3.4 3.342-3.4h5.753s3.23.052 3.23-3.136V3.136S18.3 0 11.914 0zm-3.21 1.874a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"/>
    <path d="M12.086 24c6.081 0 5.707-2.616 5.707-2.616l-.007-2.71h-5.81v-.834h8.146s3.878.446 3.878-5.67c0-6.115-3.4-5.918-3.4-5.918h-2.029v2.853s.11 3.4-3.342 3.4H9.427s-3.23-.052-3.23 3.136v5.244S5.7 24 12.086 24zm3.21-1.874a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0-2.1z"/>
  </svg>
);

export const SqlIcon = ({ size = 20, className = '' }) => (
  <Database size={size} className={className} />
);

// Map string icon names to component
export const getIconByName = (name, size = 20, className = '') => {
  switch (name) {
    case 'Database':
      return <Database size={size} className={className} />;
    case 'BarChart3':
      return <BarChart3 size={size} className={className} />;
    case 'PieChart':
      return <PieChart size={size} className={className} />;
    case 'Sheet':
    case 'FileSpreadsheet':
      return <FileSpreadsheet size={size} className={className} />;
    case 'Terminal':
      return <Terminal size={size} className={className} />;
    case 'Cpu':
      return <Cpu size={size} className={className} />;
    case 'Sparkles':
      return <Sparkles size={size} className={className} />;
    case 'Bot':
      return <Bot size={size} className={className} />;
    case 'Share2':
      return <Share2 size={size} className={className} />;
    case 'Download':
      return <Download size={size} className={className} />;
    case 'Code2':
      return <Code2 size={size} className={className} />;
    case 'Layers':
      return <Layers size={size} className={className} />;
    case 'Briefcase':
      return <Briefcase size={size} className={className} />;
    case 'User':
      return <User size={size} className={className} />;
    case 'Workflow':
      return <Workflow size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
};

export {
  Database,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Terminal,
  Cpu,
  Sparkles,
  Bot,
  Share2,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Check,
  Copy,
  Code2,
  Layers,
  Briefcase,
  User,
  FolderGit2,
  ArrowUpRight,
  Menu,
  X,
  Send,
  Eye,
  FileText,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  Monitor,
  Lightbulb,
  Workflow,
  Info,
  Building,
  Printer,
  AlertCircle,
  Award,
  Trophy,
  GraduationCap,
  TrendingUp,
  Activity,
  ShieldCheck
};