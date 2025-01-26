# AI-Powered Investment Management Application

A modern web application that helps users manage their investments through AI-driven recommendations based on their risk profile and financial goals.

## Features

- 🔐 User Authentication (Sign up/Sign in)
- 📊 Financial Profiling Questionnaire
- 📈 Investment Dashboard
- 💰 Portfolio Management
- 🤖 AI-Driven Investment Recommendations

## Tech Stack

- **Frontend**:
  - React 18 with TypeScript
  - Vite for build tooling
  - Tailwind CSS for styling
  - shadcn/ui for UI components
  - Wouter for routing
  - @tanstack/react-query for API data management
  - React Context for global state management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── auth/     # Authentication related components
│   │   │   ├── dashboard/ # Dashboard specific components
│   │   │   ├── layout/   # Layout components (navbar, etc.)
│   │   │   └── ui/       # Base UI components from shadcn
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main application component
│   └── index.html        # HTML entry point
├── docs/                  # Documentation
└── theme.json            # Global theme configuration
```

For more detailed documentation, see:
- [Project Overview](./docs/PROJECT.md)
- [Development Guidelines](./docs/DEVELOPMENT.md)
- [Technical Documentation](./docs/TECHNICAL.md)

## Contributing

See our [Development Guidelines](./docs/DEVELOPMENT.md) for detailed instructions on:
- Code style and conventions
- Adding new features
- State management patterns
- Best practices