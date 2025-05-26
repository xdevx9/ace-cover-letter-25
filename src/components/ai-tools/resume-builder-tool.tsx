
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ResumeBuilderToolProps {
  onBuild: (userInfo: any) => void;
  isLoading: boolean;
  hasApiKey: boolean;
}

export function ResumeBuilderTool({ onBuild, isLoading, hasApiKey }: ResumeBuilderToolProps) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    jobTitle: "",
    industry: "",
    experience: "",
    skills: ""
  });

  const handleBuild = () => {
    onBuild(userInfo);
  };

  return (
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
        onClick={handleBuild}
        disabled={isLoading || !userInfo.name || !userInfo.jobTitle || !hasApiKey}
      >
        {isLoading ? "Building..." : "Build Resume with AI"}
      </Button>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        Generate a complete professional resume based on your information using AI.
      </div>
    </div>
  );
}
