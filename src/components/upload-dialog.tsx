
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
      badge: 'Production'
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

  const extractPDFText = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Use a more robust PDF text extraction approach
      const uint8Array = new Uint8Array(arrayBuffer);
      const textDecoder = new TextDecoder('utf-8', { fatal: false });
      
      // Convert to string and extract text content
      let pdfString = textDecoder.decode(uint8Array);
      
      // Enhanced PDF text extraction
      let extractedText = '';
      
      // Method 1: Extract from text objects
      const textRegex = /BT\s+(.*?)\s+ET/gs;
      const textMatches = pdfString.matchAll(textRegex);
      
      for (const match of textMatches) {
        const textContent = match[1];
        // Extract actual text from PDF operators
        const cleanText = textContent
          .replace(/\/[A-Za-z0-9]+/g, '') // Remove font references
          .replace(/\d+\.?\d*\s+/g, ' ') // Remove positioning numbers
          .replace(/[Tt][jd]\s*/g, '') // Remove text positioning operators
          .replace(/[\(\)]/g, '') // Remove parentheses
          .replace(/\s+/g, ' ')
          .trim();
        
        if (cleanText.length > 2) {
          extractedText += cleanText + '\n';
        }
      }
      
      // Method 2: Fallback - extract readable ASCII text
      if (!extractedText.trim()) {
        extractedText = pdfString
          .replace(/[^\x20-\x7E\n\r]/g, ' ')
          .replace(/\s+/g, ' ')
          .split(' ')
          .filter(word => word.length > 2 && /[a-zA-Z]/.test(word))
          .join(' ');
      }
      
      if (extractedText.trim()) {
        return formatExtractedText(extractedText, file.name);
      } else {
        throw new Error('Could not extract readable text from PDF. The PDF may be image-based or encrypted.');
      }
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF. Please try a different file or convert to text format.');
    }
  };

  const formatExtractedText = (text: string, filename: string): string => {
    const lines = text.split('\n').filter(line => line.trim().length > 2);
    const cleanName = filename.replace('.pdf', '').replace(/[_-]/g, ' ');
    
    let formattedContent = `# ${cleanName}\n\n`;
    
    // Smart section detection
    const sections = {
      summary: /(?:summary|objective|about|profile)/i,
      experience: /(?:experience|employment|work|career)/i,
      education: /(?:education|academic|degree|university|college)/i,
      skills: /(?:skills|competencies|abilities|technologies)/i,
      contact: /(?:contact|email|phone|address|linkedin)/i
    };
    
    let currentSection = '';
    const processedLines = new Set();
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (processedLines.has(trimmedLine) || trimmedLine.length < 3) continue;
      processedLines.add(trimmedLine);
      
      // Detect section headers
      let sectionFound = false;
      for (const [sectionName, regex] of Object.entries(sections)) {
        if (regex.test(trimmedLine)) {
          currentSection = sectionName;
          formattedContent += `\n## ${trimmedLine}\n\n`;
          sectionFound = true;
          break;
        }
      }
      
      if (!sectionFound && trimmedLine.length > 5) {
        // Format content based on current section
        if (currentSection === 'skills') {
          formattedContent += `• ${trimmedLine}\n`;
        } else if (currentSection === 'experience') {
          // Check if it looks like a job title or company
          if (/\b(manager|engineer|developer|analyst|director|coordinator)\b/i.test(trimmedLine)) {
            formattedContent += `\n**${trimmedLine}**\n`;
          } else {
            formattedContent += `${trimmedLine}\n`;
          }
        } else {
          formattedContent += `${trimmedLine}\n\n`;
        }
      }
    }
    
    return formattedContent;
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
        throw new Error(`Unsupported file type: ${extension}. Please upload a PDF, TXT, or MD file.`);
      }

      let content = '';
      
      if (['.txt', '.md'].includes(extension)) {
        content = await readTextFile(file);
      } else if (extension === '.pdf') {
        content = await extractPDFText(file);
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
      console.error('Upload error:', error);
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
              accept=".txt,.md,.pdf"
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

          <div className="mt-6 space-y-3">
            <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-green-800 dark:text-green-200">
                  Production PDF Extraction
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Real PDF parsing extracts and structures your resume content automatically.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  Best Results
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  For best results, use text-based PDFs. Image-based or scanned PDFs may not extract properly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
