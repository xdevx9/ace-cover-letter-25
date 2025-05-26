
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Save, Sparkles, FileUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";
import { TemplatesDialog } from "@/components/templates-dialog";
import { ExportDialog } from "@/components/export-dialog";
import { UploadDialog } from "@/components/upload-dialog";

interface EditorHeaderProps {
  activeMode: 'resume' | 'cover-letter';
  onModeChange: (mode: 'resume' | 'cover-letter') => void;
  onSave: () => void;
  onToggleAITools: () => void;
  showAITools: boolean;
  onApplyTemplate: (content: string) => void;
  onFileUpload: (content: string, filename: string) => void;
  currentContent: string;
}

export function EditorHeader({
  activeMode,
  onModeChange,
  onSave,
  onToggleAITools,
  showAITools,
  onApplyTemplate,
  onFileUpload,
  currentContent
}: EditorHeaderProps) {
  const navigate = useNavigate();

  return (
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
            
            <Tabs value={activeMode} onValueChange={(value) => onModeChange(value as 'resume' | 'cover-letter')}>
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
              onApplyTemplate={onApplyTemplate}
              activeMode={activeMode}
            />
            <UploadDialog onFileUpload={onFileUpload} />
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <ExportDialog 
              content={currentContent}
              filename={activeMode === 'resume' ? 'resume' : 'cover-letter'}
            />
            <Button 
              variant="default" 
              size="sm" 
              onClick={onToggleAITools}
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
  );
}
