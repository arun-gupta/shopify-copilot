// LLM Provider Service - Supports multiple AI providers
// Currently supports: OpenAI, Ollama, Mistral

const LLM_PROVIDERS = {
  OPENAI: 'openai',
  OLLAMA: 'ollama',
  MISTRAL: 'mistral'
};

// Configuration for different providers
const PROVIDER_CONFIGS = {
  [LLM_PROVIDERS.OPENAI]: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4'
  },
  [LLM_PROVIDERS.OLLAMA]: {
    name: 'Ollama',
    baseUrl: 'http://localhost:11434',
    models: ['mistral', 'llama2', 'codellama', 'neural-chat'],
    defaultModel: 'mistral'
  },
  [LLM_PROVIDERS.MISTRAL]: {
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai/v1',
    models: ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'],
    defaultModel: 'mistral-medium-latest'
  }
};

// Get the current provider from environment
export const getCurrentProvider = () => {
  return process.env.REACT_APP_LLM_PROVIDER || LLM_PROVIDERS.OLLAMA;
};

// Get provider configuration
export const getProviderConfig = (provider = null) => {
  const currentProvider = provider || getCurrentProvider();
  return PROVIDER_CONFIGS[currentProvider] || PROVIDER_CONFIGS[LLM_PROVIDERS.OPENAI];
};

// Generate app using the configured LLM provider
export const generateAppWithLLM = async (formData, provider = null) => {
  const currentProvider = provider || getCurrentProvider();
  
  switch (currentProvider) {
    case LLM_PROVIDERS.OPENAI:
      return await generateWithOpenAI(formData);
    case LLM_PROVIDERS.OLLAMA:
      return await generateWithOllama(formData);
    case LLM_PROVIDERS.MISTRAL:
      return await generateWithMistral(formData);
    default:
      throw new Error(`Unsupported LLM provider: ${currentProvider}`);
  }
};

// OpenAI implementation
const generateWithOpenAI = async (formData) => {
  const config = getProviderConfig(LLM_PROVIDERS.OPENAI);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found');
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: config.defaultModel,
      messages: [
        {
          role: 'system',
          content: 'You are a Shopify app development expert. Generate complete app scaffolds based on user requirements. Return a JSON object with a "files" property containing file paths as keys and file contents as values.'
        },
        {
          role: 'user',
          content: buildPrompt(formData)
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return parseLLMResponse(content);
};

// Ollama implementation
const generateWithOllama = async (formData) => {
  const config = getProviderConfig(LLM_PROVIDERS.OLLAMA);
  const baseUrl = process.env.REACT_APP_OLLAMA_BASE_URL || config.baseUrl;
  
  const response = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: config.defaultModel,
      prompt: buildPrompt(formData),
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 4000
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = await response.json();
  return parseLLMResponse(data.response);
};

// Mistral AI implementation
const generateWithMistral = async (formData) => {
  const config = getProviderConfig(LLM_PROVIDERS.MISTRAL);
  const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
  
  if (!apiKey) {
    throw new Error('Mistral API key not found');
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: config.defaultModel,
      messages: [
        {
          role: 'system',
          content: 'You are a Shopify app development expert. Generate complete app scaffolds based on user requirements. Return a JSON object with a "files" property containing file paths as keys and file contents as values.'
        },
        {
          role: 'user',
          content: buildPrompt(formData)
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    throw new Error(`Mistral API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return parseLLMResponse(content);
};

// Build the prompt for app generation
const buildPrompt = (formData) => {
  return `Generate a Shopify app with these requirements:
    - App Type: ${formData.appType}
    - Framework: ${formData.framework}
    - Features: ${formData.features.join(', ')}
    - Description: ${formData.description}
    
    Return a JSON object with a 'files' property containing file paths as keys and file contents as values.
    
    Example format:
    {
      "files": {
        "package.json": "{\"name\": \"shopify-app\", ...}",
        "index.js": "const express = require('express'); ...",
        "README.md": "# Shopify App\\n\\n..."
      }
    }`;
};

// Parse LLM response and extract files
const parseLLMResponse = (content) => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.files) {
        return {
          success: true,
          files: parsed.files
        };
      }
    }
    
    // If no valid JSON found, throw error
    throw new Error('Invalid response format from LLM');
  } catch (error) {
    console.error('Error parsing LLM response:', error);
    throw new Error('Failed to parse LLM response. Please try again.');
  }
};

// Get available providers
export const getAvailableProviders = () => {
  return Object.values(LLM_PROVIDERS);
};

// Check if a provider is available
export const isProviderAvailable = (provider) => {
  const config = getProviderConfig(provider);
  
  switch (provider) {
    case LLM_PROVIDERS.OPENAI:
      return !!process.env.REACT_APP_OPENAI_API_KEY;
    case LLM_PROVIDERS.OLLAMA:
      return true; // Ollama is local, no API key needed
    case LLM_PROVIDERS.MISTRAL:
      return !!process.env.REACT_APP_MISTRAL_API_KEY;
    default:
      return false;
  }
};

// Get provider status
export const getProviderStatus = async (provider) => {
  try {
    const config = getProviderConfig(provider);
    
    switch (provider) {
      case LLM_PROVIDERS.OLLAMA:
        // Test Ollama connection
        const response = await fetch(`${config.baseUrl}/api/tags`);
        return response.ok ? 'available' : 'unavailable';
      default:
        return isProviderAvailable(provider) ? 'available' : 'unavailable';
    }
  } catch (error) {
    return 'unavailable';
  }
}; 