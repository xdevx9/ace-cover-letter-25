
import { Button } from "@/components/ui/button";
import { AI_TOOLS, AIToolId } from "@/config/ai-tools";

interface ToolsNavigationProps {
  activeTab: AIToolId;
  onTabChange: (tab: AIToolId) => void;
}

export function ToolsNavigation({ activeTab, onTabChange }: ToolsNavigationProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {AI_TOOLS.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTab === tool.id ? "default" : "outline"}
          size="sm"
          className="h-auto p-2 flex flex-col items-center text-xs"
          onClick={() => onTabChange(tool.id)}
        >
          <tool.icon className="h-4 w-4 mb-1" />
          <span className="text-center">{tool.label}</span>
        </Button>
      ))}
    </div>
  );
}
