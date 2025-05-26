
export const convertMarkdownToHTML = (markdown: string): string => {
  return markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><hr><\/p>/g, '<hr>')
    .replace(/<p><\/p>/g, '');
};

export const exportToPDF = (content: string, filename: string) => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>${filename}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 1rem;
            color: #000;
        }
        h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        h2 { font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        h3 { font-size: 1.1rem; margin-top: 1rem; margin-bottom: 0.5rem; }
        ul { margin: 0.5rem 0; }
        li { margin-bottom: 0.25rem; }
        hr { margin: 1rem 0; }
        @page { margin: 0.75in; }
    </style>
</head>
<body>
${convertMarkdownToHTML(content)}
</body>
</html>`;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};
