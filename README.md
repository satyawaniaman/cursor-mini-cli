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

## 💡 Example Use Cases

- "Create a todo app with dark theme"
- "Build a calculator with modern UI"
- "Make a weather app that fetches data"
- "Generate a portfolio website"
- "Build a REST API with Express"

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

## 📦 Dependencies

### Production

- `chalk`: Terminal styling
- `dotenv`: Environment variables
- `inquirer`: Interactive prompts
- `openai`: OpenAI API client
- `ora`: Terminal spinners

### Development

- `live-server`: Development server

Built with ❤️ by Aman Satyawani
