const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.post('/api/generate', async (req, res) => {
  try {
    const { appType, framework, features, description } = req.body;
    
    // Mock response for development
    // In production, this would call OpenAI API
    const mockFiles = {
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
1. Install dependencies: \`npm install\`
2. Set up environment variables
3. Run the app: \`npm start\`

## Development
Run \`npm run dev\` for development with auto-reload.
`,
      
      '.env.example': `# Shopify App Configuration
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
`
    };

    // Add framework-specific files
    if (framework === 'Remix') {
      mockFiles['remix.config.js'] = `/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^@shopify\/shopify-app-remix.*/,
  ],
};
`;
      
      mockFiles['app/root.jsx'] = `import { json } from "@remix-run/node";
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
      mockFiles['components/PolarisProvider.jsx'] = `import { AppProvider } from '@shopify/polaris';
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
      mockFiles['components/AppBridgeProvider.jsx'] = `import { Provider } from '@shopify/app-bridge-react';

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

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    res.json({
      success: true,
      files: mockFiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 