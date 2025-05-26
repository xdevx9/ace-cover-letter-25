
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, RotateCcw, Plus, Image, Edit, Eye } from "lucide-react";
import { TranslationDialog } from "@/components/translation-dialog";
import { ProfilePhotoUpload } from "@/components/editor/profile-photo-upload";
import { DynamicFieldsManager } from "@/components/editor/dynamic-fields-manager";
import { LiveEditor } from "@/components/editor/live-editor";
import { useState } from "react";

interface EditorPanelProps {
  activeMode: 'resume' | 'cover-letter';
  resumeContent: string;
  coverLetterContent: string;
  onResumeChange: (content: string) => void;
  onCoverLetterChange: (content: string) => void;
  onApplyTranslation: (content: string) => void;
  isMobile?: boolean;
}

export function EditorPanel({
  activeMode,
  resumeContent,
  coverLetterContent,
  onResumeChange,
  onCoverLetterChange,
  onApplyTranslation,
  isMobile = false
}: EditorPanelProps) {
  const [editorMode, setEditorMode] = useState<'markdown' | 'live'>('markdown');
  const currentContent = activeMode === 'resume' ? resumeContent : coverLetterContent;
  const handleContentChange = activeMode === 'resume' ? onResumeChange : onCoverLetterChange;

  const handleProfilePhotoUpload = (photoData: string) => {
    const photoSection = `\n\n![Profile Photo](${photoData})\n\n`;
    const contentWithPhoto = photoSection + currentContent;
    handleContentChange(contentWithPhoto);
  };

  const handleAddField = (fieldType: string) => {
    let newField = '';
    switch (fieldType) {
      case 'experience':
        newField = '\n\n## Experience\n\n**Job Title** - Company Name\n*Date Range*\n\n• Achievement or responsibility\n• Another achievement\n';
        break;
      case 'education':
        newField = '\n\n## Education\n\n**Degree** - Institution Name\n*Date Range*\n\n• Relevant coursework or achievement\n';
        break;
      case 'skills':
        newField = '\n\n## Skills\n\n• Technical Skills: List your technical skills\n• Soft Skills: List your soft skills\n';
        break;
      case 'projects':
        newField = '\n\n## Projects\n\n**Project Name**\n*Technologies Used*\n\n• Project description and achievements\n';
        break;
      default:
        newField = '\n\n## New Section\n\nYour content here...\n';
    }
    handleContentChange(currentContent + newField);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`pb-3 border-b ${isMobile ? 'p-3' : ''}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span>Editor</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {editorMode === 'live' ? 'Live Edit' : 'Markdown'}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex border rounded-lg p-1">
              <Button
                variant={editorMode === 'markdown' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setEditorMode('markdown')}
                className="h-7 px-2"
              >
                <Edit className="h-3 w-3 mr-1" />
                <span className="text-xs">Code</span>
              </Button>
              <Button
                variant={editorMode === 'live' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setEditorMode('live')}
                className="h-7 px-2"
              >
                <Eye className="h-3 w-3 mr-1" />
                <span className="text-xs">Live</span>
              </Button>
            </div>
            {activeMode === 'resume' && (
              <ProfilePhotoUpload onPhotoUpload={handleProfilePhotoUpload} />
            )}
            <TranslationDialog 
              currentContent={currentContent}
              onApplyTranslation={onApplyTranslation}
            />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3">
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-1">Reset</span>
            </Button>
          </div>
        </div>
        
        <DynamicFieldsManager 
          onAddField={handleAddField}
          isMobile={isMobile}
        />
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Tabs value={activeMode} className="h-full flex flex-col">
          <TabsContent value="resume" className="flex-1 m-0">
            {editorMode === 'markdown' ? (
              <Textarea
                value={resumeContent}
                onChange={(e) => onResumeChange(e.target.value)}
                placeholder="Write your resume in Markdown..."
                className={`
                  h-full resize-none border-0 rounded-none focus-visible:ring-0
                  ${isMobile ? 'text-sm font-mono p-3' : 'font-mono text-sm p-4'}
                `}
              />
            ) : (
              <LiveEditor
                content={resumeContent}
                onContentChange={onResumeChange}
                className="h-full border-0 rounded-none"
              />
            )}
          </TabsContent>
          <TabsContent value="cover-letter" className="flex-1 m-0">
            {editorMode === 'markdown' ? (
              <Textarea
                value={coverLetterContent}
                onChange={(e) => onCoverLetterChange(e.target.value)}
                placeholder="Write your cover letter in Markdown..."
                className={`
                  h-full resize-none border-0 rounded-none focus-visible:ring-0
                  ${isMobile ? 'text-sm font-mono p-3' : 'font-mono text-sm p-4'}
                `}
              />
            ) : (
              <LiveEditor
                content={coverLetterContent}
                onContentChange={onCoverLetterChange}
                className="h-full border-0 rounded-none"
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
