
import { Button } from "@/components/ui/button";

interface SimpleToolProps {
  title: string;
  description: string;
  actionLabel: string;
  loadingLabel: string;
  features: string[];
  featureColor: string;
  onAction: () => void;
  isLoading: boolean;
  hasContent: boolean;
  hasApiKey: boolean;
}

export function SimpleTool({
  title,
  description,
  actionLabel,
  loadingLabel,
  features,
  featureColor,
  onAction,
  isLoading,
  hasContent,
  hasApiKey
}: SimpleToolProps) {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full" 
        onClick={onAction}
        disabled={isLoading || !hasContent || !hasApiKey}
      >
        {isLoading ? loadingLabel : actionLabel}
      </Button>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {description}
      </div>
      <div className={`text-xs ${featureColor} p-2 rounded`}>
        <p className="font-medium">{title}:</p>
        {features.map((feature, index) => (
          <p key={index}>• {feature}</p>
        ))}
      </div>
    </div>
  );
}
