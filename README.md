# Shopify App Builder Copilot

A powerful web application that allows developers to generate custom Shopify app scaffolds using natural language and form inputs. Built with React, Tailwind CSS, and powered by GPT-4.

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
   Edit `.env` and add your OpenAI API key (optional for development)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development

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

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Code highlighting with [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team. 