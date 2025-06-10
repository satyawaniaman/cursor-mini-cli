# AI Code Generator CLI

Transform your ideas into code with the power of AI! This CLI tool leverages GPT-4 to generate complete projects from simple descriptions.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your OPENAI_API_KEY to .env
```

### Usage

```bash
# Run the CLI tool
pnpm start

# Follow interactive prompts:
# 1. Describe your project
# 2. Choose output directory
# 3. Decide to run immediately
```

## ✨ Features

- **Context-Aware Generation**: Analyzes existing codebase for intelligent code creation
- **Multi-File Projects**: Generates complete project structures with all necessary files
- **Instant Preview**: Automatically sets up development server for immediate testing
- **Smart File Detection**: Supports HTML, CSS, JS, Python, JSON with intelligent parsing
- **Interactive CLI**: User-friendly prompts with real-time feedback

## 📁 Project Architecture

```
src/
├── cli/          # User interaction & workflow orchestration
├── core/         # Business logic & code generation
├── utils/        # Shared utilities & helpers
└── config/       # Application configuration
```

### Core Components

- **Code Generation Engine** (`src/core/codegen.js`): Interfaces with GPT-4, extracts files from AI responses
- **Context Analyzer** (`src/core/context.js`): Scans project structure, optimizes context for AI
- **File Manager** (`src/core/file.js`): Handles batch file creation and directory structure
- **Project Initializer** (`src/core/project-init.js`): Sets up package.json, installs dependencies

## 🎯 How It Works

1. **Context Analysis**: Scans current directory, excludes node_modules/.git, extracts relevant code
2. **AI Generation**: Constructs context-aware prompts, leverages GPT-4 for code creation
3. **File Extraction**: Parses AI responses, creates project files with proper structure
4. **Project Setup**: Generates package.json, installs dependencies, configures dev server

## 💡 Example Use Cases

- "Create a todo app with dark theme"
- "Build a calculator with modern UI"
- "Make a weather app that fetches data"
- "Generate a portfolio website"
- "Build a REST API with Express"
- "Make a React component library"

## 🔧 Configuration

### Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Customizable Settings

- **AI Model**: GPT-4 (configurable in `codegen.js`)
- **Context Limit**: 1000 characters per file
- **File Types**: HTML, CSS, JS, Python, JSON
- **Dev Server**: Live-server for instant preview

## 🛠️ Development

### Running in Development

```bash
pnpm dev
```

### Adding New Features

- **File Types**: Extend `extractFilesFromCode()` in `codegen.js`
- **Custom Prompts**: Modify system prompts in `codegen.js`
- **Enhanced Context**: Improve analysis in `context.js`

## 📦 Dependencies

### Production

- `chalk`: Terminal styling
- `dotenv`: Environment variables
- `inquirer`: Interactive prompts
- `openai`: OpenAI API client
- `ora`: Terminal spinners

### Development

- `live-server`: Development server

## 🚨 Troubleshooting

| Issue                | Solution                                      |
| -------------------- | --------------------------------------------- |
| OpenAI API Key Error | Ensure `.env` contains valid `OPENAI_API_KEY` |
| PNPM Not Found       | Install globally: `npm install -g pnpm`       |
| Permission Errors    | Check file permissions or run with sudo       |
| Network Issues       | Verify internet connection and API key        |

### Debug Mode

```javascript
// Add to CLI for detailed logging
console.log("Debug:", { context, response, files });
```

## 🔒 Security & Performance

### Security

- **API Key Protection**: Never commit `.env` files
- **Input Validation**: All user inputs are validated
- **Safe Operations**: Error handling for all file operations
- **Sandboxed Execution**: Generated code runs in isolated directories

### Performance Tips

- **Context Optimization**: Large projects may hit context limits
- **File Filtering**: Exclude unnecessary files from analysis
- **Batch Operations**: Generate related files in single requests
- **Caching**: Consider caching frequently used contexts

## 📊 Example Generated Projects

### Todo App

- Modern dark theme UI
- Add/delete functionality
- Responsive design
- Clean architecture

### Other Possibilities

- **Calculator**: Scientific with history
- **Weather App**: Real-time data with forecasts
- **Portfolio**: Personal showcase
- **Games**: Snake, Tetris, etc.
- **Dashboard**: Data visualization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and add tests
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit pull request

### Guidelines

- Follow existing code style
- Add comments for complex logic
- Test with various project types
- Update documentation

## 📄 License

ISC License - see LICENSE file for details

## 🔗 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [PNPM Documentation](https://pnpm.io)
- [Inquirer.js Documentation](https://github.com/SBoudrias/Inquirer.js)

---

Built with ❤️ by Aman Satyawani
