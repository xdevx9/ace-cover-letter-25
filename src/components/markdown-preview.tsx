
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  const htmlContent = useMemo(() => {
    // Enhanced Markdown to HTML converter with better mobile styling
    let html = content
      // Headers with responsive styling
      .replace(/^### (.*$)/gm, '<h3 class="text-base sm:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-900 dark:text-white border-b-2 border-blue-600 pb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-center">$1</h1>')
      
      // Bold text with better contrast
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      
      // Italic text
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
      
      // Horizontal rules with better styling
      .replace(/^---$/gm, '<hr class="border-gray-300 dark:border-gray-600 my-4 sm:my-6 border-t-2" />')
      
      // Code blocks with responsive styling
      .replace(/`(.*?)`/g, '<code class="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-mono border">$1</code>')
      
      // Links with better mobile styling
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-medium break-words">$1</a>')
      
      // Images with responsive styling
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-sm my-2 sm:my-4 mx-auto block" style="max-height: 200px; width: auto;" />')
      
      // Bullet points with responsive formatting
      .replace(/^• (.*)$/gm, '<li class="ml-2 sm:ml-4 mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">$1</li>')
      
      // Line breaks and paragraphs with responsive spacing
      .replace(/\n\n/g, '</p><p class="mb-2 sm:mb-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">')
      .replace(/\n/g, '<br />');

    // Wrap content in paragraphs with responsive spacing
    html = '<div class="resume-content"><p class="mb-2 sm:mb-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">' + html + '</p></div>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-2 sm:mb-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"><\/p>/g, '');
    
    // Wrap bullet points in proper ul tags with responsive styling
    html = html.replace(/(<li class="ml-2 sm:ml-4 mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">.*?<\/li>)/gs, (match) => {
      const listItems = match.match(/<li class="ml-2 sm:ml-4 mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">.*?<\/li>/g);
      if (listItems) {
        return '<ul class="list-disc pl-4 sm:pl-6 mb-2 sm:mb-4 space-y-1">' + listItems.join('').replace(/class="ml-2 sm:ml-4 mb-1 sm:mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"/g, 'class="text-sm sm:text-base text-gray-700 dark:text-gray-300"') + '</ul>';
      }
      return match;
    });
    
    return html;
  }, [content]);

  return (
    <div 
      className={cn(
        "prose prose-sm max-w-none",
        "prose-headings:text-gray-900 dark:prose-headings:text-white",
        "prose-p:text-gray-700 dark:prose-p:text-gray-300",
        "prose-strong:text-gray-900 dark:prose-strong:text-white",
        "prose-ul:text-gray-700 dark:prose-ul:text-gray-300",
        "prose-li:text-gray-700 dark:prose-li:text-gray-300",
        // Mobile-first responsive text sizing
        "text-sm sm:text-base",
        "leading-relaxed sm:leading-relaxed",
        className
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
