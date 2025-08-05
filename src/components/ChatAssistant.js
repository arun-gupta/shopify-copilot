import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Loader2, X } from 'lucide-react';

const ChatAssistant = ({ onApplyDefaults, onExplainFeature }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm here to help you build your Shopify app. Ask me anything about creating apps, what different options mean, or let me suggest the best choices for you. Try asking 'What's the difference between apps for store owners vs customers?' or 'Pick the best options for me'."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const knowledgeBase = {
    'graphql': {
      explanation: "Data Access (GraphQL) lets your app connect to store information like products, orders, and customers. It's like giving your app permission to read and update the store's data. You'll want this if your app needs to:\n• Show product information\n• Process orders\n• Manage customer data\n• Track inventory\n• Generate reports",
      whenToUse: "Choose Data Access when your app needs to work with store information like products, orders, or customer details."
    },
    'polaris': {
      explanation: "Professional Design (Polaris) uses Shopify's built-in design system to make your app look polished and familiar to store owners. Benefits:\n• Looks like part of Shopify\n• Professional appearance\n• Works on all devices\n• Easy to use\n• Consistent with other apps",
      whenToUse: "Choose Professional Design to make your app look professional and feel like a natural part of Shopify."
    },
    'app bridge': {
      explanation: "Seamless Integration (App Bridge) makes your app feel like it's built into Shopify itself. It provides:\n• Smooth navigation\n• Professional notifications\n• Easy file and image selection\n• Better user experience\n• Native Shopify feel",
      whenToUse: "Choose Seamless Integration to make your app feel like a natural part of the Shopify experience."
    },
    'webhooks': {
      explanation: "Real-time Updates (Webhooks) let your app know when things happen in the store. Your app can react to:\n• New orders being placed\n• Products being updated\n• New customers signing up\n• Inventory changes\n• Payment processing",
      whenToUse: "Choose Real-time Updates when you want your app to automatically respond to events in the store."
    },
    'oauth': {
      explanation: "Secure Access (OAuth) safely connects your app to customer stores. It:\n• Protects store data\n• Handles login securely\n• Manages permissions\n• Keeps everything safe\n• Required for most apps",
      whenToUse: "Choose Secure Access for any app that needs to connect to customer stores safely."
    }
  };

  const getDefaultRecommendations = () => {
    return {
      appType: 'Admin App',
      framework: 'Node.js',
      features: ['OAuth', 'Polaris'],
      explanation: "I've picked the best options for you:\n\n• **For Store Owners (Admin App)**: Help store owners manage their business\n• **Fast & Popular (Node.js)**: Great for beginners, lots of help available\n• **Secure Access (OAuth)**: Required to safely connect to stores\n• **Professional Design (Polaris)**: Makes your app look polished\n\nThese are perfect starting points for most apps!"
    };
  };

  const processUserMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific questions
    if (lowerMessage.includes('why') && lowerMessage.includes('graphql')) {
      return knowledgeBase.graphql.explanation;
    }
    
    if (lowerMessage.includes('why') && lowerMessage.includes('polaris')) {
      return knowledgeBase.polaris.explanation;
    }
    
    if (lowerMessage.includes('why') && lowerMessage.includes('app bridge')) {
      return knowledgeBase['app bridge'].explanation;
    }
    
    if (lowerMessage.includes('why') && lowerMessage.includes('webhook')) {
      return knowledgeBase.webhooks.explanation;
    }
    
    if (lowerMessage.includes('why') && lowerMessage.includes('oauth')) {
      return knowledgeBase.oauth.explanation;
    }
    
    if (lowerMessage.includes('pick default') || lowerMessage.includes('suggest') || lowerMessage.includes('recommend')) {
      const defaults = getDefaultRecommendations();
      onApplyDefaults(defaults);
      return defaults.explanation;
    }
    
    if (lowerMessage.includes('admin app') && lowerMessage.includes('storefront')) {
      return "**Apps for Store Owners vs Apps for Customers:**\n\n**For Store Owners**:\n• Runs in the store management dashboard\n• Helps store owners run their business\n• Can access store data and settings\n• Examples: inventory tracking, order management, analytics\n\n**For Customers**:\n• Runs on the shopping website\n• Enhances the customer shopping experience\n• Can modify product pages, cart, checkout\n• Examples: product recommendations, custom checkout fields, live chat";
    }
    
    if (lowerMessage.includes('node.js') && lowerMessage.includes('remix')) {
      return "**Technology Options:**\n\n**Fast & Popular (Node.js)**:\n• Great for beginners\n• Large community and help available\n• Good for most app types\n• Easy to learn and use\n\n**Modern & Powerful (Remix)**:\n• Best for complex apps\n• Built-in features for better performance\n• For experienced developers\n• Advanced capabilities\n\n**Mature & Reliable (Rails)**:\n• Perfect for business apps\n• Lots of built-in features\n• For complex applications\n• Proven and stable";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n\n• **Explaining features**: Ask 'Why do I need Data Access?' or 'What is Professional Design?'\n• **Comparing options**: 'Apps for store owners vs customers' or 'Technology options'\n• **Picking options**: Say 'Pick the best options for me' or 'Suggest choices'\n• **General guidance**: Ask about building Shopify apps\n\nJust ask me anything about creating your app!";
    }
    
    if (lowerMessage.includes('best practice') || lowerMessage.includes('recommendation')) {
      return "**Tips for Building Great Apps:**\n\n• **Start simple**: Begin with essential features, add more later\n• **Use Professional Design**: Makes your app look polished and familiar\n• **Include Secure Access**: Required for any app that connects to stores\n• **Handle errors well**: Always provide clear, helpful messages\n• **Test thoroughly**: Try your app with different store sizes\n• **Follow Shopify guidelines**: Check the Partner Dashboard for requirements\n• **Make it user-friendly**: Keep it simple for store owners to use";
    }
    
    if (lowerMessage.includes('getting started') || lowerMessage.includes('first app')) {
      return "**Getting Started with Your First App:**\n\n1. **Choose For Store Owners** - Easiest to start with\n2. **Pick Fast & Popular** - Great for beginners\n3. **Include Secure Access** - Required for safety\n4. **Add Professional Design** - Makes it look great\n5. **Start with a simple idea** - Like tracking inventory or managing orders\n\nOnce you create your app, you'll need to:\n• Set up a Shopify Partner account\n• Create an app in the Partner Dashboard\n• Configure your app's settings\n• Test with a development store\n\nWould you like me to pick the best options for you?";
    }
    
    // Default response for unrecognized questions
    return "I'm not sure about that specific question, but I can help you with:\n\n• Explaining app features (Data Access, Professional Design, etc.)\n• Comparing different app types and technologies\n• Suggesting the best options for your app\n• General guidance on building apps\n\nTry asking something like 'Why do I need Data Access?' or 'Pick the best options for me'!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botResponse = await processUserMessage(inputValue);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: botResponse
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-shopify-600" />
          <h3 className="font-semibold text-gray-900">App Assistant</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-shopify-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot className="h-4 w-4 text-shopify-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-shopify-600" />
                <div className="flex space-x-1">
                  <Loader2 className="h-3 w-3 text-gray-500 animate-spin" />
                  <span className="text-sm text-gray-500">Typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setInputValue('Pick the best options for me')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
          >
            Best options
          </button>
          <button
            onClick={() => setInputValue('Why do I need Data Access?')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
          >
            Data Access?
          </button>
          <button
            onClick={() => setInputValue('Admin App vs Storefront Extension')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
          >
            App types
          </button>
          <button
            onClick={() => setInputValue('What can you do?')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
          >
            Help
          </button>
          <button
            onClick={() => setInputValue('Getting started with my first app')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
          >
            First app
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about building your app..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shopify-500 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-shopify-600 hover:bg-shopify-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant; 