
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AIToolsSidebar } from "@/components/ai-tools-sidebar";
import { EditorHeader } from "@/components/editor/editor-header";
import { EditorPanel } from "@/components/editor/editor-panel";
import { PreviewPanel } from "@/components/editor/preview-panel";
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

  // Load content from localStorage
  useEffect(() => {
    const savedResume = localStorage.getItem('resumeace-resume-content');
    const savedCoverLetter = localStorage.getItem('resumeace-coverletter-content');
    
    if (savedResume) {
      setResumeContent(savedResume);
    } else {
      setResumeContent(getDefaultResumeTemplate());
    }
    
    if (savedCoverLetter) {
      setCoverLetterContent(savedCoverLetter);
    } else {
      setCoverLetterContent(getDefaultCoverLetterTemplate());
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeace-resume-content', resumeContent);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resumeContent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('resumeace-coverletter-content', coverLetterContent);
    }, 1000);
    return () => clearTimeout(timer);
  }, [coverLetterContent]);

  const handleUploadFile = (content: string, filename: string) => {
    if (activeMode === 'resume') {
      setResumeContent(content);
    } else {
      setCoverLetterContent(content);
    }
    toast({
      title: "File Uploaded",
      description: `${filename} has been imported and converted to markdown.`,
    });
  };

  const handleApplyTemplate = (content: string) => {
    if (activeMode === 'resume') {
      setResumeContent(content);
    } else {
      setCoverLetterContent(content);
    }
    toast({
      title: "Template Applied",
      description: `${activeMode === 'resume' ? 'Resume' : 'Cover letter'} template has been applied.`,
    });
  };

  const handleTranslation = (content: string) => {
    if (activeMode === 'resume') {
      setResumeContent(content);
    } else {
      setCoverLetterContent(content);
    }
  };

  const handleExportPDF = () => {
    const content = activeMode === 'resume' ? resumeContent : coverLetterContent;
    const filename = activeMode === 'resume' ? 'resume' : 'cover-letter';
    
    exportToPDF(content, filename);
    
    toast({
      title: "PDF Export",
      description: "Opening print dialog. Choose 'Save as PDF' from print options.",
    });
  };

  const handleSave = () => {
    localStorage.setItem(`resumeace-${activeMode}-content`, activeMode === 'resume' ? resumeContent : coverLetterContent);
    toast({
      title: "Saved",
      description: `Your ${activeMode} has been saved locally.`,
    });
  };

  const applyAIContent = (content: string) => {
    if (activeMode === 'resume') {
      setResumeContent(content);
    } else {
      setCoverLetterContent(content);
    }
  };

  const currentContent = activeMode === 'resume' ? resumeContent : coverLetterContent;

  return (
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
        {/* Mobile-first responsive layout */}
        <div className={`
          flex flex-col gap-4 transition-all duration-300
          ${isMobileView ? 'space-y-4' : ''}
          ${!isMobileView && showAITools ? 'lg:grid lg:grid-cols-[1fr,2fr] lg:mr-96' : ''}
          ${!isMobileView && !showAITools ? 'lg:grid lg:grid-cols-2' : ''}
          min-h-[calc(100vh-120px)]
        `}>
          <EditorPanel
            activeMode={activeMode}
            resumeContent={resumeContent}
            coverLetterContent={coverLetterContent}
            onResumeChange={setResumeContent}
            onCoverLetterChange={setCoverLetterContent}
            onApplyTranslation={handleTranslation}
            isMobile={isMobileView}
          />

          <PreviewPanel
            content={currentContent}
            onExportPDF={handleExportPDF}
            isMobile={isMobileView}
          />
        </div>
      </div>

      <AIToolsSidebar
        isOpen={showAITools}
        onClose={() => setShowAITools(false)}
        onApplyContent={applyAIContent}
        currentContent={currentContent}
      />
    </div>
  );
};

export default Editor;
