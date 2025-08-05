import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const AppForm = ({ onGenerate, isGenerating, error, onApplyDefaults }) => {
  const [formData, setFormData] = useState({
    appType: 'Admin App',
    framework: 'Node.js',
    features: [],
    description: ''
  });

  // Handle applying defaults from chat assistant
  React.useEffect(() => {
    if (onApplyDefaults) {
      const handleDefaults = (defaults) => {
        setFormData(prev => ({
          ...prev,
          appType: defaults.appType,
          framework: defaults.framework,
          features: defaults.features
        }));
        
        // Show a brief notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        notification.textContent = 'Great choices applied! Check your form above.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      };
      
      // Expose the handler to parent component
      onApplyDefaults.current = handleDefaults;
    }
  }, [onApplyDefaults]);

  const appTypes = [
    { value: 'Admin App', label: 'For Store Owners (Admin App)', description: 'Help store owners manage their business from the Shopify dashboard' },
    { value: 'Storefront Extension', label: 'For Customers (Storefront Extension)', description: 'Enhance the shopping experience on the store website' },
    { value: 'Theme App', label: 'Built into Store Design (Theme App)', description: 'Integrate directly into the store\'s look and feel' }
  ];

  const frameworks = [
    { value: 'Node.js', label: 'Fast & Popular (Node.js)', description: 'Great for beginners, lots of help available' },
    { value: 'Remix', label: 'Modern & Powerful (Remix)', description: 'Best for complex, feature-rich apps' },
    { value: 'Rails', label: 'Mature & Reliable (Rails)', description: 'Perfect for business applications' }
  ];

  const availableFeatures = [
    { value: 'GraphQL', label: 'Data Access (GraphQL)', description: 'Connect to store data like products, orders, and customers' },
    { value: 'Polaris', label: 'Professional Design (Polaris)', description: 'Use Shopify\'s design system for a polished look' },
    { value: 'App Bridge', label: 'Seamless Integration (App Bridge)', description: 'Make your app feel like part of Shopify' },
    { value: 'Webhooks', label: 'Real-time Updates (Webhooks)', description: 'Get notified when things happen in the store' },
    { value: 'OAuth', label: 'Secure Access (OAuth)', description: 'Safely connect to customer stores' }
  ];

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* App Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where will your app run?
          </label>
          <select
            value={formData.appType}
            onChange={(e) => setFormData(prev => ({ ...prev, appType: e.target.value }))}
            className="input-field"
          >
            {appTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {appTypes.find(t => t.value === formData.appType)?.description}
          </p>
        </div>

        {/* Framework */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What technology should we use?
          </label>
          <select
            value={formData.framework}
            onChange={(e) => setFormData(prev => ({ ...prev, framework: e.target.value }))}
            className="input-field"
          >
            {frameworks.map(framework => (
              <option key={framework.value} value={framework.value}>
                {framework.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {frameworks.find(f => f.value === formData.framework)?.description}
          </p>
        </div>

        {/* Features */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              What capabilities do you need?
            </label>
            <button
              type="button"
              onClick={() => {
                const defaults = {
                  appType: 'Admin App',
                  framework: 'Node.js',
                  features: ['OAuth', 'Polaris']
                };
                setFormData(prev => ({
                  ...prev,
                  appType: defaults.appType,
                  framework: defaults.framework,
                  features: defaults.features
                }));
              }}
              className="text-sm text-shopify-600 hover:text-shopify-700 font-medium transition-colors"
            >
              Pick defaults
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableFeatures.map(feature => (
              <label key={feature.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature.value)}
                  onChange={() => handleFeatureToggle(feature.value)}
                  className="h-4 w-4 text-shopify-600 focus:ring-shopify-500 border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your app idea
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you want your app to do. For example: 'I want to help store owners track their inventory better by showing low stock alerts and suggesting when to reorder products.'"
            rows={6}
            className="input-field resize-none"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !formData.description.trim()}
          className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Creating Your App...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Create My App
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AppForm; 