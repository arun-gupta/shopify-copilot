import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ filePath, content }) => {
  const getLanguageFromPath = (path) => {
    if (!path) return 'text';
    
    const extension = path.split('.').pop().toLowerCase();
    
    const languageMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'json': 'json',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'env': 'bash',
      'sh': 'bash',
      'sql': 'sql',
      'xml': 'xml',
      'txt': 'text'
    };
    
    return languageMap[extension] || 'text';
  };

  const language = getLanguageFromPath(filePath);

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a file to view its contents</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '14px',
            fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
            backgroundColor: '#1e1e1e',
            borderRadius: '0.5rem'
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#6b7280',
            marginRight: '1rem',
            userSelect: 'none'
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer; 