// import axios from 'axios'; // Uncomment when using actual API
import { generateAppWithLLM, getCurrentProvider, isProviderAvailable } from './llmProvider';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'; // Uncomment when using actual API

// Mock response for development - replace with actual OpenAI API call
const generateMockResponse = (formData) => {
  const { appType, framework, features, description } = formData;
  
  const baseFiles = {
    'package.json': JSON.stringify({
      name: "shopify-app",
      version: "1.0.0",
      description: description.substring(0, 100) + "...",
      main: "index.js",
      scripts: {
        "start": "node index.js",
        "dev": "nodemon index.js"
      },
      dependencies: {
        "express": "^4.18.2",
        "dotenv": "^16.0.3"
      },
      devDependencies: {
        "nodemon": "^2.0.22"
      }
    }, null, 2),
    
                    'README.md': `# Shopify App

${description}

## Features
- App Type: ${appType}
- Framework: ${framework}
- Features: ${features.join(', ')}

## Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables
1. Copy the example environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. Get your Shopify API credentials:
   - Go to [Shopify Partners](https://partners.shopify.com)
   - Create a new app or use an existing one
   - Navigate to **App Setup** → **Admin API integration**
   - Copy your **API key** and **API secret key**

3. Update your \`.env\` file with your credentials:
   \`\`\`bash
   SHOPIFY_API_KEY=your_actual_api_key_here
   SHOPIFY_API_SECRET=your_actual_api_secret_here
   SHOPIFY_SCOPES=read_products,write_products
   SHOPIFY_APP_URL=https://your-app-url.com
   \`\`\`

### 3. Run the App
\`\`\`bash
npm start
\`\`\`

## Development
Run \`npm run dev\` for development with auto-reload.

## Where to Find Your Shopify Credentials

### Shopify Partners Dashboard
1. **Sign up/Login**: [partners.shopify.com](https://partners.shopify.com)
2. **Create App**: Click "Create app" → "Create app manually"
3. **App Setup**: Go to your app → "App Setup"
4. **Admin API**: Click "Configure" under "Admin API integration"
5. **Copy Credentials**: 
   - **API key** (Client ID)
   - **API secret key** (Client Secret)

### Required Scopes
The default scopes include:
- \`read_products\` - Read product information
- \`write_products\` - Create/update products

Add more scopes based on your app's needs:
- \`read_orders\` - Read order information
- \`write_orders\` - Create/update orders
- \`read_customers\` - Read customer data
- \`write_customers\` - Create/update customers

## Next Steps
1. Test your app with a development store
2. Submit for review when ready
3. Publish to the Shopify App Store
`,
    
    '.env.example': `# Shopify App Environment Variables
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_SCOPES=read_products,write_products
SHOPIFY_APP_URL=https://your-app-url.com
`,
    
    'index.js': `const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Shopify app is running' });
});

${features.includes('GraphQL') ? `
// GraphQL endpoint
app.post('/graphql', async (req, res) => {
  try {
    // Handle GraphQL queries here
    res.json({ data: { message: 'GraphQL endpoint ready' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
` : ''}

${features.includes('Webhooks') ? `
// Webhook endpoints
app.post('/webhooks/orders/create', (req, res) => {
  console.log('Order created:', req.body);
  res.status(200).send('OK');
});

app.post('/webhooks/products/update', (req, res) => {
  console.log('Product updated:', req.body);
  res.status(200).send('OK');
});
` : ''}

${features.includes('OAuth') ? `
// OAuth endpoints
app.get('/auth', (req, res) => {
  // Redirect to Shopify OAuth
  const shop = req.query.shop;
  const authUrl = \`https://\${shop}/admin/oauth/authorize?client_id=\${process.env.SHOPIFY_API_KEY}&scope=\${process.env.SHOPIFY_SCOPES}&redirect_uri=\${process.env.SHOPIFY_APP_URL}/auth/callback\`;
  res.redirect(authUrl);
});

app.get('/auth/callback', (req, res) => {
  // Handle OAuth callback
  const { code, shop } = req.query;
  // Exchange code for access token
  res.json({ message: 'OAuth callback received' });
});
` : ''}

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,
  };

  // Add framework-specific files
  if (framework === 'Remix') {
    baseFiles['remix.config.js'] = `/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^@shopify/shopify-app-remix.*/,
  ],
};
`;
    
    baseFiles['app/root.jsx'] = `import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta = () => ({
  charset: "utf-8",
  title: "Shopify App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`;
  }

  // Add Polaris components if selected
  if (features.includes('Polaris')) {
    baseFiles['components/PolarisProvider.jsx'] = `import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

export function PolarisProvider({ children }) {
  return (
    <AppProvider i18n={{}}>
      {children}
    </AppProvider>
  );
}
`;
  }

  // Add App Bridge if selected
  if (features.includes('App Bridge')) {
    baseFiles['components/AppBridgeProvider.jsx'] = `import { Provider } from '@shopify/app-bridge-react';

export function AppBridgeProvider({ children }) {
  const config = {
    apiKey: process.env.SHOPIFY_API_KEY,
    host: new URLSearchParams(window.location.search).get('host'),
    forceRedirect: true,
  };

  return (
    <Provider config={config}>
      {children}
    </Provider>
  );
}
`;
  }

  return baseFiles;
};

export const generateApp = async (formData) => {
  try {
    // Check if we should use mock responses
    const useMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';
    
    if (useMockApi) {
      // Use mock response for development
      const mockFiles = generateMockResponse(formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        files: mockFiles
      };
    }
    
    // Use real LLM provider
    const currentProvider = getCurrentProvider();
    
    if (!isProviderAvailable(currentProvider)) {
      throw new Error(`${currentProvider} is not available. Please check your configuration.`);
    }
    
    console.log(`Using LLM provider: ${currentProvider}`);
    return await generateAppWithLLM(formData, currentProvider);
    
  } catch (error) {
    console.error('Error generating app:', error);
    throw new Error('Failed to generate app: ' + error.message);
  }
};

// Production OpenAI API call (commented out for now)
/*
export const generateAppWithOpenAI = async (formData) => {
  try {
    // Use backend API for production (more secure)
    const response = await axios.post('/api/generate', {
      appType: formData.appType,
      framework: formData.framework,
      features: formData.features,
      description: formData.description
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to generate app: ' + error.message);
  }
};

// Development OpenAI API call (frontend direct access)
export const generateAppWithOpenAIDev = async (formData) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Shopify app development expert. Generate complete app scaffolds based on user requirements.'
        },
        {
          role: 'user',
          content: `Generate a Shopify app with these requirements:
            - App Type: ${formData.appType}
            - Framework: ${formData.framework}
            - Features: ${formData.features.join(', ')}
            - Description: ${formData.description}
            
            Return a JSON object with a 'files' property containing file paths as keys and file contents as values.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Parse the response and extract files
    const content = response.data.choices[0].message.content;
    const files = JSON.parse(content);
    
    return {
      success: true,
      files: files.files
    };
  } catch (error) {
    throw new Error('Failed to generate app: ' + error.message);
  }
};
*/ 