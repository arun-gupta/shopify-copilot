// Shopify Dev API Integration Service
// Provides real-time access to Shopify documentation and best practices

const SHOPIFY_DEV_BASE_URL = 'https://shopify.dev';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour cache

// Cache for storing API responses
const responseCache = new Map();

// Common Shopify Dev documentation topics and their URLs
const SHOPIFY_DEV_TOPICS = {
  'graphql': {
    url: '/api/graphql',
    title: 'GraphQL API',
    description: 'Shopify GraphQL API documentation'
  },
  'polaris': {
    url: '/design-system',
    title: 'Polaris Design System',
    description: 'Shopify design system components'
  },
  'app bridge': {
    url: '/app-bridge',
    title: 'App Bridge',
    description: 'Embedded app framework'
  },
  'webhooks': {
    url: '/api/webhooks',
    title: 'Webhooks',
    description: 'Shopify webhook documentation'
  },
  'oauth': {
    url: '/api/authentication',
    title: 'OAuth Authentication',
    description: 'Shopify OAuth authentication'
  },
  'admin api': {
    url: '/api/admin',
    title: 'Admin API',
    description: 'Shopify Admin API documentation'
  },
  'storefront api': {
    url: '/api/storefront',
    title: 'Storefront API',
    description: 'Shopify Storefront API'
  },
  'app development': {
    url: '/apps',
    title: 'App Development',
    description: 'Shopify app development guides'
  },
  'themes': {
    url: '/themes',
    title: 'Theme Development',
    description: 'Shopify theme development'
  },
  'liquid': {
    url: '/docs/api/liquid',
    title: 'Liquid Template Language',
    description: 'Shopify Liquid documentation'
  }
};

// Search shopify.dev for relevant documentation
export const searchShopifyDev = async (query) => {
  const cacheKey = `search:${query.toLowerCase()}`;
  
  // Check cache first
  if (responseCache.has(cacheKey)) {
    const cached = responseCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }

  try {
    // For now, we'll use a mock response that simulates shopify.dev search
    // In production, this would make actual API calls to shopify.dev
    const mockResponse = await mockShopifyDevSearch(query);
    
    // Cache the response
    responseCache.set(cacheKey, {
      data: mockResponse,
      timestamp: Date.now()
    });
    
    return mockResponse;
  } catch (error) {
    console.error('Error searching shopify.dev:', error);
    return null;
  }
};

// Get specific documentation for a topic
export const getShopifyDevDocs = async (topic) => {
  const cacheKey = `docs:${topic.toLowerCase()}`;
  
  // Check cache first
  if (responseCache.has(cacheKey)) {
    const cached = responseCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }

  try {
    const topicInfo = SHOPIFY_DEV_TOPICS[topic.toLowerCase()];
    if (!topicInfo) {
      return null;
    }

    // Mock response for now - in production this would fetch from shopify.dev
    const mockDocs = await mockShopifyDevDocs(topic, topicInfo);
    
    // Cache the response
    responseCache.set(cacheKey, {
      data: mockDocs,
      timestamp: Date.now()
    });
    
    return mockDocs;
  } catch (error) {
    console.error('Error fetching shopify.dev docs:', error);
    return null;
  }
};

// Mock shopify.dev search response
const mockShopifyDevSearch = async (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (lowerQuery.includes('graphql')) {
    return {
      source: 'shopify.dev',
      title: 'GraphQL API',
      url: `${SHOPIFY_DEV_BASE_URL}/api/graphql`,
      content: `**GraphQL API** - Shopify's modern API that lets you request exactly the data you need.

**Key Benefits:**
• Request only the data you need
• Single endpoint for all operations
• Real-time updates with subscriptions
• Better performance than REST
• Strong typing and introspection

**Common Use Cases:**
• Fetching products with specific fields
• Managing orders and inventory
• Customer data operations
• Real-time inventory updates

**Getting Started:**
Visit [shopify.dev/api/graphql](${SHOPIFY_DEV_BASE_URL}/api/graphql) for complete documentation.`,
      relevance: 0.95
    };
  }
  
  if (lowerQuery.includes('polaris')) {
    return {
      source: 'shopify.dev',
      title: 'Polaris Design System',
      url: `${SHOPIFY_DEV_BASE_URL}/design-system`,
      content: `**Polaris Design System** - Shopify's design system for building consistent, accessible apps.

**Key Features:**
• Pre-built React components
• Consistent with Shopify admin
• Accessibility built-in
• Responsive design patterns
• Comprehensive documentation

**Benefits:**
• Faster development
• Professional appearance
• Consistent user experience
• Built-in accessibility
• Mobile-responsive

**Getting Started:**
Visit [shopify.dev/design-system](${SHOPIFY_DEV_BASE_URL}/design-system) for component library and guidelines.`,
      relevance: 0.92
    };
  }
  
  if (lowerQuery.includes('oauth') || lowerQuery.includes('authentication')) {
    return {
      source: 'shopify.dev',
      title: 'OAuth Authentication',
      url: `${SHOPIFY_DEV_BASE_URL}/api/authentication`,
      content: `**OAuth Authentication** - Securely connect your app to Shopify stores.

**OAuth Flow:**
1. Redirect merchant to Shopify
2. Merchant authorizes your app
3. Shopify redirects back with code
4. Exchange code for access token
5. Use token for API requests

**Security Features:**
• Secure token exchange
• Scoped permissions
• Token refresh handling
• Secure storage requirements

**Required for:**
• All apps that access store data
• Admin API operations
• Webhook management
• Store-specific functionality

**Documentation:**
Visit [shopify.dev/api/authentication](${SHOPIFY_DEV_BASE_URL}/api/authentication) for complete OAuth guide.`,
      relevance: 0.90
    };
  }
  
  if (lowerQuery.includes('webhook')) {
    return {
      source: 'shopify.dev',
      title: 'Webhooks',
      url: `${SHOPIFY_DEV_BASE_URL}/api/webhooks`,
      content: `**Webhooks** - Get notified when events happen in Shopify stores.

**Common Webhook Topics:**
• orders/create, orders/updated, orders/cancelled
• products/create, products/update, products/delete
• customers/create, customers/update
• inventory_levels/update
• app/uninstalled

**Implementation:**
• Create webhook endpoint in your app
• Register webhook with Shopify
• Handle webhook verification
• Process webhook payloads
• Respond with 200 status

**Best Practices:**
• Always verify webhook authenticity
• Process webhooks asynchronously
• Handle webhook failures gracefully
• Use idempotency for duplicate events

**Documentation:**
Visit [shopify.dev/api/webhooks](${SHOPIFY_DEV_BASE_URL}/api/webhooks) for complete webhook guide.`,
      relevance: 0.88
    };
  }
  
  if (lowerQuery.includes('app bridge')) {
    return {
      source: 'shopify.dev',
      title: 'App Bridge',
      url: `${SHOPIFY_DEV_BASE_URL}/app-bridge`,
      content: `**App Bridge** - JavaScript library for seamless Shopify admin integration.

**Key Features:**
• Navigation between admin sections
• Toast notifications
• Modal dialogs
• Resource picker
• Loading states
• Error handling

**Benefits:**
• Native Shopify admin feel
• Consistent user experience
• Built-in admin navigation
• Professional notifications
• Seamless integration

**Common Use Cases:**
• Redirect to products, orders, customers
• Show success/error messages
• Open file/image pickers
• Display loading states
• Handle admin navigation

**Documentation:**
Visit [shopify.dev/app-bridge](${SHOPIFY_DEV_BASE_URL}/app-bridge) for complete App Bridge guide.`,
      relevance: 0.85
    };
  }
  
  // Default response for other queries
  return {
    source: 'shopify.dev',
    title: 'Shopify App Development',
    url: `${SHOPIFY_DEV_BASE_URL}/apps`,
    content: `**Shopify App Development** - Build apps that extend Shopify's functionality.

**Getting Started:**
• Choose your app type (Admin, Storefront, Theme)
• Set up your development environment
• Implement OAuth authentication
• Use Shopify APIs (GraphQL, REST)
• Follow Shopify's design guidelines

**Resources:**
• [App Development Guide](${SHOPIFY_DEV_BASE_URL}/apps)
• [API Documentation](${SHOPIFY_DEV_BASE_URL}/api)
• [Design System](${SHOPIFY_DEV_BASE_URL}/design-system)
• [Partner Dashboard](https://partners.shopify.com)

**Best Practices:**
• Start with a clear app purpose
• Follow Shopify's design guidelines
• Implement proper error handling
• Test thoroughly before launch
• Keep your app updated`,
    relevance: 0.70
  };
};

// Mock shopify.dev documentation response
const mockShopifyDevDocs = async (topic, topicInfo) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    source: 'shopify.dev',
    title: topicInfo.title,
    url: `${SHOPIFY_DEV_BASE_URL}${topicInfo.url}`,
    content: `**${topicInfo.title}** - ${topicInfo.description}

**Documentation:** [${topicInfo.title}](${SHOPIFY_DEV_BASE_URL}${topicInfo.url})

**Key Points:**
• Official Shopify documentation
• Latest updates and best practices
• Code examples and tutorials
• API reference and guides
• Community support and resources

**Next Steps:**
1. Visit the documentation page
2. Review the getting started guide
3. Check code examples
4. Follow implementation tutorials
5. Join the Shopify developer community`,
    relevance: 0.95
  };
};

// Clear cache (useful for development)
export const clearShopifyDevCache = () => {
  responseCache.clear();
};

// Get cache statistics
export const getCacheStats = () => {
  return {
    size: responseCache.size,
    entries: Array.from(responseCache.keys())
  };
}; 