
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Sparkles, Search, Zap, Layout, PenTool, Target, CheckCircle, AlertCircle, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/gemini-ai";
import { ApiKeyDialog } from "@/components/api-key-dialog";

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
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    jobTitle: "",
    industry: "",
    experience: "",
    skills: ""
  });

  const hasApiKey = !!localStorage.getItem('gemini-api-key');

  const handleAIOperation = async (operation: string) => {
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key to use AI features.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let enhancedContent = currentContent;
      
      switch (operation) {
        case 'enhance':
          enhancedContent = await geminiService.enhanceContent(currentContent);
          onApplyContent(enhancedContent);
          toast({
            title: "Content Enhanced!",
            description: "Your resume has been improved with AI-powered enhancements.",
          });
          break;

        case 'ats-optimize':
          enhancedContent = await geminiService.optimizeForATS(currentContent);
          onApplyContent(enhancedContent);
          toast({
            title: "ATS Optimization Complete!",
            description: "Your resume is now optimized for applicant tracking systems.",
          });
          break;

        case 'restructure':
          enhancedContent = await geminiService.restructureContent(currentContent);
          onApplyContent(enhancedContent);
          toast({
            title: "Structure Optimized!",
            description: "Your resume sections have been reordered for maximum impact.",
          });
          break;

        case 'analyze':
          if (!jobDescription.trim()) {
            toast({
              title: "Job Description Required",
              description: "Please paste a job description to analyze your resume match.",
              variant: "destructive",
            });
            return;
          }
          
          const results = await geminiService.analyzeJobMatch(currentContent, jobDescription);
          setAnalysisResults(results);
          toast({
            title: "Analysis Complete!",
            description: `Match score: ${results.matchScore}% - Check detailed results below.`,
          });
          break;

        case 'build':
          if (!userInfo.name || !userInfo.jobTitle) {
            toast({
              title: "Missing Information",
              description: "Please fill in at least your name and target job title.",
              variant: "destructive",
            });
            return;
          }

          enhancedContent = await geminiService.buildResume(userInfo);
          onApplyContent(enhancedContent);
          toast({
            title: "Resume Built Successfully!",
            description: "Your professional resume has been generated with AI assistance.",
          });
          break;
      }
    } catch (error: any) {
      toast({
        title: "AI Error",
        description: error.message || "Failed to process AI request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const tools = [
    { id: 'smart-editor', icon: Sparkles, label: 'Smart Editor', description: 'AI-powered content enhancement' },
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
          {hasApiKey && <Badge variant="secondary" className="text-xs">Ready</Badge>}
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        {!hasApiKey && (
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-2 mb-2">
              <Key className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800 dark:text-orange-200">API Key Required</span>
            </div>
            <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
              Set your Gemini API key to unlock AI-powered features.
            </p>
            <ApiKeyDialog onApiKeySet={() => window.location.reload()} />
          </div>
        )}

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

        {hasApiKey && (
          <div className="mb-4">
            <ApiKeyDialog onApiKeySet={() => {}} />
          </div>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              {(() => {
                const activeTool = tools.find(t => t.id === activeTab);
                if (activeTool) {
                  const IconComponent = activeTool.icon;
                  return <IconComponent className="h-4 w-4" />;
                }
                return null;
              })()}
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
                  disabled={isLoading || !currentContent.trim() || !hasApiKey}
                >
                  {isLoading ? "Enhancing..." : "Enhance Content"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI will improve your resume with stronger action words, better formatting, and professional language.
                </div>
                {!currentContent.trim() && (
                  <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Add content to your resume first</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'job-analyzer' && (
              <div className="space-y-3">
                <Label htmlFor="job-desc" className="text-xs">Job Description</Label>
                <Textarea
                  id="job-desc"
                  placeholder="Paste the job description here to analyze your resume match..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="text-xs"
                  rows={4}
                />
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('analyze')}
                  disabled={isLoading || !jobDescription.trim() || !currentContent.trim() || !hasApiKey}
                >
                  {isLoading ? "Analyzing..." : "Analyze Match"}
                </Button>
                
                {analysisResults && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Match Score: {analysisResults.matchScore}%</span>
                    </div>
                    
                    {analysisResults.foundSkills?.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-green-700 dark:text-green-400">Found Skills:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {analysisResults.foundSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResults.missingSkills?.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-400">Missing Keywords:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {analysisResults.missingSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResults.improvements?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">Suggestions:</p>
                        <ul className="text-xs space-y-1">
                          {analysisResults.improvements.map((suggestion: string, index: number) => (
                            <li key={index} className="text-gray-600 dark:text-gray-400">• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content-enhancer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('enhance')}
                  disabled={isLoading || !currentContent.trim() || !hasApiKey}
                >
                  {isLoading ? "Enhancing..." : "Enhance Writing"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Transform weak language into powerful, impact-driven statements with AI assistance.
                </div>
                <div className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <p className="font-medium text-green-800 dark:text-green-400">AI Enhancement:</p>
                  <p className="text-green-700 dark:text-green-300">• Stronger action words</p>
                  <p className="text-green-700 dark:text-green-300">• Quantified achievements</p>
                  <p className="text-green-700 dark:text-green-300">• Professional language</p>
                </div>
              </div>
            )}

            {activeTab === 'ats-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('ats-optimize')}
                  disabled={isLoading || !currentContent.trim() || !hasApiKey}
                >
                  {isLoading ? "Optimizing..." : "Optimize for ATS"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI-powered optimization for Applicant Tracking Systems to improve visibility.
                </div>
                <div className="text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <p className="font-medium text-blue-800 dark:text-blue-400">ATS Optimization:</p>
                  <p className="text-blue-700 dark:text-blue-300">• Keyword enhancement</p>
                  <p className="text-blue-700 dark:text-blue-300">• Standard formatting</p>
                  <p className="text-blue-700 dark:text-blue-300">• Section optimization</p>
                </div>
              </div>
            )}

            {activeTab === 'structure-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('restructure')}
                  disabled={isLoading || !currentContent.trim() || !hasApiKey}
                >
                  {isLoading ? "Optimizing..." : "Optimize Structure"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI-powered reorganization for optimal section order and maximum recruiter impact.
                </div>
                <div className="text-xs bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="font-medium text-purple-800 dark:text-purple-400">Structure Optimization:</p>
                  <p className="text-purple-700 dark:text-purple-300">• Optimal section order</p>
                  <p className="text-purple-700 dark:text-purple-300">• Improved flow</p>
                  <p className="text-purple-700 dark:text-purple-300">• Professional layout</p>
                </div>
              </div>
            )}

            {activeTab === 'resume-builder' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-xs">Target Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Software Engineer"
                    value={userInfo.jobTitle}
                    onChange={(e) => setUserInfo({...userInfo, jobTitle: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-xs">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="Technology"
                    value={userInfo.industry}
                    onChange={(e) => setUserInfo({...userInfo, industry: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-xs">Years of Experience</Label>
                  <Input
                    id="experience"
                    placeholder="5"
                    value={userInfo.experience}
                    onChange={(e) => setUserInfo({...userInfo, experience: e.target.value})}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-xs">Key Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="JavaScript, React, Node.js, Python, SQL"
                    value={userInfo.skills}
                    onChange={(e) => setUserInfo({...userInfo, skills: e.target.value})}
                    className="text-xs"
                    rows={3}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('build')}
                  disabled={isLoading || !userInfo.name || !userInfo.jobTitle || !hasApiKey}
                >
                  {isLoading ? "Building..." : "Build Resume with AI"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Generate a complete professional resume based on your information using AI.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
