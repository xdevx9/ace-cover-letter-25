
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Sparkles, Search, Zap, Layout, PenTool, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIToolsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyContent: (content: string) => void;
  currentContent: string;
}

export function AIToolsSidebar({ isOpen, onClose, onApplyContent, currentContent }: AIToolsSidebarProps) {
  const [activeTab, setActiveTab] = useState<'smart-editor' | 'job-analyzer' | 'content-enhancer' | 'ats-optimizer' | 'structure-optimizer' | 'resume-builder'>('smart-editor');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [jobDescription, setJobDescription] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    jobTitle: "",
    industry: "",
    experience: "",
    skills: ""
  });

  const handleAIOperation = async (operation: string) => {
    setIsLoading(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let enhancedContent = currentContent;
      
      switch (operation) {
        case 'enhance':
          enhancedContent = currentContent + "\n\n*Enhanced with AI suggestions*";
          break;
        case 'optimize':
          enhancedContent = currentContent.replace(/\n/g, '\n\n') + "\n\n*Optimized for ATS*";
          break;
        case 'analyze':
          toast({
            title: "Job Analysis Complete",
            description: "Match score: 85% - Missing keywords: React, TypeScript",
          });
          return;
        case 'build':
          enhancedContent = `# ${userInfo.name || 'Your Name'}

**${userInfo.jobTitle || 'Professional Title'}** | email@example.com | (555) 123-4567

---

## Professional Summary

Experienced ${userInfo.jobTitle?.toLowerCase() || 'professional'} with ${userInfo.experience || 'X'} years in ${userInfo.industry || 'the industry'}. Skilled in ${userInfo.skills || 'various technologies'}.

---

## Technical Skills

**Core Skills:** ${userInfo.skills || 'Add your skills'}

---

## Professional Experience

### ${userInfo.jobTitle || 'Job Title'} | Company Name
*Dates*

- Achieved significant results through innovative approaches
- Led cross-functional teams to deliver high-impact projects
- Implemented best practices that improved efficiency

---

## Education

### Degree | University Name
*Graduation Year*`;
          break;
      }
      
      if (operation !== 'analyze') {
        onApplyContent(enhancedContent);
        toast({
          title: "AI Enhancement Applied",
          description: "Your content has been updated with AI suggestions.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process AI request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const tools = [
    { id: 'smart-editor', icon: Sparkles, label: 'Smart Editor', description: 'AI-powered section editing' },
    { id: 'job-analyzer', icon: Search, label: 'Job Analyzer', description: 'Match against job descriptions' },
    { id: 'content-enhancer', icon: Zap, label: 'Content Enhancer', description: 'Improve writing and impact' },
    { id: 'ats-optimizer', icon: Target, label: 'ATS Optimizer', description: 'Optimize for applicant tracking systems' },
    { id: 'structure-optimizer', icon: Layout, label: 'Structure Optimizer', description: 'Optimize layout and organization' },
    { id: 'resume-builder', icon: PenTool, label: 'Resume Builder', description: 'Build from scratch with AI' }
  ];

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 border-l shadow-lg z-50 overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">AI Tools</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={activeTab === tool.id ? "default" : "outline"}
              size="sm"
              className="h-auto p-2 flex flex-col items-center text-xs"
              onClick={() => setActiveTab(tool.id as any)}
            >
              <tool.icon className="h-4 w-4 mb-1" />
              <span className="text-center">{tool.label}</span>
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              {tools.find(t => t.id === activeTab)?.icon && (
                <tools.find(t => t.id === activeTab)!.icon className="h-4 w-4" />
              )}
              <span>{tools.find(t => t.id === activeTab)?.label}</span>
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {tools.find(t => t.id === activeTab)?.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeTab === 'smart-editor' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('enhance')}
                  disabled={isLoading}
                >
                  {isLoading ? "Enhancing..." : "Enhance Content"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI will analyze and improve your resume content with better language and impact.
                </div>
              </div>
            )}

            {activeTab === 'job-analyzer' && (
              <div className="space-y-3">
                <Label htmlFor="job-desc" className="text-xs">Job Description</Label>
                <Textarea
                  id="job-desc"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="text-xs"
                  rows={4}
                />
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('analyze')}
                  disabled={isLoading || !jobDescription.trim()}
                >
                  {isLoading ? "Analyzing..." : "Analyze Match"}
                </Button>
              </div>
            )}

            {activeTab === 'content-enhancer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('enhance')}
                  disabled={isLoading}
                >
                  {isLoading ? "Enhancing..." : "Enhance Writing"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Improve writing quality, impact, and professional tone.
                </div>
              </div>
            )}

            {activeTab === 'ats-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('optimize')}
                  disabled={isLoading}
                >
                  {isLoading ? "Optimizing..." : "Optimize for ATS"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Optimize formatting and keywords for applicant tracking systems.
                </div>
              </div>
            )}

            {activeTab === 'structure-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('optimize')}
                  disabled={isLoading}
                >
                  {isLoading ? "Optimizing..." : "Optimize Structure"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Reorganize sections for maximum impact and readability.
                </div>
              </div>
            )}

            {activeTab === 'resume-builder' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-xs">Target Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Software Engineer"
                    value={userInfo.jobTitle}
                    onChange={(e) => setUserInfo({...userInfo, jobTitle: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Technology"
                    value={userInfo.industry}
                    onChange={(e) => setUserInfo({...userInfo, industry: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-xs">Years of Experience</Label>
                  <Input
                    id="experience"
                    placeholder="e.g., 5"
                    value={userInfo.experience}
                    onChange={(e) => setUserInfo({...userInfo, experience: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-xs">Key Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="List your key skills..."
                    value={userInfo.skills}
                    onChange={(e) => setUserInfo({...userInfo, skills: e.target.value})}
                    className="text-xs"
                    rows={3}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('build')}
                  disabled={isLoading || !userInfo.name || !userInfo.jobTitle}
                >
                  {isLoading ? "Building..." : "Build Resume"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
