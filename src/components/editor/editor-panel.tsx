
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, RotateCcw } from "lucide-react";
import { TranslationDialog } from "@/components/translation-dialog";

interface EditorPanelProps {
  activeMode: 'resume' | 'cover-letter';
  resumeContent: string;
  coverLetterContent: string;
  onResumeChange: (content: string) => void;
  onCoverLetterChange: (content: string) => void;
  onApplyTranslation: (content: string) => void;
}

export function EditorPanel({
  activeMode,
  resumeContent,
  coverLetterContent,
  onResumeChange,
  onCoverLetterChange,
  onApplyTranslation
}: EditorPanelProps) {
  const currentContent = activeMode === 'resume' ? resumeContent : coverLetterContent;

  return (
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
              currentContent={currentContent}
              onApplyTranslation={onApplyTranslation}
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
              onChange={(e) => onResumeChange(e.target.value)}
              placeholder="Write your resume in Markdown..."
              className="h-full resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0"
            />
          </TabsContent>
          <TabsContent value="cover-letter" className="flex-1 m-0">
            <Textarea
              value={coverLetterContent}
              onChange={(e) => onCoverLetterChange(e.target.value)}
              placeholder="Write your cover letter in Markdown..."
              className="h-full resize-none font-mono text-sm border-0 rounded-none focus-visible:ring-0"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
