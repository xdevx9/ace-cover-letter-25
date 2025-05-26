
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { MarkdownPreview } from "@/components/markdown-preview";

interface PreviewPanelProps {
  content: string;
  onExportPDF: () => void;
}

export function PreviewPanel({ content, onExportPDF }: PreviewPanelProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-green-600" />
            <span>Live Preview</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Auto-save</Badge>
            <Button variant="outline" size="sm" onClick={onExportPDF}>
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <div className="h-full border-0 bg-white dark:bg-gray-950 overflow-auto">
          <MarkdownPreview 
            content={content}
            className="p-6 min-h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
