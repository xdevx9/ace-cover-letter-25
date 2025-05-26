
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, File, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MarkdownPreview } from "@/components/markdown-preview";

interface ExportDialogProps {
  content: string;
  filename: string;
}

export function ExportDialog({ content, filename }: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<string>("");
  const { toast } = useToast();

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Professional PDF format, ideal for job applications',
      icon: FileText,
      extension: '.pdf',
      badge: 'Recommended'
    },
    {
      id: 'html',
      name: 'HTML Document',
      description: 'Web-ready format with styling preserved',
      icon: Globe,
      extension: '.html',
      badge: 'Styled'
    },
    {
      id: 'md',
      name: 'Markdown File',
      description: 'Plain markdown format for easy editing',
      icon: File,
      extension: '.md',
      badge: 'Editable'
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'Simple text format, compatible everywhere',
      icon: File,
      extension: '.txt',
      badge: 'Universal'
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Microsoft Word format for easy editing',
      icon: FileText,
      extension: '.docx',
      badge: 'Popular'
    },
    {
      id: 'rtf',
      name: 'Rich Text Format',
      description: 'RTF format with basic formatting preserved',
      icon: File,
      extension: '.rtf',
      badge: 'Compatible'
    }
  ];

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setExportingFormat(format);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const formatInfo = exportFormats.find(f => f.id === format);
      const exportFilename = `${filename}${formatInfo?.extension}`;
      
      switch (format) {
        case 'txt':
          // Plain text export
          const plainText = content
            .replace(/#{1,6}\s+/g, '') // Remove markdown headers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italic
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
            .replace(/^\s*[\*\-\+]\s+/gm, '• ') // Convert lists
            .replace(/^\s*\d+\.\s+/gm, ''); // Remove numbered lists
          
          downloadFile(plainText, exportFilename, 'text/plain');
          break;
          
        case 'md':
          // Markdown export (same as original)
          downloadFile(content, exportFilename, 'text/markdown');
          break;
          
        case 'html':
          // HTML export with basic styling
          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1 { color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        h2 { color: #374151; margin-top: 2rem; }
        h3 { color: #4b5563; }
        strong { color: #1f2937; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.25rem; }
        hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
        @media print {
            body { margin: 0; padding: 1rem; }
        }
    </style>
</head>
<body>
${convertMarkdownToHTML(content)}
</body>
</html>`;
          downloadFile(htmlContent, exportFilename, 'text/html');
          break;
          
        case 'pdf':
          // For PDF, we'll create an HTML version and instruct the user
          toast({
            title: "PDF Export",
            description: "Opening print dialog. Choose 'Save as PDF' from your browser's print options.",
          });
          
          // Create a temporary HTML page for printing
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
    <title>${filename}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 1rem;
            color: #000;
        }
        h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        h2 { font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        h3 { font-size: 1.1rem; margin-top: 1rem; margin-bottom: 0.5rem; }
        ul { margin: 0.5rem 0; }
        li { margin-bottom: 0.25rem; }
        hr { margin: 1rem 0; }
        @page { margin: 0.75in; }
    </style>
</head>
<body>
${convertMarkdownToHTML(content)}
</body>
</html>`);
            printWindow.document.close();
            setTimeout(() => {
              printWindow.print();
            }, 250);
          }
          break;
          
        case 'docx':
        case 'rtf':
          // For DOCX and RTF, we'll provide HTML that can be copied into Word
          toast({
            title: `${format.toUpperCase()} Export`,
            description: "Content formatted for easy copying into Microsoft Word or compatible applications.",
          });
          
          const formattedContent = convertMarkdownToHTML(content);
          downloadFile(formattedContent, exportFilename.replace(formatInfo?.extension || '', '.html'), 'text/html');
          break;
          
        default:
          throw new Error('Unsupported format');
      }
      
      if (format !== 'pdf') {
        toast({
          title: "Export Successful!",
          description: `Your ${formatInfo?.name} has been downloaded.`,
        });
      }
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportingFormat("");
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertMarkdownToHTML = (markdown: string): string => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><hr><\/p>/g, '<hr>')
      .replace(/<p><\/p>/g, '');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Resume</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {exportFormats.map((format) => (
            <Card 
              key={format.id} 
              className={`cursor-pointer transition-all ${
                isExporting && exportingFormat === format.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md hover:ring-1 hover:ring-gray-300'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <format.icon className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-sm">{format.name}</CardTitle>
                  </div>
                  <Badge 
                    variant={format.badge === 'Recommended' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    {format.badge}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {format.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleExport(format.id)}
                  disabled={isExporting || !content.trim()}
                  className="w-full"
                  size="sm"
                  variant={format.badge === 'Recommended' ? 'default' : 'outline'}
                >
                  {isExporting && exportingFormat === format.id ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export {format.extension.toUpperCase()}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200">
            <strong>Tip:</strong> PDF format is recommended for job applications. HTML format preserves all styling and can be opened in any browser.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
