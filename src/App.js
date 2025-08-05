import React, { useState, useRef } from 'react';
import AppForm from './components/AppForm';
import CodeViewer from './components/CodeViewer';
import FileTree from './components/FileTree';
import ChatAssistant from './components/ChatAssistant';
import { Download, Code, FileText, Settings, MessageCircle } from 'lucide-react';
import { generateApp } from './services/api';

function App() {
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const applyDefaultsRef = useRef(null);

  const handleGenerateApp = async (formData) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateApp(formData);
      setGeneratedFiles(result.files);
      setSelectedFile(Object.keys(result.files)[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadZip = async () => {
    if (!generatedFiles) return;

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    Object.entries(generatedFiles).forEach(([filePath, content]) => {
      zip.file(filePath, content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopify-app.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyDefaults = (defaults) => {
    if (applyDefaultsRef.current) {
      applyDefaultsRef.current(defaults);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Code className="h-8 w-8 text-shopify-600" />
                                        <h1 className="text-xl font-bold text-gray-900">
                            ShopifyGPT
                          </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Powered by GPT-4</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!generatedFiles ? (
          /* Form View */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Build Your Shopify App
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your idea and we'll create a complete app for you with all the files you need.
              </p>
            </div>
            
            <AppForm 
              onGenerate={handleGenerateApp} 
              isGenerating={isGenerating} 
              error={error}
              onApplyDefaults={applyDefaultsRef}
            />
          </div>
        ) : (
          /* Code View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* File Tree */}
            <div className="lg:col-span-1">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Files
                  </h3>
                  <button
                    onClick={handleDownloadZip}
                    className="btn-primary flex items-center text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download ZIP
                  </button>
                </div>
                <FileTree
                  files={generatedFiles}
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                />
              </div>
            </div>

            {/* Code Viewer */}
            <div className="lg:col-span-2">
              <div className="card h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    {selectedFile || 'Select a file'}
                  </h3>
                  <button
                    onClick={() => setGeneratedFiles(null)}
                    className="btn-secondary text-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Start Over
                  </button>
                </div>
                <CodeViewer
                  filePath={selectedFile}
                  content={selectedFile ? generatedFiles[selectedFile] : null}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Assistant */}
      {showChat && (
        <ChatAssistant 
          onApplyDefaults={handleApplyDefaults}
          onExplainFeature={(feature) => {
            // Handle feature explanations if needed
            console.log('Explaining feature:', feature);
          }}
        />
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 left-4 bg-shopify-600 hover:bg-shopify-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="Chat with App Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}

export default App; 