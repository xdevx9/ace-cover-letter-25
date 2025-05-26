
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, Briefcase, GraduationCap, Wrench, FolderOpen } from "lucide-react";

interface DynamicFieldsManagerProps {
  onAddField: (fieldType: string) => void;
  isMobile?: boolean;
}

export function DynamicFieldsManager({ onAddField, isMobile = false }: DynamicFieldsManagerProps) {
  const fieldOptions = [
    { type: 'experience', label: 'Work Experience', icon: Briefcase },
    { type: 'education', label: 'Education', icon: GraduationCap },
    { type: 'skills', label: 'Skills', icon: Wrench },
    { type: 'projects', label: 'Projects', icon: FolderOpen },
  ];

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {fieldOptions.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => onAddField(type)}
            className="h-7 px-2 text-xs"
          >
            <Icon className="h-3 w-3 mr-1" />
            {label.split(' ')[0]}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            Add Section
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {fieldOptions.map(({ type, label, icon: Icon }) => (
            <DropdownMenuItem
              key={type}
              onClick={() => onAddField(type)}
              className="cursor-pointer"
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
