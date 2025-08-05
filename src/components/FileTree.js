import React from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

const FileTree = ({ files, selectedFile, onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = React.useState(new Set());

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const organizeFiles = (files) => {
    const tree = {};
    
    Object.keys(files).forEach(filePath => {
      const parts = filePath.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          // This is a file
          current[part] = { type: 'file', path: filePath };
        } else {
          // This is a folder
          if (!current[part]) {
            current[part] = { type: 'folder', children: {} };
          }
          current = current[part].children;
        }
      });
    });
    
    return tree;
  };

  const renderTree = (tree, level = 0) => {
    return Object.entries(tree).map(([name, item]) => {
      const indent = level * 16;
      
      if (item.type === 'folder') {
        const isExpanded = expandedFolders.has(name);
        const hasChildren = Object.keys(item.children).length > 0;
        
        return (
          <div key={name}>
            <div
              className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer ${
                hasChildren ? '' : 'opacity-50'
              }`}
              style={{ paddingLeft: `${indent + 8}px` }}
              onClick={() => hasChildren && toggleFolder(name)}
            >
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500 mr-1" />
                )
              ) : (
                <div className="w-4 mr-1" />
              )}
              <Folder className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{name}</span>
            </div>
            {isExpanded && hasChildren && (
              <div>
                {renderTree(item.children, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={name}
            className={`flex items-center py-1 px-2 cursor-pointer ${
              selectedFile === item.path
                ? 'bg-shopify-100 text-shopify-700'
                : 'hover:bg-gray-100'
            }`}
            style={{ paddingLeft: `${indent + 8}px` }}
            onClick={() => onFileSelect(item.path)}
          >
            <File className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{name}</span>
          </div>
        );
      }
    });
  };

  const fileTree = organizeFiles(files);

  return (
    <div className="overflow-y-auto h-full">
      <div className="space-y-1">
        {renderTree(fileTree)}
      </div>
    </div>
  );
};

export default FileTree; 