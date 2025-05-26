
export const convertMarkdownToHTML = (markdown: string): string => {
  return markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-6 text-gray-800 border-b border-gray-300 pb-1">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2 mt-4 text-gray-700">$1</h3>')
    
    // Text formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
    
    // Lists
    .replace(/^\* (.*$)/gm, '<li class="mb-1">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="mb-1">$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
    
    // Images (profile photos)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200" />')
    
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-6 border-gray-300">')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-3 text-gray-700 leading-relaxed">')
    .replace(/^(.*)$/gm, '<p class="mb-3 text-gray-700 leading-relaxed">$1</p>')
    
    // Clean up
    .replace(/<p class="[^"]*"><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p class="[^"]*"><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p class="[^"]*"><hr[^>]*><\/p>/g, '<hr class="my-6 border-gray-300">')
    .replace(/<p class="[^"]*"><\/p>/g, '')
    .replace(/<p class="[^"]*">\s*<\/p>/g, '');
};

export const exportToPDF = (content: string, filename: string) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: white;
            padding: 1rem;
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #111827;
            text-align: center;
        }
        
        h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #1f2937;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 0.25rem;
        }
        
        h3 {
            font-size: 1.125rem;
            font-weight: 500;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #374151;
        }
        
        p {
            margin-bottom: 0.75rem;
            color: #374151;
            line-height: 1.625;
        }
        
        ul {
            margin-bottom: 1rem;
            padding-left: 1.25rem;
        }
        
        li {
            margin-bottom: 0.25rem;
            color: #4b5563;
        }
        
        strong {
            font-weight: 600;
            color: #111827;
        }
        
        em {
            font-style: italic;
            color: #374151;
        }
        
        a {
            color: #2563eb;
            text-decoration: underline;
        }
        
        hr {
            margin: 1.5rem 0;
            border: none;
            border-top: 1px solid #d1d5db;
        }
        
        img {
            max-width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            display: block;
            margin: 0 auto 1rem;
            border: 2px solid #e5e7eb;
        }
        
        @page {
            margin: 0.75in;
            size: A4;
        }
        
        @media print {
            body {
                padding: 0;
                font-size: 11pt;
                line-height: 1.4;
            }
            
            h1 { font-size: 16pt; }
            h2 { font-size: 14pt; }
            h3 { font-size: 12pt; }
            
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    <div class="resume-content">
        ${convertMarkdownToHTML(content)}
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 250);
        };
    </script>
</body>
</html>`;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
};
