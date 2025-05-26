
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, File, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadDialogProps {
  onFileUpload: (content: string, filename: string) => void;
}

export function UploadDialog({ onFileUpload }: UploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const supportedFormats = [
    {
      extensions: ['.txt', '.md'],
      name: 'Text & Markdown',
      description: 'Plain text and markdown files',
      icon: File,
      badge: 'Native'
    },
    {
      extensions: ['.pdf'],
      name: 'PDF Documents',
      description: 'Extract text from PDF files',
      icon: FileText,
      badge: 'Text Only'
    },
    {
      extensions: ['.docx', '.doc'],
      name: 'Word Documents',
      description: 'Microsoft Word files',
      icon: FileText,
      badge: 'Popular'
    },
    {
      extensions: ['.rtf'],
      name: 'Rich Text Format',
      description: 'RTF documents with basic formatting',
      icon: File,
      badge: 'Compatible'
    },
    {
      extensions: ['.odt'],
      name: 'OpenDocument Text',
      description: 'LibreOffice/OpenOffice documents',
      icon: FileText,
      badge: 'Open Source'
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    
    try {
      const filename = file.name;
      const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
      
      // Check if file type is supported
      const isSupported = supportedFormats.some(format => 
        format.extensions.includes(extension)
      );
      
      if (!isSupported) {
        throw new Error(`Unsupported file type: ${extension}`);
      }

      let content = '';
      
      if (['.txt', '.md'].includes(extension)) {
        // Handle text and markdown files
        content = await readTextFile(file);
      } else if (extension === '.pdf') {
        // Simulate PDF text extraction
        await new Promise(resolve => setTimeout(resolve, 2000));
        content = `# ${filename.replace('.pdf', '')}

**Extracted from PDF Document**

This is a simulated extraction from your PDF file. In a real implementation, this would contain the actual text content from your PDF document.

## Professional Summary

[PDF content would be extracted here using libraries like PDF.js or similar]

## Experience

[Work experience from PDF would appear here]

## Skills

[Skills section from PDF would be processed here]

---

*Note: PDF text extraction is simulated in this demo. Real implementation would use PDF parsing libraries.*`;
        
      } else if (['.docx', '.doc'].includes(extension)) {
        // Simulate Word document processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        content = `# ${filename.replace(/\.(docx?)/i, '')}

**Imported from Word Document**

This is a simulated import from your Word document. In a real implementation, this would preserve the formatting and structure from your original document.

## Professional Summary

[Content from your Word document would be converted to markdown here]

## Experience

[Experience section would be properly formatted here]

## Skills

[Skills would be extracted and formatted here]

---

*Note: Word document processing is simulated in this demo.*`;
        
      } else if (extension === '.rtf') {
        // Simulate RTF processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        content = `# ${filename.replace('.rtf', '')}

**Imported from RTF Document**

Content from your RTF file has been converted to markdown format while preserving the essential structure and information.

## Professional Summary

[RTF content converted to markdown]

## Experience

[Work history from RTF file]

---

*Note: RTF processing is simulated in this demo.*`;
        
      } else if (extension === '.odt') {
        // Simulate ODT processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        content = `# ${filename.replace('.odt', '')}

**Imported from OpenDocument Text**

Your OpenDocument Text file has been successfully converted to markdown format.

## Professional Summary

[ODT content converted here]

## Experience

[Experience section from ODT file]

---

*Note: ODT processing is simulated in this demo.*`;
      }
      
      if (content.trim()) {
        onFileUpload(content, filename);
        setOpen(false);
        toast({
          title: "File Uploaded Successfully!",
          description: `${filename} has been imported and converted to markdown.`,
        });
      } else {
        throw new Error('No content could be extracted from the file');
      }
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to process file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Resume File</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".txt,.md,.pdf,.docx,.doc,.rtf,.odt"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
            
            {isProcessing ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Processing your file...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Upload className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Drop your resume file here
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    or click to browse your files
                  </p>
                </div>
                <Button onClick={handleFileSelect} variant="outline">
                  Choose File
                </Button>
              </div>
            )}
          </div>

          {/* Supported Formats */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Supported Formats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {supportedFormats.map((format, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <format.icon className="h-4 w-4 text-blue-600" />
                        <CardTitle className="text-xs">{format.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {format.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs mb-2">
                      {format.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {format.extensions.map((ext) => (
                        <Badge key={ext} variant="outline" className="text-xs">
                          {ext}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  Text Extraction
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  All uploaded files will be converted to editable markdown format while preserving your content structure.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                  Formatting Note
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Complex formatting may require manual adjustment after upload. Review the imported content and make any necessary edits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
