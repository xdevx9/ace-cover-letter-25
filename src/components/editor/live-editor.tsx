
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X, Plus, Trash2 } from "lucide-react";
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
      // Auto-resize textarea
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(120, textarea.scrollHeight)}px`;
    }
  }, [editingSection]);

  const parseContentSections = (text: string) => {
    if (!text.trim()) return [];
    
    const sections: { id: string; title: string; content: string; fullContent: string; level: number }[] = [];
    const lines = text.split('\n');
    
    let currentSection = { id: '', title: '', content: '', fullContent: '', level: 0 };
    let sectionIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headerMatch) {
        // Save previous section if it exists
        if (currentSection.title) {
          sections.push({ ...currentSection });
        }
        
        // Start new section
        sectionIndex++;
        const level = headerMatch[1].length;
        const title = headerMatch[2];
        
        currentSection = {
          id: `section-${sectionIndex}`,
          title,
          content: '',
          fullContent: line,
          level
        };
      } else {
        if (line.trim() || currentSection.content) {
          currentSection.content += (currentSection.content ? '\n' : '') + line;
          currentSection.fullContent += '\n' + line;
        }
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
    newSections[sectionIndex].fullContent = editContent;
    
    // Reconstruct the full content
    const newContent = newSections.map(section => section.fullContent).join('\n\n');
    onContentChange(newContent);
    setEditingSection(null);
  };

  const handleDeleteSection = (sectionId: string) => {
    const filteredSections = sections.filter(s => s.id !== sectionId);
    const newContent = filteredSections.map(section => section.fullContent).join('\n\n');
    onContentChange(newContent);
  };

  const handleAddSection = () => {
    const newSection = '\n\n## New Section\n\nAdd your content here...';
    onContentChange(content + newSection);
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditContent("");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(120, textarea.scrollHeight)}px`;
  };

  const renderSection = (section: { id: string; title: string; content: string; fullContent: string; level: number }, index: number) => {
    const isEditing = editingSection === section.id;
    
    if (isEditing) {
      return (
        <div key={section.id} className="relative group border border-blue-300 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
          <div className="space-y-3">
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={handleTextareaChange}
              className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Edit section content..."
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSaveSection} className="bg-green-600 hover:bg-green-700">
                <Save className="h-3 w-3 mr-1" />
                Save Changes
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

    const HeaderTag = `h${Math.min(section.level + 1, 6)}` as keyof JSX.IntrinsicElements;
    const headerClasses = {
      1: "text-2xl font-bold text-gray-900 dark:text-white",
      2: "text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1",
      3: "text-lg font-medium text-gray-700 dark:text-gray-300"
    };

    return (
      <div key={section.id} className="relative group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
        <div className="prose prose-sm max-w-none">
          <HeaderTag className={`mb-3 ${headerClasses[section.level as keyof typeof headerClasses] || headerClasses[3]}`}>
            {section.title}
          </HeaderTag>
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {section.content.trim() || (
              <span className="text-gray-400 italic">No content yet...</span>
            )}
          </div>
        </div>
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
            onClick={() => handleEditSection(section.id)}
            title="Edit section"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          {sections.length > 1 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
              onClick={() => handleDeleteSection(section.id)}
              title="Delete section"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardContent className="flex-1 p-4 space-y-4 overflow-auto">
        {sections.length > 0 ? (
          <>
            {sections.map(renderSection)}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddSection}
                className="border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add New Section
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Edit3 className="h-12 w-12 mx-auto mb-2" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No content yet. Start writing your resume to see live editing options.
            </p>
            <Button
              variant="outline"
              onClick={handleAddSection}
              className="border-dashed border-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add First Section
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
