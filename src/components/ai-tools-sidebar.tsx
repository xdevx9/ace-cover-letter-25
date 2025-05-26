
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/gemini-ai";
import { ApiKeyDialog } from "@/components/api-key-dialog";
import { AI_TOOLS, AIToolId } from "@/config/ai-tools";
import { ApiKeyNotification } from "@/components/ai-tools/api-key-notification";
import { ToolsNavigation } from "@/components/ai-tools/tools-navigation";
import { SmartEditorTool } from "@/components/ai-tools/smart-editor-tool";
import { JobAnalyzerTool } from "@/components/ai-tools/job-analyzer-tool";
import { ResumeBuilderTool } from "@/components/ai-tools/resume-builder-tool";
import { SimpleTool } from "@/components/ai-tools/simple-tool";

interface AIToolsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyContent: (content: string) => void;
  currentContent: string;
}

export function AIToolsSidebar({ isOpen, onClose, onApplyContent, currentContent }: AIToolsSidebarProps) {
  const [activeTab, setActiveTab] = useState<AIToolId>('smart-editor');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const hasApiKey = !!localStorage.getItem('gemini-api-key');

  const handleAIOperation = async (operation: string, data?: any) => {
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
          if (!data?.trim()) {
            toast({
              title: "Job Description Required",
              description: "Please paste a job description to analyze your resume match.",
              variant: "destructive",
            });
            return;
          }
          
          const results = await geminiService.analyzeJobMatch(currentContent, data);
          setAnalysisResults(results);
          toast({
            title: "Analysis Complete!",
            description: `Match score: ${results.matchScore}% - Check detailed results below.`,
          });
          break;

        case 'build':
          if (!data?.name || !data?.jobTitle) {
            toast({
              title: "Missing Information",
              description: "Please fill in at least your name and target job title.",
              variant: "destructive",
            });
            return;
          }

          enhancedContent = await geminiService.buildResume(data);
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

  const renderToolContent = () => {
    switch (activeTab) {
      case 'smart-editor':
        return (
          <SmartEditorTool
            onEnhance={() => handleAIOperation('enhance')}
            isLoading={isLoading}
            hasContent={!!currentContent.trim()}
            hasApiKey={hasApiKey}
          />
        );

      case 'job-analyzer':
        return (
          <JobAnalyzerTool
            onAnalyze={(jobDescription) => handleAIOperation('analyze', jobDescription)}
            isLoading={isLoading}
            hasContent={!!currentContent.trim()}
            hasApiKey={hasApiKey}
            analysisResults={analysisResults}
          />
        );

      case 'content-enhancer':
        return (
          <SimpleTool
            title="AI Enhancement"
            description="Transform weak language into powerful, impact-driven statements with AI assistance."
            actionLabel="Enhance Writing"
            loadingLabel="Enhancing..."
            features={["Stronger action words", "Quantified achievements", "Professional language"]}
            featureColor="bg-green-50 dark:bg-green-900/20"
            onAction={() => handleAIOperation('enhance')}
            isLoading={isLoading}
            hasContent={!!currentContent.trim()}
            hasApiKey={hasApiKey}
          />
        );

      case 'ats-optimizer':
        return (
          <SimpleTool
            title="ATS Optimization"
            description="AI-powered optimization for Applicant Tracking Systems to improve visibility."
            actionLabel="Optimize for ATS"
            loadingLabel="Optimizing..."
            features={["Keyword enhancement", "Standard formatting", "Section optimization"]}
            featureColor="bg-blue-50 dark:bg-blue-900/20"
            onAction={() => handleAIOperation('ats-optimize')}
            isLoading={isLoading}
            hasContent={!!currentContent.trim()}
            hasApiKey={hasApiKey}
          />
        );

      case 'structure-optimizer':
        return (
          <SimpleTool
            title="Structure Optimization"
            description="AI-powered reorganization for optimal section order and maximum recruiter impact."
            actionLabel="Optimize Structure"
            loadingLabel="Optimizing..."
            features={["Optimal section order", "Improved flow", "Professional layout"]}
            featureColor="bg-purple-50 dark:bg-purple-900/20"
            onAction={() => handleAIOperation('restructure')}
            isLoading={isLoading}
            hasContent={!!currentContent.trim()}
            hasApiKey={hasApiKey}
          />
        );

      case 'resume-builder':
        return (
          <ResumeBuilderTool
            onBuild={(userInfo) => handleAIOperation('build', userInfo)}
            isLoading={isLoading}
            hasApiKey={hasApiKey}
          />
        );

      default:
        return null;
    }
  };

  const activeTool = AI_TOOLS.find(t => t.id === activeTab);

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
          <ApiKeyNotification onApiKeySet={() => window.location.reload()} />
        )}

        <ToolsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {hasApiKey && (
          <div className="mb-4">
            <ApiKeyDialog onApiKeySet={() => {}} />
          </div>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              {activeTool && <activeTool.icon className="h-4 w-4" />}
              <span>{activeTool?.label}</span>
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {activeTool?.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {renderToolContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
