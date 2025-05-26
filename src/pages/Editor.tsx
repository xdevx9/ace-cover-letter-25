import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AIToolsSidebar } from "@/components/ai-tools-sidebar";
import { EditorHeader } from "@/components/editor/editor-header";
import { EditorPanel } from "@/components/editor/editor-panel";
import { PreviewPanel } from "@/components/editor/preview-panel";
import { ErrorBoundary } from "@/components/error-boundary";
import { getDefaultResumeTemplate, getDefaultCoverLetterTemplate } from "@/utils/default-templates";
import { exportToPDF } from "@/utils/pdf-export";

const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [resumeContent, setResumeContent] = useState("");
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [activeMode, setActiveMode] = useState<'resume' | 'cover-letter'>('resume');
  const [showAITools, setShowAITools] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize mode from URL params
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'cover-letter') {
      setActiveMode('cover-letter');
    }
  }, [searchParams]);

  // Load content from localStorage with error handling
  useEffect(() => {
    try {
      const savedResume = localStorage.getItem('resumeace-resume-content');
      const savedCoverLetter = localStorage.getItem('resumeace-coverletter-content');
      
      setResumeContent(savedResume || getDefaultResumeTemplate());
      setCoverLetterContent(savedCoverLetter || getDefaultCoverLetterTemplate());
    } catch (error) {
      console.error('Error loading saved content:', error);
      setResumeContent(getDefaultResumeTemplate());
      setCoverLetterContent(getDefaultCoverLetterTemplate());
      toast({
        title: "Storage Error",
        description: "Could not load saved content. Starting with default template.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Auto-save functionality with error handling
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('resumeace-resume-content', resumeContent);
      } catch (error) {
        console.error('Error saving resume:', error);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [resumeContent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('resumeace-coverletter-content', coverLetterContent);
      } catch (error) {
        console.error('Error saving cover letter:', error);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [coverLetterContent]);

  const handleUploadFile = (content: string, filename: string) => {
    try {
      if (activeMode === 'resume') {
        setResumeContent(content);
      } else {
        setCoverLetterContent(content);
      }
      toast({
        title: "File Uploaded Successfully",
        description: `${filename} has been imported and converted to markdown.`,
      });
    } catch (error) {
      console.error('Error handling file upload:', error);
      toast({
        title: "Upload Error",
        description: "Failed to process uploaded file.",
        variant: "destructive"
      });
    }
  };

  const handleApplyTemplate = (content: string) => {
    try {
      if (activeMode === 'resume') {
        setResumeContent(content);
      } else {
        setCoverLetterContent(content);
      }
      toast({
        title: "Template Applied",
        description: `${activeMode === 'resume' ? 'Resume' : 'Cover letter'} template has been applied.`,
      });
    } catch (error) {
      console.error('Error applying template:', error);
      toast({
        title: "Template Error",
        description: "Failed to apply template.",
        variant: "destructive"
      });
    }
  };

  const handleTranslation = (content: string) => {
    try {
      if (activeMode === 'resume') {
        setResumeContent(content);
      } else {
        setCoverLetterContent(content);
      }
    } catch (error) {
      console.error('Error applying translation:', error);
      toast({
        title: "Translation Error",
        description: "Failed to apply translation.",
        variant: "destructive"
      });
    }
  };

  const handleExportPDF = () => {
    try {
      const content = activeMode === 'resume' ? resumeContent : coverLetterContent;
      const filename = activeMode === 'resume' ? 'resume' : 'cover-letter';
      
      exportToPDF(content, filename);
      
      toast({
        title: "PDF Export Started",
        description: "Opening print dialog. Choose 'Save as PDF' to download.",
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    try {
      const content = activeMode === 'resume' ? resumeContent : coverLetterContent;
      localStorage.setItem(`resumeace-${activeMode}-content`, content);
      toast({
        title: "Saved Successfully",
        description: `Your ${activeMode} has been saved locally.`,
      });
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: "Save Error",
        description: "Failed to save. Please try again.",
        variant: "destructive"
      });
    }
  };

  const applyAIContent = (content: string) => {
    try {
      if (activeMode === 'resume') {
        setResumeContent(content);
      } else {
        setCoverLetterContent(content);
      }
    } catch (error) {
      console.error('Error applying AI content:', error);
      toast({
        title: "AI Content Error",
        description: "Failed to apply AI-generated content.",
        variant: "destructive"
      });
    }
  };

  const currentContent = activeMode === 'resume' ? resumeContent : coverLetterContent;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <EditorHeader
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onSave={handleSave}
          onToggleAITools={() => setShowAITools(!showAITools)}
          showAITools={showAITools}
          onApplyTemplate={handleApplyTemplate}
          onFileUpload={handleUploadFile}
          currentContent={currentContent}
        />

        <div className="container mx-auto p-2 sm:p-4">
          <div className={`
            transition-all duration-300
            ${showAITools && !isMobileView ? 'mr-96' : ''}
            min-h-[calc(100vh-120px)]
          `}>
            <ErrorBoundary>
              <EditorPanel
                activeMode={activeMode}
                resumeContent={resumeContent}
                coverLetterContent={coverLetterContent}
                onResumeChange={setResumeContent}
                onCoverLetterChange={setCoverLetterContent}
                onApplyTranslation={handleTranslation}
                isMobile={isMobileView}
                onSave={handleSave}
              />
            </ErrorBoundary>
          </div>
        </div>

        <AIToolsSidebar
          isOpen={showAITools}
          onClose={() => setShowAITools(false)}
          onApplyContent={applyAIContent}
          currentContent={currentContent}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Editor;
