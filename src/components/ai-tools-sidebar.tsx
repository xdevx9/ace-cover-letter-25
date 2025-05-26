
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Sparkles, Search, Zap, Layout, PenTool, Target, CheckCircle, AlertCircle } from "lucide-react";
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
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    jobTitle: "",
    industry: "",
    experience: "",
    skills: ""
  });

  const enhanceContent = (content: string): string => {
    return content
      .replace(/• (.*)/g, (match, bullet) => {
        const enhanced = bullet
          .replace(/worked on/gi, "spearheaded")
          .replace(/helped/gi, "collaborated to")
          .replace(/did/gi, "executed")
          .replace(/made/gi, "developed")
          .replace(/good/gi, "exceptional")
          .replace(/increased/gi, "optimized and increased")
          .replace(/reduced/gi, "streamlined and reduced");
        return `• ${enhanced}`;
      })
      .replace(/Experience/g, "Professional Experience")
      .replace(/Skills/g, "Core Competencies")
      .replace(/(\d+)%/g, "$1% improvement")
      .replace(/team/gi, "cross-functional team");
  };

  const optimizeForATS = (content: string): string => {
    const atsKeywords = {
      'software': ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'API', 'Agile'],
      'marketing': ['SEO', 'SEM', 'Analytics', 'CRM', 'Lead Generation', 'Campaign Management'],
      'sales': ['CRM', 'Lead Generation', 'B2B Sales', 'Customer Acquisition', 'Revenue Growth'],
      'default': ['Leadership', 'Communication', 'Problem-solving', 'Project Management', 'Team Collaboration']
    };

    let optimized = content
      .replace(/##\s/g, '## ')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/- /g, '• ');

    // Add ATS-friendly formatting
    if (!content.includes('TECHNICAL SKILLS') && !content.includes('Technical Skills')) {
      optimized += '\n\n## TECHNICAL SKILLS\n\n• Microsoft Office Suite\n• Project Management\n• Data Analysis\n• Communication\n• Leadership';
    }

    return optimized;
  };

  const restructureContent = (content: string): string => {
    const sections = content.split('## ').filter(Boolean);
    const reorderedSections = [];
    
    // Optimal order for resume sections
    const sectionOrder = ['Professional Summary', 'Core Competencies', 'Technical Skills', 'Professional Experience', 'Experience', 'Education', 'Projects', 'Certifications'];
    
    sectionOrder.forEach(sectionName => {
      const section = sections.find(s => s.toLowerCase().includes(sectionName.toLowerCase()));
      if (section) reorderedSections.push('## ' + section);
    });
    
    // Add any remaining sections
    sections.forEach(section => {
      if (!reorderedSections.find(rs => rs.includes(section))) {
        reorderedSections.push('## ' + section);
      }
    });

    return reorderedSections.join('\n\n').replace(/##\s##/g, '##');
  };

  const analyzeJobMatch = (resume: string, jobDesc: string) => {
    const resumeWords = resume.toLowerCase().split(/\s+/);
    const jobWords = jobDesc.toLowerCase().split(/\s+/);
    
    const commonSkills = ['react', 'javascript', 'python', 'node.js', 'sql', 'git', 'api', 'agile', 'scrum', 'typescript'];
    const foundSkills = commonSkills.filter(skill => resumeWords.some(word => word.includes(skill)));
    const missingSkills = commonSkills.filter(skill => 
      jobWords.some(word => word.includes(skill)) && !resumeWords.some(word => word.includes(skill))
    );

    const matchScore = Math.round((foundSkills.length / (foundSkills.length + missingSkills.length)) * 100) || 75;

    return {
      matchScore,
      foundSkills,
      missingSkills: missingSkills.slice(0, 5),
      suggestions: [
        'Add more quantifiable achievements with specific metrics',
        'Include relevant industry keywords from the job description',
        'Highlight leadership and collaboration experiences',
        'Mention specific tools and technologies used'
      ]
    };
  };

  const handleAIOperation = async (operation: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let enhancedContent = currentContent;
      
      switch (operation) {
        case 'enhance':
          enhancedContent = enhanceContent(currentContent);
          onApplyContent(enhancedContent);
          toast({
            title: "Content Enhanced!",
            description: "Your resume has been improved with stronger action words and better formatting.",
          });
          break;

        case 'ats-optimize':
          enhancedContent = optimizeForATS(currentContent);
          onApplyContent(enhancedContent);
          toast({
            title: "ATS Optimization Complete!",
            description: "Your resume is now optimized for applicant tracking systems.",
          });
          break;

        case 'restructure':
          enhancedContent = restructureContent(currentContent);
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
          
          const results = analyzeJobMatch(currentContent, jobDescription);
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

          enhancedContent = `# ${userInfo.name}

**${userInfo.jobTitle}** | ${userInfo.name.toLowerCase().replace(' ', '.')}@email.com | (555) 123-4567
LinkedIn: linkedin.com/in/${userInfo.name.toLowerCase().replace(' ', '-')} | Location: City, State

---

## Professional Summary

Results-driven ${userInfo.jobTitle.toLowerCase()} with ${userInfo.experience || '5+'} years of experience in ${userInfo.industry || 'the industry'}. Proven track record of delivering innovative solutions and driving business growth. ${userInfo.skills ? `Expertise in ${userInfo.skills.split(',').slice(0, 3).join(', ')}.` : 'Strong technical and leadership skills.'}

---

## Core Competencies

**Technical Skills:** ${userInfo.skills || 'JavaScript, React, Node.js, Python, SQL, Git'}
**Leadership:** Team Management, Project Leadership, Strategic Planning, Mentoring
**Business:** Process Optimization, Cross-functional Collaboration, Stakeholder Management

---

## Professional Experience

### Senior ${userInfo.jobTitle} | Company Name | 2020 - Present
• Spearheaded development of enterprise-level applications serving 10,000+ users
• Collaborated with cross-functional teams to deliver projects 20% ahead of schedule
• Implemented best practices that improved code quality and reduced bugs by 35%
• Mentored junior developers and conducted technical interviews

### ${userInfo.jobTitle} | Previous Company | 2018 - 2020
• Developed and maintained scalable web applications using modern technologies
• Optimized database queries resulting in 40% performance improvement
• Participated in Agile development processes and code review sessions
• Contributed to technical documentation and knowledge sharing initiatives

---

## Education

### Bachelor's Degree in Computer Science | University Name | 2018
**Relevant Coursework:** Data Structures, Algorithms, Database Design, Software Engineering

---

## Projects

### E-commerce Platform
• Built full-stack web application with React frontend and Node.js backend
• Implemented secure payment processing and user authentication
• **Technologies:** React, Node.js, MongoDB, Stripe API

### Task Management System
• Developed collaborative project management tool for remote teams
• Integrated real-time notifications and file sharing capabilities
• **Technologies:** ${userInfo.skills?.split(',').slice(0, 4).join(', ') || 'React, Express, Socket.io, PostgreSQL'}`;

          onApplyContent(enhancedContent);
          toast({
            title: "Resume Built Successfully!",
            description: "Your professional resume has been generated and applied to the editor.",
          });
          break;
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
                  disabled={isLoading || !currentContent.trim()}
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
                  disabled={isLoading || !jobDescription.trim() || !currentContent.trim()}
                >
                  {isLoading ? "Analyzing..." : "Analyze Match"}
                </Button>
                
                {analysisResults && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Match Score: {analysisResults.matchScore}%</span>
                    </div>
                    
                    {analysisResults.foundSkills.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-green-700 dark:text-green-400">Found Skills:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {analysisResults.foundSkills.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResults.missingSkills.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-orange-700 dark:text-orange-400">Missing Keywords:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {analysisResults.missingSkills.map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">Suggestions:</p>
                      <ul className="text-xs space-y-1">
                        {analysisResults.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400">• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content-enhancer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('enhance')}
                  disabled={isLoading || !currentContent.trim()}
                >
                  {isLoading ? "Enhancing..." : "Enhance Writing"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Transform weak language into powerful, impact-driven statements that showcase your achievements.
                </div>
                <div className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <p className="font-medium text-green-800 dark:text-green-400">Enhancement Examples:</p>
                  <p className="text-green-700 dark:text-green-300">"worked on" → "spearheaded"</p>
                  <p className="text-green-700 dark:text-green-300">"helped" → "collaborated to"</p>
                </div>
              </div>
            )}

            {activeTab === 'ats-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('ats-optimize')}
                  disabled={isLoading || !currentContent.trim()}
                >
                  {isLoading ? "Optimizing..." : "Optimize for ATS"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Format your resume to pass through Applicant Tracking Systems and reach human recruiters.
                </div>
                <div className="text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <p className="font-medium text-blue-800 dark:text-blue-400">ATS Optimization:</p>
                  <p className="text-blue-700 dark:text-blue-300">• Standard formatting</p>
                  <p className="text-blue-700 dark:text-blue-300">• Keyword optimization</p>
                  <p className="text-blue-700 dark:text-blue-300">• Section standardization</p>
                </div>
              </div>
            )}

            {activeTab === 'structure-optimizer' && (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => handleAIOperation('restructure')}
                  disabled={isLoading || !currentContent.trim()}
                >
                  {isLoading ? "Optimizing..." : "Optimize Structure"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Reorganize your resume sections in the optimal order for maximum recruiter impact.
                </div>
                <div className="text-xs bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="font-medium text-purple-800 dark:text-purple-400">Optimal Order:</p>
                  <p className="text-purple-700 dark:text-purple-300">1. Summary → 2. Skills → 3. Experience → 4. Education</p>
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
                  disabled={isLoading || !userInfo.name || !userInfo.jobTitle}
                >
                  {isLoading ? "Building..." : "Build Resume"}
                </Button>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Generate a complete professional resume based on your information.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
