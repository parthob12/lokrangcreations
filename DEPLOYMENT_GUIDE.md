# React + Vite GitHub Pages Deployment Guide

## Complete Step-by-Step Implementation Reference

This guide documents the complete process of deploying a React + Vite project to GitHub Pages, including all the fixes and configurations we implemented.

---

## 🚀 Project Overview

- **Project**: lokrangcreations (React + Vite website)
- **Repository**: https://github.com/parthob12/lokrangcreations.git
- **Deployed URL**: https://parthob12.github.io/lokrangcreations/
- **Tech Stack**: React, Vite, Tailwind CSS, GitHub Pages

---

## 📋 Prerequisites

- Node.js and npm installed
- Git repository set up on GitHub
- GitHub Pages enabled in repository settings

---

## 🔧 Step 1: Project Setup and Configuration

### 1.1 Vite Configuration (`vite.config.js`)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/lokrangcreations/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
```

**Key Points:**

- Base path set to `/lokrangcreations/` for production (matches repo name)
- Base path set to `/` for development
- This ensures correct asset loading in both environments

### 1.2 Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && git add . && git commit -m 'Deploy' && git push"
  }
}
```

---

## 🎨 Step 2: Tailwind CSS Integration

### 2.1 Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2.2 Initialize Tailwind

```bash
npx tailwindcss init -p
```

### 2.3 Configure Tailwind (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2.4 PostCSS Configuration (`postcss.config.js`)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 2.5 Import Tailwind in CSS (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2.6 Import CSS in React Entry (`src/main.jsx`)

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import Tailwind CSS here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 📄 Step 3: HTML Configuration

### 3.1 Index.html Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lokrang Creations</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Critical Points:**

- Reference source files (`/src/main.jsx`) not built files
- Vite will automatically replace with built files during production
- No direct CSS links in HTML (import in React instead)

---

## 🖼️ Step 4: Asset Path Management

### 4.1 Image Paths in React Components

```javascript
// ✅ Correct way - use base path for production
const imagePath = import.meta.env.PROD
  ? "/lokrangcreations/images/logo.png"
  : "/images/logo.png";

// ✅ Alternative - use relative paths
<img src="./images/logo.png" alt="Logo" />;

// ✅ Using Vite's asset handling
import logo from "./assets/logo.png";
<img src={logo} alt="Logo" />;
```

### 4.2 Public Assets

- Place static assets in `public/` folder
- Reference with absolute paths: `/images/logo.png`
- Vite will handle base path automatically

---

## 🔄 Step 5: Build and Deployment Process

### 5.1 Build the Project

```bash
npm run build
```

**What this does:**

- Creates `dist/` folder with optimized files
- Bundles all assets with correct paths
- Generates production-ready files

### 5.2 Preview Locally (Optional)

```bash
npm run preview
```

- Serves the built files locally
- Tests production build before deployment

### 5.3 Deploy to GitHub Pages

#### Option A: Manual Deployment

```bash
# Build the project
npm run build

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
git push origin main
```

#### Option B: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## ⚙️ Step 6: GitHub Repository Settings

### 6.1 Enable GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions" (if using workflow) or "Deploy from a branch"
4. If using branch deployment, select `gh-pages` branch and `/ (root)` folder

### 6.2 Repository Settings

- Ensure repository is public (for free GitHub Pages)
- Check that GitHub Pages is enabled
- Verify the correct branch is selected for deployment

---

## 🐛 Step 7: Common Issues and Fixes

### 7.1 404 Errors on Assets

**Problem**: Images/CSS/JS not loading
**Solution**:

- Check base path in `vite.config.js`
- Ensure asset paths use correct base path
- Verify files exist in correct locations

### 7.2 MIME Type Errors

**Problem**: `.jsx` files being served as text
**Solution**:

- Reference source files in `index.html`, not built files
- Let Vite handle file replacement during build

### 7.3 Build Failures

**Problem**: CommonJS `require` in ES modules
**Solution**:

- Convert scripts to ES modules
- Use `import/export` instead of `require/module.exports`

### 7.4 Large File Warnings

**Problem**: Files too large for GitHub
**Solution**:

- Use Git LFS for large assets
- Optimize images and assets
- Consider CDN for large files

### 7.5 Port Conflicts

**Problem**: Development server port already in use
**Solution**:

```bash
# Kill processes on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

---

## 🧪 Step 8: Testing and Verification

### 8.1 Local Development

```bash
npm run dev
```

- Starts development server
- Hot reload enabled
- Uses `/` base path

### 8.2 Production Preview

```bash
npm run build
npm run preview
```

- Tests production build locally
- Uses correct base paths

### 8.3 Deployment Verification

1. Check GitHub Actions (if using workflow)
2. Verify files in `gh-pages` branch
3. Test deployed site functionality
4. Check browser console for errors

---

## 📁 Step 9: File Structure Reference

```
lokrangcreations/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── images/
│   └── vite.svg
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── dist/          # Built files (generated)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🔍 Step 10: Troubleshooting Checklist

- [ ] Base path correctly set in `vite.config.js`
- [ ] All asset paths use correct base path
- [ ] Tailwind CSS properly imported in React
- [ ] No direct CSS links in `index.html`
- [ ] Source files referenced in `index.html` (not built files)
- [ ] Build completes without errors
- [ ] GitHub Pages enabled in repository settings
- [ ] Correct branch selected for deployment
- [ ] No large files causing GitHub warnings
- [ ] All dependencies properly installed

---

## 🎯 Key Takeaways

1. **Base Path is Critical**: Must match repository name for GitHub Pages
2. **Asset Management**: Use relative paths or correct base paths
3. **Build Process**: Let Vite handle file replacement and optimization
4. **CSS Integration**: Import styles in React, not directly in HTML
5. **Testing**: Always test both development and production builds
6. **Deployment**: Use GitHub Actions for automated deployment

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify all configuration files
3. Test locally with `npm run preview`
4. Check GitHub Actions logs
5. Verify repository settings

---

_This guide covers the complete deployment process we implemented for the lokrangcreations project. Use it as a reference for future deployments or troubleshooting._
