# ShopifyGPT

A powerful web application that allows developers to generate custom Shopify app scaffolds using natural language and form inputs. Built with React, Tailwind CSS, and powered by multiple AI providers including GPT-4, Ollama, and Mistral.

## 🚀 Features

### MVP Features
- **Form-based App Configuration**: Define app type, framework, and features through an intuitive form
- **Natural Language Processing**: Describe your app idea in plain English
- **Multiple App Types**: Support for Admin Apps, Storefront Extensions, and Theme Apps
- **Framework Support**: Node.js, Remix, and Rails
- **Feature Selection**: Choose from GraphQL, Polaris, App Bridge, Webhooks, and OAuth
- **File Tree Navigation**: Browse generated files in a familiar IDE-like interface
- **Syntax Highlighting**: View code with proper syntax highlighting
- **Download as ZIP**: Export your generated app scaffold as a downloadable ZIP file

### Future Roadmap
- **Phase 1**: Explain Code - Get human-readable explanations of generated files
- **Phase 2**: Regenerate Individual Files - Update specific files without rebuilding the entire app
- **Phase 3**: Add New Features via Prompt - Dynamically add features through natural language
- **Phase 4**: Shopify API-Aware Generation - Integrate with Shopify's API schema for accuracy
- **Phase 5**: GitHub Integration - Push directly to GitHub repositories
- **Phase 6**: Blueprint Mode - Step-by-step wizard for guided app creation

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Icons**: Lucide React
- **Code Highlighting**: React Syntax Highlighter
- **File Compression**: JSZip
- **HTTP Client**: Axios
- **AI Integration**: OpenAI GPT-4 (planned)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopify-app-builder-copilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   The `.env` file is pre-configured for development with Ollama. No additional configuration needed!

   **Install Ollama (if not already installed):**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Download a model (Mistral is recommended)
   ollama pull mistral
   
   # Start Ollama server
   ollama serve
   ```
   
   **Default Development Setup:**
- Uses Ollama for local AI generation
- Falls back to mock responses if Ollama unavailable
- No API keys or additional configuration required
   
   

4. **Start the development server**
   ```bash
   npm start
   ```
   
   **That's it!** The app runs entirely in the browser with Ollama as the default AI provider.

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development

### Environment Variables

The application supports two modes of operation:

**Development Mode (Default):**
- Uses Ollama for local AI generation
- Falls back to mock responses if Ollama unavailable
- No API keys or configuration required
- Fast development and testing



**Environment Variables (Pre-configured):**
- `REACT_APP_LLM_PROVIDER=ollama` - Uses local Ollama AI
- `REACT_APP_OLLAMA_BASE_URL=http://localhost:11434` - Ollama server URL
- `REACT_APP_USE_MOCK_API=true` - Falls back to mock responses

**Optional (for testing other AI providers):**
- `REACT_APP_OPENAI_API_KEY` - For OpenAI API calls
- `REACT_APP_MISTRAL_API_KEY` - For Mistral AI API calls

### Project Structure
```
src/
├── components/          # React components
│   ├── AppForm.js      # Main form for app configuration
│   ├── CodeViewer.js   # Code display with syntax highlighting
│   └── FileTree.js     # File tree navigation
├── services/           # API and external services
│   └── api.js         # OpenAI API integration
├── App.js             # Main application component
├── index.js           # React entry point
└── index.css          # Global styles and Tailwind imports
```

### Available Scripts

- `npm start` - Start development server (frontend only)
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🤖 AI Providers

The app supports multiple AI providers for generating Shopify app scaffolds:

### **OpenAI**
- **Models**: GPT-4, GPT-3.5-turbo
- **Cost**: Pay-per-use API calls
- **Setup**: Requires OpenAI API key
- **Best for**: Production apps, high-quality code generation

### **Ollama (Local AI)**
- **Models**: Mistral, Llama2, CodeLlama, Neural Chat
- **Cost**: Free (runs locally)
- **Setup**: Install Ollama and download models
- **Best for**: Development, privacy-conscious users, offline use
- **Default**: Set as default provider for development

### **Mistral AI**
- **Models**: Mistral Large, Medium, Small
- **Cost**: Pay-per-use API calls
- **Setup**: Requires Mistral API key
- **Best for**: Cost-effective cloud AI, European data residency

### **Provider Selection**
Set `REACT_APP_LLM_PROVIDER=openai|ollama|mistral` in your `.env` file to choose your preferred provider. **Ollama is the default for development.**

## 🎯 Usage

1. **Fill out the form** with your app requirements:
   - Select app type (Admin App, Storefront Extension, Theme App)
   - Choose framework (Node.js, Remix, Rails)
   - Select features (GraphQL, Polaris, App Bridge, Webhooks, OAuth)
   - Describe your app idea in detail

2. **Generate your app** by clicking the "Generate App" button

3. **Browse the generated files** using the file tree on the left

4. **View code** by clicking on files in the tree

5. **Download your app** as a ZIP file using the download button

## 🔮 Future Enhancements

### Phase 1: Explain Code
- Click on any file to get a human-readable explanation
- Understand the purpose and functionality of each component

### Phase 2: Regenerate Individual Files
- Update feature selections for specific files
- Regenerate only changed files without rebuilding the entire app

### Phase 3: Add New Features via Prompt
- Type natural language requests like "Add a webhook for product deletion"
- Dynamically inject new files or modify existing ones

### Phase 4: Shopify API-Aware Generation
- Integrate Shopify's GraphQL and REST API schemas
- Ensure generated code follows Shopify best practices
- Reduce hallucinations and improve accuracy

### Phase 5: GitHub Integration
- OAuth integration with GitHub
- Push generated code directly to new private repositories
- Open in GitHub Codespaces or StackBlitz

### Phase 6: Blueprint Mode
- Step-by-step wizard interface
- Guided app creation based on goals and target users
- Pre-built templates and patterns



## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Code highlighting with [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team. 