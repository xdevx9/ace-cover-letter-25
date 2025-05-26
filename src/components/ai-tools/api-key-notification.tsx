
import { Key } from "lucide-react";
import { ApiKeyDialog } from "@/components/api-key-dialog";

interface ApiKeyNotificationProps {
  onApiKeySet: () => void;
}

export function ApiKeyNotification({ onApiKeySet }: ApiKeyNotificationProps) {
  return (
    <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
      <div className="flex items-center space-x-2 mb-2">
        <Key className="h-4 w-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-800 dark:text-orange-200">API Key Required</span>
      </div>
      <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
        Set your Gemini API key to unlock AI-powered features.
      </p>
      <ApiKeyDialog onApiKeySet={onApiKeySet} />
    </div>
  );
}
