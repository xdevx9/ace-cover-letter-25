
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { MarkdownPreview } from "@/components/markdown-preview";

interface PreviewPanelProps {
  content: string;
  activeMode: 'resume' | 'cover-letter';
  isMobile?: boolean;
}

export function PreviewPanel({ content, activeMode, isMobile = false }: PreviewPanelProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`pb-3 border-b ${isMobile ? 'p-3' : ''}`}>
        <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <span>Preview</span>
          <Badge variant="secondary" className="text-xs">
            {activeMode === 'resume' ? 'Resume' : 'Cover Letter'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <div className={`
          h-full overflow-auto bg-white dark:bg-gray-950
          ${isMobile ? 'p-3' : 'p-6'}
        `}>
          <MarkdownPreview content={content} />
        </div>
      </CardContent>
    </Card>
  );
}
