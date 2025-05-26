
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/gemini-ai";

interface ApiKeyDialogProps {
  onApiKeySet: () => void;
}

export function ApiKeyDialog({ onApiKeySet }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini-api-key') || '');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
      return;
    }

    geminiService.setApiKey(apiKey.trim());
    onApiKeySet();
    setIsOpen(false);
    
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved and AI features are now enabled.",
    });
  };

  const hasApiKey = !!localStorage.getItem('gemini-api-key');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={hasApiKey ? "outline" : "default"} 
          size="sm"
          className={hasApiKey ? "" : "bg-orange-600 hover:bg-orange-700"}
        >
          <Key className="h-4 w-4 mr-1" />
          {hasApiKey ? "Update API Key" : "Set API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gemini API Configuration</DialogTitle>
          <DialogDescription>
            Set your Google Gemini API key to enable AI-powered features like content enhancement, ATS optimization, and resume analysis.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              <div className="space-y-2">
                <p>To get your free Gemini API key:</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Visit Google AI Studio</li>
                  <li>Sign in with your Google account</li>
                  <li>Create a new API key</li>
                  <li>Copy and paste it below</li>
                </ol>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => window.open('https://aistudio.google.com/app/apikey', '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Get API Key
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save API Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
