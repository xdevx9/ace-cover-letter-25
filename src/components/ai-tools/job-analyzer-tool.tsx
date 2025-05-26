
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface JobAnalyzerToolProps {
  onAnalyze: (jobDescription: string) => void;
  isLoading: boolean;
  hasContent: boolean;
  hasApiKey: boolean;
  analysisResults: any;
}

export function JobAnalyzerTool({ 
  onAnalyze, 
  isLoading, 
  hasContent, 
  hasApiKey, 
  analysisResults 
}: JobAnalyzerToolProps) {
  const [jobDescription, setJobDescription] = useState("");

  const handleAnalyze = () => {
    onAnalyze(jobDescription);
  };

  return (
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
        onClick={handleAnalyze}
        disabled={isLoading || !jobDescription.trim() || !hasContent || !hasApiKey}
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
  );
}
