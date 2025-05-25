
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    // Simple Markdown to HTML converter
    let html = content
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">$1</h1>')
      
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      
      // Italic text
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Horizontal rules
      .replace(/^---$/gm, '<hr class="border-gray-200 dark:border-gray-700 my-4" />')
      
      // Code blocks (inline)
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">$1</a>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-3 text-gray-700 dark:text-gray-300">')
      .replace(/\n/g, '<br />');

    // Wrap content in paragraphs
    html = '<p class="mb-3 text-gray-700 dark:text-gray-300">' + html + '</p>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-3 text-gray-700 dark:text-gray-300"><\/p>/g, '');
    
    return html;
  }, [content]);

  return (
    <div 
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
