
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Eye, Download, Upload, Save, Sparkles, Globe, FileUp, RotateCcw } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MarkdownPreview } from "@/components/markdown-preview";
import { AIToolsSidebar } from "@/components/ai-tools-sidebar";
import { TemplatesDialog } from "@/components/templates-dialog";
import { TranslationDialog } from "@/components/translation-dialog";
import { ExportDialog } from "@/components/export-dialog";
import { UploadDialog } from "@/components/upload-dialog";

const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [resumeContent, setResumeContent] = useState("");
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [activeMode, setActiveMode] = useState<'resume' | 'cover-letter'>('resume');
  const [showAITools, setShowAITools] = useState(false);

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

  const getDefaultResumeTemplate = () => {
    return `# Your Name

**Professional Title** | your.email@example.com | (XXX) XXX-XXXX | City, State
**LinkedIn:** linkedin.com/in/yourname | **GitHub:** github.com/yourusername

---

## Professional Summary

A brief summary about yourself, your experience, and career goals. Keep it to 2-3 sentences and focus on your professional identity and value proposition.

---

## Experience

### Senior Position Title | Company Name | City, State
*Month Year - Present*

• Led a team of X people to accomplish Y, resulting in Z% improvement
• Implemented new process that increased efficiency by X%
• Collaborated with cross-functional teams to deliver project under budget

### Previous Position Title | Previous Company | City, State
*Month Year - Month Year*

• Achieved X by doing Y, which resulted in Z
• Managed project with $X budget and delivered on time
• Improved process efficiency by X% through implementation of Y

---

## Skills

**Programming Languages:** Language 1, Language 2, Language 3
**Frameworks & Tools:** Framework 1, Framework 2, Tool 1, Tool 2
**Soft Skills:** Communication, Leadership, Problem-solving, Teamwork

---

## Education

### Degree | University Name
*Graduation Year*

---

## Projects

### Project Name
• Brief description of the project and your role
• Technologies used and impact achieved
• **Tech Stack:** Technology 1, Technology 2, Technology 3`;
  };

  const getDefaultCoverLetterTemplate = () => {
    return `# Cover Letter

**Your Name**
your.email@example.com | (XXX) XXX-XXXX
Date: ${new Date().toLocaleDateString()}

---

**[Hiring Manager Name]**
**[Company Name]**
**[Company Address]**

Dear Hiring Manager,

I am writing to express my strong interest in the **[Position Title]** role at **[Company Name]**. With my background in [your field] and passion for [relevant area], I am excited about the opportunity to contribute to your team.

## Why I'm Interested

Your company's commitment to **[specific company value/mission]** resonates with my professional values. I am particularly drawn to **[specific aspect of the role/company]** and believe my experience in **[relevant skill/experience]** would be valuable to your team.

## What I Bring

In my current role, I have:

• [Specific achievement with metrics]
• [Leadership or collaboration example]
• [Technical or industry-specific accomplishment]
• [Process improvement or innovation example]

## Next Steps

I would welcome the opportunity to discuss how my skills and passion can contribute to **[Company Name]**'s continued success. Thank you for considering my application.

Sincerely,
Your Name

---

*This cover letter was created with ResumeAce*`;
  };

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
    
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>${filename}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 1rem;
            color: #000;
        }
        h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        h2 { font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        h3 { font-size: 1.1rem; margin-top: 1rem; margin-bottom: 0.5rem; }
        ul { margin: 0.5rem 0; }
        li { margin-bottom: 0.25rem; }
        hr { margin: 1rem 0; }
        @page { margin: 0.75in; }
    </style>
</head>
<body>
${convertMarkdownToHTML(content)}
</body>
</html>`;
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
    
    toast({
      title: "PDF Export",
      description: "Opening print dialog. Choose 'Save as PDF' from print options.",
    });
  };

  const convertMarkdownToHTML = (markdown: string): string => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><hr><\/p>/g, '<hr>')
      .replace(/<p><\/p>/g, '');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Professional Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="bg-blue-600 text-white p-1.5 rounded">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg">ResumeAce</span>
              </Button>
              
              <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as 'resume' | 'cover-letter')}>
                <TabsList className="bg-gray-100 dark:bg-gray-700">
                  <TabsTrigger value="resume" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Resume</span>
                  </TabsTrigger>
                  <TabsTrigger value="cover-letter" className="flex items-center space-x-2">
                    <FileUp className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <TemplatesDialog 
                onApplyTemplate={handleApplyTemplate}
                activeMode={activeMode}
              />
              <UploadDialog onFileUpload={handleUploadFile} />
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <ExportDialog 
                content={activeMode === 'resume' ? resumeContent : coverLetterContent}
                filename={activeMode === 'resume' ? 'resume' : 'cover-letter'}
              />
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setShowAITools(!showAITools)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI Tools
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className={`grid gap-6 transition-all duration-300 ${showAITools ? 'lg:grid-cols-[1fr,2fr] mr-96' : 'lg:grid-cols-2'} h-[calc(100vh-120px)]`}>
          {/* Editor Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Editor</span>
                  <Badge variant="outline" className="ml-2">
                    Markdown
                  </Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <TranslationDialog 
                    currentContent={activeMode === 'resume' ? resumeContent : coverLetterContent}
                    onApplyTranslation={handleTranslation}
                  />
                  <Button variant="ghost" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Tabs value={activeMode} className="h-full flex flex-col">
                <TabsContent value="resume" className="flex-1 m-0">
                  <Textarea
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    placeholder="Write your resume in Markdown..."
                    className="h-full resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0"
                  />
                </TabsContent>
                <TabsContent value="cover-letter" className="flex-1 m-0">
                  <Textarea
                    value={coverLetterContent}
                    onChange={(e) => setCoverLetterContent(e.target.value)}
                    placeholder="Write your cover letter in Markdown..."
                    className="h-full resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  <span>Live Preview</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Auto-save</Badge>
                  <Button variant="outline" size="sm" onClick={handleExportPDF}>
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full border-0 bg-white dark:bg-gray-950 overflow-auto">
                <MarkdownPreview 
                  content={activeMode === 'resume' ? resumeContent : coverLetterContent}
                  className="p-6 min-h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Tools Sidebar */}
      <AIToolsSidebar
        isOpen={showAITools}
        onClose={() => setShowAITools(false)}
        onApplyContent={applyAIContent}
        currentContent={activeMode === 'resume' ? resumeContent : coverLetterContent}
      />
    </div>
  );
};

export default Editor;
