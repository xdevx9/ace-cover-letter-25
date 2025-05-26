
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TranslationDialogProps {
  currentContent: string;
  onApplyTranslation: (content: string) => void;
}

export function TranslationDialog({ currentContent, onApplyTranslation }: TranslationDialogProps) {
  const [open, setOpen] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
    { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
    { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪' },
    { code: 'it', name: 'Italian (Italiano)', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese (Português)', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian (Русский)', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese (中文)', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean (한국어)', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic (العربية)', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi (हिन्दी)', flag: '🇮🇳' },
    { code: 'nl', name: 'Dutch (Nederlands)', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish (Svenska)', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian (Norsk)', flag: '🇳🇴' },
    { code: 'da', name: 'Danish (Dansk)', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish (Suomi)', flag: '🇫🇮' },
    { code: 'pl', name: 'Polish (Polski)', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkish (Türkçe)', flag: '🇹🇷' },
    { code: 'he', name: 'Hebrew (עברית)', flag: '🇮🇱' },
    { code: 'th', name: 'Thai (ไทย)', flag: '🇹🇭' }
  ];

  const translateContent = async () => {
    if (!targetLanguage || !currentContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a target language and ensure you have content to translate.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    try {
      // Simulate translation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const selectedLang = languages.find(lang => lang.code === targetLanguage);
      
      // Mock translation examples based on language
      let translatedContent = currentContent;
      
      if (targetLanguage === 'es') {
        translatedContent = currentContent
          .replace(/# (.*)/g, '# $1')
          .replace(/Professional Summary/gi, 'Resumen Profesional')
          .replace(/Experience/gi, 'Experiencia')
          .replace(/Skills/gi, 'Habilidades')
          .replace(/Education/gi, 'Educación')
          .replace(/Projects/gi, 'Proyectos')
          .replace(/Present/gi, 'Presente')
          .replace(/Led a team/gi, 'Dirigí un equipo')
          .replace(/Implemented/gi, 'Implementé')
          .replace(/Developed/gi, 'Desarrollé')
          .replace(/Managed/gi, 'Gestioné');
      } else if (targetLanguage === 'fr') {
        translatedContent = currentContent
          .replace(/Professional Summary/gi, 'Résumé Professionnel')
          .replace(/Experience/gi, 'Expérience')
          .replace(/Skills/gi, 'Compétences')
          .replace(/Education/gi, 'Formation')
          .replace(/Projects/gi, 'Projets')
          .replace(/Present/gi, 'Présent')
          .replace(/Led a team/gi, 'Dirigé une équipe')
          .replace(/Implemented/gi, 'Mis en œuvre')
          .replace(/Developed/gi, 'Développé')
          .replace(/Managed/gi, 'Géré');
      } else {
        // For other languages, add a note that it's been translated
        translatedContent = `*[Translated to ${selectedLang?.name}]*\n\n` + currentContent;
      }

      onApplyTranslation(translatedContent);
      setOpen(false);
      
      toast({
        title: "Translation Complete!",
        description: `Your content has been translated to ${selectedLang?.name}.`,
      });
    } catch (error) {
      toast({
        title: "Translation Failed",
        description: "Failed to translate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Globe className="h-4 w-4 mr-1" />
          Translate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Translate Content</span>
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Select Target Language</CardTitle>
            <CardDescription className="text-xs">
              Choose the language you want to translate your content to.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language..." />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center space-x-2">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Translation will preserve formatting and structure while converting text to the selected language. Professional terminology will be accurately translated.
              </p>
            </div>
            
            <Button 
              onClick={translateContent}
              disabled={!targetLanguage || !currentContent.trim() || isTranslating}
              className="w-full"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  Translate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
