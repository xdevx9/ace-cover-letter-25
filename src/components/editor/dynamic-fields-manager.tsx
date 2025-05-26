
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

interface DynamicField {
  id: string;
  value: string;
}

interface DynamicFieldsManagerProps {
  fields: DynamicField[];
  onFieldsChange: (fields: DynamicField[]) => void;
  placeholder?: string;
}

export function DynamicFieldsManager({ 
  fields, 
  onFieldsChange, 
  placeholder = "Enter value" 
}: DynamicFieldsManagerProps) {
  const [newFieldValue, setNewFieldValue] = useState("");

  const addField = () => {
    if (newFieldValue.trim()) {
      const newField: DynamicField = {
        id: Date.now().toString(),
        value: newFieldValue.trim()
      };
      onFieldsChange([...fields, newField]);
      setNewFieldValue("");
    }
  };

  const removeField = (id: string) => {
    onFieldsChange(fields.filter(field => field.id !== id));
  };

  const updateField = (id: string, value: string) => {
    onFieldsChange(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ));
  };

  return (
    <div className="space-y-2">
      {fields.map((field) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Input
            value={field.value}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeField(field.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      
      <div className="flex items-center space-x-2">
        <Input
          value={newFieldValue}
          onChange={(e) => setNewFieldValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addField()}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={addField}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
