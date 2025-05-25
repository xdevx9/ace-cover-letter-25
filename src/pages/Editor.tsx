
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Download, Zap, Layout } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { MarkdownPreview } from "@/components/markdown-preview";

const Editor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [resumeContent, setResumeContent] = useState("");
  const [coverLetterContent, setCoverLetterContent] = useState("");
  const [activeMode, setActiveMode] = useState<'resume' | 'cover-letter'>('resume');

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
      // Set default resume template
      setResumeContent(getDefaultResumeTemplate());
    }
    
    if (savedCoverLetter) {
      setCoverLetterContent(savedCoverLetter);
    } else {
      // Set default cover letter template
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
    return `# John Doe

**Software Engineer** | john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

---

## Professional Summary

Experienced software engineer with 5+ years developing scalable web applications. Passionate about creating efficient, maintainable code and delivering exceptional user experiences.

---

## Technical Skills

**Programming Languages:** JavaScript, TypeScript, Python, Java
**Frontend:** React, Vue.js, HTML5, CSS3, Tailwind CSS
**Backend:** Node.js, Express, Django, REST APIs
**Databases:** PostgreSQL, MongoDB, Redis
**Tools:** Git, Docker, AWS, Jest, Webpack

---

## Professional Experience

### Senior Software Engineer | TechCorp Inc.
*January 2022 - Present*

- Led development of customer-facing web applications serving 100k+ users
- Improved application performance by 40% through code optimization
- Mentored junior developers and conducted code reviews
- Collaborated with cross-functional teams to deliver features on schedule

### Software Engineer | StartupXYZ
*June 2019 - December 2021*

- Built responsive web applications using React and Node.js
- Implemented automated testing, reducing bugs by 30%
- Designed and developed RESTful APIs
- Participated in agile development processes

---

## Education

### Bachelor of Science in Computer Science
**University of Technology** | 2015 - 2019
*Cum Laude, GPA: 3.7/4.0*

---

## Projects

### E-commerce Platform
- Built full-stack e-commerce application with React and Node.js
- Implemented payment processing and inventory management
- **Tech Stack:** React, Node.js, PostgreSQL, Stripe API

### Task Management App
- Developed productivity application with real-time collaboration
- Implemented WebSocket connections for live updates
- **Tech Stack:** Vue.js, Express, MongoDB, Socket.io`;
  };

  const getDefaultCoverLetterTemplate = () => {
    return `# Cover Letter

**John Doe**
john.doe@email.com | (555) 123-4567
Date: ${new Date().toLocaleDateString()}

---

**[Hiring Manager Name]**
**[Company Name]**
**[Company Address]**

Dear Hiring Manager,

I am writing to express my strong interest in the **[Position Title]** role at **[Company Name]**. With my background in software engineering and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

## Why I'm Interested

Your company's commitment to **[specific company value/mission]** resonates with my professional values. I am particularly drawn to **[specific aspect of the role/company]** and believe my experience in **[relevant skill/experience]** would be valuable to your team.

## What I Bring

In my current role as a Senior Software Engineer, I have:

- Led development projects that improved performance by 40%
- Mentored junior developers and fostered collaborative team environments
- Delivered high-quality software solutions that serve thousands of users daily
- Worked with modern technologies including React, Node.js, and cloud platforms

## Next Steps

I would welcome the opportunity to discuss how my technical skills and passion for innovation can contribute to **[Company Name]**'s continued success. Thank you for considering my application.

Sincerely,
John Doe

---

*This cover letter was created with ResumeAce - AI-powered resume and cover letter builder*`;
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <div className="bg-blue-600 text-white p-1.5 rounded">
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-bold">ResumeAce</span>
            </Button>
            <Badge variant="secondary">
              {activeMode === 'resume' ? 'Resume Editor' : 'Cover Letter Editor'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('txt')}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Editor Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Editor</span>
                </CardTitle>
                <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as 'resume' | 'cover-letter')}>
                  <TabsList className="grid w-fit grid-cols-2">
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-3">
              <Tabs value={activeMode}>
                <TabsContent value="resume" className="h-full mt-0">
                  <Textarea
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    placeholder="Write your resume in Markdown..."
                    className="h-full resize-none font-mono text-sm"
                  />
                </TabsContent>
                <TabsContent value="cover-letter" className="h-full mt-0">
                  <Textarea
                    value={coverLetterContent}
                    onChange={(e) => setCoverLetterContent(e.target.value)}
                    placeholder="Write your cover letter in Markdown..."
                    className="h-full resize-none font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Live Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-3">
              <div className="h-full border rounded-lg bg-white dark:bg-gray-950 overflow-auto">
                <MarkdownPreview 
                  content={activeMode === 'resume' ? resumeContent : coverLetterContent}
                  className="p-6"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Panel */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>AI Tools</span>
              <Badge className="ml-2">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" disabled className="h-20 flex flex-col space-y-2">
                <Zap className="h-5 w-5" />
                <span>AI Enhancer</span>
              </Button>
              <Button variant="outline" disabled className="h-20 flex flex-col space-y-2">
                <FileText className="h-5 w-5" />
                <span>Template Library</span>
              </Button>
              <Button variant="outline" disabled className="h-20 flex flex-col space-y-2">
                <Eye className="h-5 w-5" />
                <span>ATS Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Editor;
