# WebnDigital - Digital Agency Website

A modern, multi-page digital agency website built with Astro, featuring AI solutions, custom cursor effects, and a dynamic blog system.

## 🚀 Features

- **Multi-page Architecture**: Home, Services, Portfolio, Blog, Contact
- **Static Site Generation (SSG)**: Blazing fast performance
- **Blog System**: Local JSON-based blog with dynamic routing
- **Custom Cursor Effects**: Smooth, interactive cursor animations
- **FAQ Widget**: Expandable "How can we help you?" panel
- **Contact Form**: Gmail SMTP integration
- **SEO Optimized**: Meta tags, Open Graph, sitemap, JSON-LD schema
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Type-safe development

## 📁 Project Structure

```
/
├── public/
│   ├── images/          # Static images
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── content/         # Blog posts (JSON)
│   ├── utils/           # Utility functions
│   ├── CursorRules/     # Custom cursor effects
│   └── styles/          # Global styles
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Astro 4.x
- **Language**: TypeScript
- **Styling**: CSS (with custom properties)
- **Email**: Nodemailer (Gmail SMTP)
- **Fonts**: IBM Plex Sans, EB Garamond

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Configure Gmail SMTP credentials
3. Update `astro.config.mjs` with your domain

## 📝 Content Management

### Adding Blog Posts

Create JSON files in `src/content/blog/`:

```json
{
  "slug": "post-slug",
  "title": "Post Title",
  "excerpt": "Short description...",
  "date": "2024-10-07",
  "author": "Author Name",
  "image": "/images/blog/post-image.jpg",
  "content": "Full content in markdown or HTML..."
}
```

## 🎨 Design System

Based on Figma design with:
- Gradient: `linear-gradient(0deg, #32C5FF 0%, #6236FF 65%)`
- Primary: `#0091FF`
- Accent: `#3B43F2`
- Typography: IBM Plex Sans + EB Garamond

## 📄 License

All rights reserved © 2024 WebnDigital
