
import { VisualEditor } from "@/components/editor/visual-editor";

interface EditorPanelProps {
  activeMode: 'resume' | 'cover-letter';
  resumeContent: string;
  coverLetterContent: string;
  onResumeChange: (content: string) => void;
  onCoverLetterChange: (content: string) => void;
  onApplyTranslation: (content: string) => void;
  isMobile?: boolean;
  onSave: () => void;
}

export function EditorPanel({
  activeMode,
  resumeContent,
  coverLetterContent,
  onResumeChange,
  onCoverLetterChange,
  onApplyTranslation,
  isMobile = false,
  onSave
}: EditorPanelProps) {
  const currentContent = activeMode === 'resume' ? resumeContent : coverLetterContent;
  const handleContentChange = activeMode === 'resume' ? onResumeChange : onCoverLetterChange;

  return (
    <VisualEditor
      content={currentContent}
      onContentChange={handleContentChange}
      activeMode={activeMode}
      isMobile={isMobile}
      onSave={onSave}
    />
  );
}
