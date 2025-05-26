
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/gemini-ai";

interface TranslationDialogProps {
  currentContent: string;
  onApplyTranslation: (translatedContent: string) => void;
}

export function TranslationDialog({ currentContent, onApplyTranslation }: TranslationDialogProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "ru", name: "Russian" },
    { code: "nl", name: "Dutch" },
  ];

  const handleTranslate = async () => {
    if (!selectedLanguage) {
      toast({
        title: "Language Required",
        description: "Please select a target language.",
        variant: "destructive",
      });
      return;
    }

    if (!currentContent.trim()) {
      toast({
        title: "Content Required",
        description: "Please add content to translate.",
        variant: "destructive",
      });
      return;
    }

    const hasApiKey = !!localStorage.getItem('gemini-api-key');
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Gemini API key in the AI Tools section first.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      const languageName = languages.find(lang => lang.code === selectedLanguage)?.name || selectedLanguage;
      const translatedContent = await geminiService.translateContent(currentContent, languageName);
      
      onApplyTranslation(translatedContent);
      setIsOpen(false);
      
      toast({
        title: "Translation Complete!",
        description: `Your content has been translated to ${languageName}.`,
      });
    } catch (error: any) {
      toast({
        title: "Translation Failed",
        description: error.message || "Failed to translate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-1" />
          Translate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Translate Content</DialogTitle>
          <DialogDescription>
            Translate your resume or cover letter to another language using AI-powered translation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Target Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTranslate} disabled={isTranslating || !selectedLanguage}>
              {isTranslating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
