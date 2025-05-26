
import { Sparkles, Search, Zap, Layout, PenTool, Target } from "lucide-react";

export const AI_TOOLS = [
  { id: 'smart-editor', icon: Sparkles, label: 'Smart Editor', description: 'AI-powered content enhancement' },
  { id: 'job-analyzer', icon: Search, label: 'Job Analyzer', description: 'Match against job descriptions' },
  { id: 'content-enhancer', icon: Zap, label: 'Content Enhancer', description: 'Improve writing and impact' },
  { id: 'ats-optimizer', icon: Target, label: 'ATS Optimizer', description: 'Optimize for applicant tracking systems' },
  { id: 'structure-optimizer', icon: Layout, label: 'Structure Optimizer', description: 'Optimize layout and organization' },
  { id: 'resume-builder', icon: PenTool, label: 'Resume Builder', description: 'Build from scratch with AI' }
] as const;

export type AIToolId = typeof AI_TOOLS[number]['id'];
