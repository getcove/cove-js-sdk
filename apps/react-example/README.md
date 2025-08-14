# @getcove/react-sdk Playground

A React playground app demonstrating the usage of the Cove React SDK with iframe integration.

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your Cove embed URL:
   ```env
   VITE_COVE_EMBED_URL=https://sandbox.cove.dev/s/your-session-id
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

## Environment Variables

- `VITE_COVE_EMBED_URL` - The URL for your Cove embed session (required)

## Features Demonstrated

- **CoveEmbed Component**: Shows how to integrate the Cove iframe component
- **Event Handling**: Demonstrates `onComplete` and `onMessage` callbacks
- **Environment Configuration**: Shows how to use environment variables for URLs
- **Error Handling**: Displays configuration errors when environment is not set up

## Building

```bash
pnpm build
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh