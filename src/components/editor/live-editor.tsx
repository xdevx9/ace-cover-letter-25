
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  className?: string;
}

export function LiveEditor({ content, onContentChange, className }: LiveEditorProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingSection && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editingSection]);

  const parseContentSections = (text: string) => {
    const sections: { id: string; title: string; content: string; fullContent: string }[] = [];
    const lines = text.split('\n');
    
    let currentSection = { id: '', title: '', content: '', fullContent: '' };
    let sectionIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
        // Save previous section if it exists
        if (currentSection.title) {
          sections.push({ ...currentSection });
        }
        
        // Start new section
        sectionIndex++;
        currentSection = {
          id: `section-${sectionIndex}`,
          title: line.replace(/^#+\s*/, ''),
          content: '',
          fullContent: line
        };
      } else {
        currentSection.content += line + '\n';
        currentSection.fullContent += '\n' + line;
      }
    }
    
    // Add the last section
    if (currentSection.title) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const sections = parseContentSections(content);

  const handleEditSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setEditContent(section.fullContent);
      setEditingSection(sectionId);
    }
  };

  const handleSaveSection = () => {
    if (!editingSection) return;
    
    const sectionIndex = sections.findIndex(s => s.id === editingSection);
    if (sectionIndex === -1) return;
    
    const newSections = [...sections];
    const lines = editContent.split('\n');
    const headerLine = lines[0];
    const bodyContent = lines.slice(1).join('\n');
    
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      title: headerLine.replace(/^#+\s*/, ''),
      content: bodyContent,
      fullContent: editContent
    };
    
    // Reconstruct the full content
    const newContent = newSections.map(section => section.fullContent).join('\n\n');
    onContentChange(newContent);
    setEditingSection(null);
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditContent("");
  };

  const renderSection = (section: { id: string; title: string; content: string; fullContent: string }) => {
    const isEditing = editingSection === section.id;
    
    if (isEditing) {
      return (
        <div key={section.id} className="relative group">
          <div className="space-y-2">
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border rounded-lg font-mono text-sm resize-vertical min-h-[120px]"
              placeholder="Edit section content..."
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveSection}>
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={section.id} className="relative group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">
            {section.title}
          </h2>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {section.content.trim()}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          onClick={() => handleEditSection(section.id)}
        >
          <Edit3 className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-6 space-y-6">
        {sections.length > 0 ? (
          sections.map(renderSection)
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>Start writing your resume content to see live editing options.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
