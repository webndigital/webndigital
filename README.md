# WebnDigital

Modern and professional website for WebnDigital - AI Solutions & Digital Transformation Company.

## 🚀 Tech Stack

- **Framework**: Astro 4.16 (Hybrid Mode)
- **Deployment**: Vercel (Serverless)
- **AI**: OpenAI GPT-3.5 for smart FAQ routing
- **Email**: Nodemailer for contact form
- **Styling**: Custom CSS with responsive design

## 📦 Installation

```bash
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Key for AI-powered FAQ
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-...

# Email Configuration for contact form
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Getting OpenAI API Key:

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and add it to `.env`

### Gmail App Password (for contact form):

1. Enable 2-Step Verification on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an app password for "Mail"
4. Use this 16-character password in `.env`

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deployment on Vercel

1. Push your code to GitHub
2. Import the project on Vercel
3. Add environment variables in Vercel Dashboard:
   - `OPENAI_API_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
4. Deploy!

### Important Vercel Settings:

- **Framework**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `.vercel/output`
- **Install Command**: `npm install`

## 📁 Project Structure

```
/
├── public/
│   ├── images/          # Static images
│   ├── favicon.ico/     # Favicon files
│   └── ...
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page routes
│   │   ├── api/         # API endpoints (serverless)
│   │   └── ...
│   ├── content/         # Blog posts (JSON)
│   ├── data/            # Content data
│   └── styles/          # Global styles
├── astro.config.mjs     # Astro configuration
└── package.json
```

## ✨ Features

- 🤖 AI-powered FAQ with smart routing
- 📱 Fully responsive mobile design
- 🎨 Modern and professional UI/UX
- 📧 Contact form with email integration
- 📝 Blog system with SEO optimization
- 🔍 SEO-friendly with meta tags and JSON-LD
- ⚡ Fast loading with static pre-rendering
- 🌐 Hybrid rendering (static pages + serverless API)

## 📄 License

© 2025 WebnDigital. All rights reserved.
