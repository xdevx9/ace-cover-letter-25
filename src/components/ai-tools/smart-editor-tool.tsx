
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface SmartEditorToolProps {
  onEnhance: () => void;
  isLoading: boolean;
  hasContent: boolean;
  hasApiKey: boolean;
}

export function SmartEditorTool({ onEnhance, isLoading, hasContent, hasApiKey }: SmartEditorToolProps) {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full" 
        onClick={onEnhance}
        disabled={isLoading || !hasContent || !hasApiKey}
      >
        {isLoading ? "Enhancing..." : "Enhance Content"}
      </Button>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        AI will improve your resume with stronger action words, better formatting, and professional language.
      </div>
      {!hasContent && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center space-x-1">
          <AlertCircle className="h-3 w-3" />
          <span>Add content to your resume first</span>
        </div>
      )}
    </div>
  );
}
