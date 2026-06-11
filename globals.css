# HumanizeAI

Transform AI-generated text into natural, undetectable human writing — powered by **Llama 3.3 70B** via [Groq](https://groq.com).

## Features

- 🚀 Streaming output (text appears as it's generated)
- 4 writing modes: Standard, Academic, Casual, Professional
- 3 strength levels: Light, Balanced, Aggressive
- AI detection score on input & output
- Word count, sentence count, human score stats
- Fully responsive

---

## Setup

### 1. Get a Groq API Key (free)

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up / log in
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key

### 2. Run locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/humanize-ai.git
cd humanize-ai

# Install dependencies
npm install

# Set your API key
cp .env.example .env.local
# Edit .env.local and paste your Groq key:
# GROQ_API_KEY=gsk_...

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, then add your env var:
vercel env add GROQ_API_KEY
```

### Option B — Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Under **Environment Variables**, add:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_...your key...`
5. Click **Deploy**

That's it — Vercel auto-deploys on every push to `main`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| AI Model | Llama 3.3 70B (via Groq) |
| Hosting | Vercel |
| Styling | CSS Modules |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key (required) |
