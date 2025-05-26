
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus, Trash2, Edit3, Bold, Italic, List, Image, Save } from "lucide-react";
import { MarkdownPreview } from "@/components/markdown-preview";
import { ProfilePhotoUpload } from "@/components/editor/profile-photo-upload";
import { DynamicFieldsManager } from "@/components/editor/dynamic-fields-manager";
import { useToast } from "@/hooks/use-toast";

interface VisualEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  activeMode: 'resume' | 'cover-letter';
  isMobile?: boolean;
  onSave: () => void;
}

interface EditableSection {
  id: string;
  type: 'text' | 'heading' | 'list' | 'image';
  content: string;
  level?: number;
}

export function VisualEditor({ 
  content, 
  onContentChange, 
  activeMode, 
  isMobile = false,
  onSave 
}: VisualEditorProps) {
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sections, setSections] = useState<EditableSection[]>([]);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  // Parse markdown content into editable sections
  useEffect(() => {
    const parseContent = () => {
      const lines = content.split('\n');
      const newSections: EditableSection[] = [];
      let currentSection = '';
      let sectionType: 'text' | 'heading' | 'list' | 'image' = 'text';
      let headingLevel = 1;

      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('# ')) {
          if (currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
          }
          currentSection = trimmedLine.substring(2);
          sectionType = 'heading';
          headingLevel = 1;
        } else if (trimmedLine.startsWith('## ')) {
          if (currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
          }
          currentSection = trimmedLine.substring(3);
          sectionType = 'heading';
          headingLevel = 2;
        } else if (trimmedLine.startsWith('### ')) {
          if (currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
          }
          currentSection = trimmedLine.substring(4);
          sectionType = 'heading';
          headingLevel = 3;
        } else if (trimmedLine.startsWith('![') && trimmedLine.includes('](')) {
          if (currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
          }
          currentSection = trimmedLine;
          sectionType = 'image';
        } else if (trimmedLine.startsWith('• ') || trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
          if (sectionType !== 'list' && currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
            currentSection = '';
          }
          currentSection += (currentSection ? '\n' : '') + trimmedLine;
          sectionType = 'list';
        } else if (trimmedLine) {
          if (sectionType !== 'text' && currentSection.trim()) {
            newSections.push({
              id: `section-${newSections.length}`,
              type: sectionType,
              content: currentSection.trim(),
              level: headingLevel
            });
            currentSection = '';
          }
          currentSection += (currentSection ? '\n' : '') + trimmedLine;
          sectionType = 'text';
        } else if (currentSection.trim()) {
          newSections.push({
            id: `section-${newSections.length}`,
            type: sectionType,
            content: currentSection.trim(),
            level: headingLevel
          });
          currentSection = '';
          sectionType = 'text';
        }
      });

      if (currentSection.trim()) {
        newSections.push({
          id: `section-${newSections.length}`,
          type: sectionType,
          content: currentSection.trim(),
          level: headingLevel
        });
      }

      setSections(newSections);
    };

    parseContent();
  }, [content]);

  // Convert sections back to markdown
  const sectionsToMarkdown = (updatedSections: EditableSection[]) => {
    return updatedSections.map(section => {
      switch (section.type) {
        case 'heading':
          const prefix = '#'.repeat(section.level || 1);
          return `${prefix} ${section.content}`;
        case 'list':
          return section.content;
        case 'image':
          return section.content;
        case 'text':
        default:
          return section.content;
      }
    }).join('\n\n');
  };

  const handleSectionEdit = (sectionId: string) => {
    setEditingSection(sectionId);
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }, 50);
  };

  const handleSectionSave = (sectionId: string, newContent: string) => {
    const updatedSections = sections.map(section => 
      section.id === sectionId 
        ? { ...section, content: newContent }
        : section
    );
    setSections(updatedSections);
    onContentChange(sectionsToMarkdown(updatedSections));
    setEditingSection(null);
    
    toast({
      title: "Section Updated",
      description: "Your changes have been saved.",
    });
  };

  const handleSectionDelete = (sectionId: string) => {
    const updatedSections = sections.filter(section => section.id !== sectionId);
    setSections(updatedSections);
    onContentChange(sectionsToMarkdown(updatedSections));
    
    toast({
      title: "Section Deleted",
      description: "The section has been removed.",
    });
  };

  const handleAddSection = (type: 'heading' | 'text' | 'list') => {
    const newSection: EditableSection = {
      id: `section-${Date.now()}`,
      type,
      content: type === 'heading' ? 'New Section' : type === 'list' ? '• New item' : 'New content',
      level: type === 'heading' ? 2 : undefined
    };
    
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    onContentChange(sectionsToMarkdown(updatedSections));
    setEditingSection(newSection.id);
  };

  const handleProfilePhotoUpload = (photoData: string) => {
    const photoSection: EditableSection = {
      id: `photo-${Date.now()}`,
      type: 'image',
      content: `![Profile Photo](${photoData})`
    };
    
    const updatedSections = [photoSection, ...sections];
    setSections(updatedSections);
    onContentChange(sectionsToMarkdown(updatedSections));
  };

  const renderSection = (section: EditableSection) => {
    const isEditing = editingSection === section.id;

    if (isEditing) {
      return (
        <div className="relative group border-2 border-blue-500 rounded-lg p-4 bg-blue-50 dark:bg-blue-950">
          <textarea
            ref={editInputRef}
            defaultValue={section.content}
            className="w-full min-h-[100px] p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSectionSave(section.id, e.currentTarget.value);
              } else if (e.key === 'Escape') {
                setEditingSection(null);
              }
            }}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button
              size="sm"
              onClick={() => {
                const textarea = editInputRef.current;
                if (textarea) {
                  handleSectionSave(section.id, textarea.value);
                }
              }}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingSection(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="relative group border border-transparent hover:border-gray-300 dark:hover:border-gray-600 rounded-lg p-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => handleSectionEdit(section.id)}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              handleSectionEdit(section.id);
            }}
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              handleSectionDelete(section.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        
        <MarkdownPreview 
          content={sectionsToMarkdown([section])} 
          className="pointer-events-none"
        />
      </div>
    );
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className={`pb-3 border-b ${isMobile ? 'p-3' : ''}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <span>Visual Editor</span>
            <Badge variant="secondary" className="text-xs">Live Edit</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {activeMode === 'resume' && (
              <ProfilePhotoUpload onPhotoUpload={handleProfilePhotoUpload} />
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSave}
              className="h-8 px-2 sm:h-9 sm:px-3"
            >
              <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">Save</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSection('heading')}
            className="h-7 px-2 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Heading
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSection('text')}
            className="h-7 px-2 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAddSection('list')}
            className="h-7 px-2 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            List
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <div className={`
          h-full overflow-auto bg-white dark:bg-gray-950
          ${isMobile ? 'p-3' : 'p-6'}
        `}>
          {sections.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Start building your {activeMode} by adding sections above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id}>
                  {renderSection(section)}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
