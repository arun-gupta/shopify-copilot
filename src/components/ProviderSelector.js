import React, { useState, useEffect } from 'react';
import { getAvailableProviders, getProviderConfig, getProviderStatus, isProviderAvailable } from '../services/llmProvider';
import { Settings, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ProviderSelector = ({ onProviderChange }) => {
  const [selectedProvider, setSelectedProvider] = useState(process.env.REACT_APP_LLM_PROVIDER || 'ollama');
  const [providerStatus, setProviderStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const providers = getAvailableProviders();

  useEffect(() => {
    const checkProviderStatus = async () => {
      const status = {};
      for (const provider of providers) {
        status[provider] = await getProviderStatus(provider);
      }
      setProviderStatus(status);
      setIsLoading(false);
    };

    checkProviderStatus();
  }, [providers]);

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    if (onProviderChange) {
      onProviderChange(provider);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'unavailable':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Checking...';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Settings className="h-4 w-4 animate-spin" />
        <span>Checking providers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Settings className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">AI Provider</span>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {providers.map((provider) => {
          const config = getProviderConfig(provider);
          const status = providerStatus[provider] || 'unknown';
          const isAvailable = isProviderAvailable(provider);
          
          return (
            <label
              key={provider}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedProvider === provider
                  ? 'border-shopify-500 bg-shopify-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name="provider"
                value={provider}
                checked={selectedProvider === provider}
                onChange={() => handleProviderChange(provider)}
                disabled={!isAvailable}
                className="text-shopify-600 focus:ring-shopify-500"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{config.name}</div>
                    <div className="text-sm text-gray-500">
                      Default model: {config.defaultModel}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <span className="text-xs text-gray-500">
                      {getStatusText(status)}
                    </span>
                  </div>
                </div>
                
                {provider === 'ollama' && (
                  <div className="mt-1 text-xs text-blue-600">
                    Local AI - requires Ollama server running
                  </div>
                )}
                
                {provider === 'openai' && !process.env.REACT_APP_OPENAI_API_KEY && (
                  <div className="mt-1 text-xs text-orange-600">
                    Requires OpenAI API key
                  </div>
                )}
                
                {provider === 'mistral' && !process.env.REACT_APP_MISTRAL_API_KEY && (
                  <div className="mt-1 text-xs text-orange-600">
                    Requires Mistral API key
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500">
        <p>• <strong>OpenAI:</strong> Cloud-based, requires API key</p>
        <p>• <strong>Ollama:</strong> Local AI, free, requires Ollama installation</p>
        <p>• <strong>Mistral:</strong> Cloud-based, requires API key</p>
      </div>
    </div>
  );
};

export default ProviderSelector; 