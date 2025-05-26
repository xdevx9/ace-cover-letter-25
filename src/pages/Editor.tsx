
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

const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [resumeContent, setResumeContent] = useState("");
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [activeMode, setActiveMode] = useState<'resume' | 'cover-letter'>('resume');
  const [showAITools, setShowAITools] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

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

  const handleExport = (format: 'html' | 'pdf' | 'txt') => {
    const content = activeMode === 'resume' ? resumeContent : coverLetterContent;
    const filename = activeMode === 'resume' ? 'resume' : 'cover-letter';
    
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    toast({
      title: "Export Started",
      description: `Exporting ${activeMode} as ${format.toUpperCase()}...`,
    });
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (activeMode === 'resume') {
            setResumeContent(content);
          } else {
            setCoverLetterContent(content);
          }
          toast({
            title: "File Uploaded",
            description: `${file.name} has been loaded into the editor.`,
          });
        };
        reader.readAsText(file);
      }
    };
    input.click();
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
              <Button variant="outline" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
                Templates
              </Button>
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('txt')}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
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
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4 mr-1" />
                    Translate
                  </Button>
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
                  <Button variant="outline" size="sm">
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
