
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Maximize2 } from "lucide-react";
import { MarkdownPreview } from "@/components/markdown-preview";
import { useState } from "react";

interface PreviewPanelProps {
  content: string;
  onExportPDF: () => void;
  isMobile?: boolean;
}

export function PreviewPanel({ content, onExportPDF, isMobile = false }: PreviewPanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className={`
      flex flex-col
      ${isFullscreen && isMobile ? 'fixed inset-0 z-50 rounded-none' : ''}
    `}>
      <CardHeader className={`pb-3 border-b ${isMobile ? 'p-3' : ''}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <span>Live Preview</span>
          </CardTitle>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Badge variant="secondary" className="text-xs">Auto-save</Badge>
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleFullscreen}
                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
              >
                <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline ml-1">
                  {isFullscreen ? 'Exit' : 'Full'}
                </span>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExportPDF}
              className="h-8 px-2 sm:h-9 sm:px-3"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">PDF</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className={`
          h-full border-0 bg-white dark:bg-gray-950 overflow-auto
          ${isMobile ? 'min-h-[60vh]' : 'min-h-full'}
        `}>
          <MarkdownPreview 
            content={content}
            className={`
              min-h-full
              ${isMobile ? 'p-3 text-sm' : 'p-6'}
            `}
          />
        </div>
      </CardContent>
    </Card>
  );
}
