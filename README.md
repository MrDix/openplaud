# OpenPlaud 🎙️

**Self-hosted AI transcription interface for Plaud Note devices**

Replace Plaud's $20/month AI subscription with your own OpenAI-compatible API keys.

![OpenPlaud](https://img.shields.io/badge/status-production--ready-brightgreen) ![License](https://img.shields.io/badge/license-AGPL--3.0-blue)

## ✨ Features

- 🔐 **Self-Hosted** - Full control over your data and API keys
- 🌐 **Universal AI Support** - Works with ANY OpenAI-compatible API (OpenAI, Groq, Together AI, OpenRouter, LM Studio, Ollama, etc.)
- 🎤 **Browser Transcription** - Optional client-side transcription using Transformers.js (no API costs!)
- 💾 **Flexible Storage** - Local filesystem OR S3-compatible (AWS S3, Cloudflare R2, MinIO, DigitalOcean Spaces, Wasabi)
- 🔄 **Auto-Sync** - Automatically download and sync recordings from Plaud devices with configurable intervals
- 📧 **Notifications** - Browser and email notifications for new recordings
- 🤖 **AI Title Generation** - Automatically generate descriptive titles from transcriptions
- 📤 **Export & Backup** - Export recordings in multiple formats (JSON, TXT, SRT, VTT) and create backups
- 🎯 **Zero-Config Deployment** - One command with Docker Compose
- 🔒 **Encrypted Credentials** - AES-256-GCM encryption for all sensitive data
- 🎓 **Onboarding Flow** - Guided setup for new users

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Plaud Note device with account at plaud.ai
- OpenAI API key (or any OpenAI-compatible provider)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/openplaud/openplaud.git
cd openplaud
```

2. **Generate encryption keys**
```bash
# Generate BETTER_AUTH_SECRET
openssl rand -hex 32

# Generate ENCRYPTION_KEY
openssl rand -hex 32
```

3. **Create .env file**
```bash
cp .env.example .env
```

Edit `.env` and add your keys:
```env
# Required
BETTER_AUTH_SECRET=<your-generated-secret>
ENCRYPTION_KEY=<your-generated-key>
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@db:5432/openplaud

# Optional - Email notifications (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@example.com

# Optional - Storage defaults
DEFAULT_STORAGE_TYPE=local
LOCAL_STORAGE_PATH=./storage
```

4. **Start the application**
```bash
docker compose up -d
```

5. **Access OpenPlaud**
Open http://localhost:3000 and create your account!

## 📖 Configuration Guide

### Getting Your Plaud Bearer Token

1. Go to [plaud.ai](https://plaud.ai) and log in
2. Open DevTools (F12) → **Network** tab
3. Refresh the page
4. Find any request to `api.plaud.ai`
5. Copy the **Authorization** header value (starts with "Bearer ")

### Storage Options

#### Local Filesystem (Default)
Recordings are stored in Docker volume `/app/audio`. No additional configuration needed.

#### S3-Compatible Storage

OpenPlaud supports ANY S3-compatible service:

**AWS S3**
```
Endpoint: (leave blank)
Bucket: your-bucket-name
Region: us-east-1
Access Key ID: YOUR_KEY
Secret Access Key: YOUR_SECRET
```

**Cloudflare R2**
```
Endpoint: https://<account-id>.r2.cloudflarestorage.com
Bucket: openplaud
Region: auto
Access Key ID: YOUR_KEY
Secret Access Key: YOUR_SECRET
```

**MinIO**
```
Endpoint: http://minio:9000
Bucket: openplaud
Region: us-east-1
Access Key ID: minioadmin
Secret Access Key: minioadmin
```

### AI Provider Setup

OpenPlaud uses the OpenAI SDK with custom `baseURL` support, making it compatible with **any** OpenAI-compatible API:

#### OpenAI (Official)
- **Base URL**: (leave blank)
- **API Key**: Your OpenAI key
- **Model**: `whisper-1`, `gpt-4o`, etc.

#### Groq (Free Whisper API!)
- **Base URL**: `https://api.groq.com/openai/v1`
- **API Key**: Your Groq key
- **Model**: `whisper-large-v3`

#### Together AI
- **Base URL**: `https://api.together.xyz/v1`
- **API Key**: Your Together AI key
- **Model**: `whisper-large-v3`, `meta-llama/Llama-3-70b-chat-hf`

#### OpenRouter (Access to Claude, GPT-4, Llama)
- **Base URL**: `https://openrouter.ai/api/v1`
- **API Key**: Your OpenRouter key
- **Model**: `anthropic/claude-3.5-sonnet`, `openai/gpt-4-turbo`

#### LM Studio (Local Models)
- **Base URL**: `http://localhost:1234/v1`
- **API Key**: `lm-studio`
- **Model**: Name of your loaded model

#### Ollama (Local Models)
- **Base URL**: `http://localhost:11434/v1`
- **API Key**: `ollama`
- **Model**: `whisper`, `llama3`, etc.

### Browser-Based Transcription (Free!)

OpenPlaud also supports client-side transcription using Transformers.js, running Whisper models directly in your browser:

- **No API costs** - Runs entirely in the browser
- **Privacy-first** - Audio never leaves your device
- **Models**: `whisper-tiny`, `whisper-base`, `whisper-small`
- **Auto-detected** - Automatically available when using the transcription feature

Note: Browser transcription is slower than server-side but completely free and private.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: PostgreSQL + Drizzle ORM + Better Auth
- **Storage**: Local filesystem OR S3-compatible (AWS S3, R2, MinIO, etc.)
- **AI**: OpenAI SDK (universal OpenAI-compatible support) + Transformers.js (browser transcription)
- **Audio**: Wavesurfer.js for waveform visualization
- **Email**: React Email + Nodemailer for notifications
- **Deployment**: Docker + Docker Compose

### Database Schema
- `users` & `sessions` - Authentication (Better Auth)
- `plaud_connections` - Encrypted Plaud bearer tokens
- `plaud_devices` - Connected Plaud devices
- `recordings` - Recording metadata + storage paths
- `transcriptions` - AI-generated transcriptions (server or browser-based)
- `ai_enhancements` - Summaries, action items, key points
- `api_credentials` - Encrypted AI API keys (supports multiple providers)
- `storage_config` - User storage preferences (local/S3)
- `user_settings` - Comprehensive user preferences (sync, notifications, playback, export, etc.)

### Security
- **AES-256-GCM** encryption for all sensitive data
- **Better Auth** for secure authentication
- **PostgreSQL** for data persistence
- **Docker** for isolated deployment

## 🎨 UI Components

OpenPlaud features a modern hardware-inspired design with clean aesthetics:

- **Modern cards and panels** with subtle shadows and borders
- **Rotary knobs** with draggable 360° rotation and LED ring indicators
- **LED indicators** with animated glow effects
- **Hardware rack modules** with mounting holes for authentic audio equipment feel
- **Waveform display** for playback (Wavesurfer.js)
- **Clean, minimal interface** with dark theme support
- **Onboarding dialog** for guided setup

## 🔧 Development

### Local Development

```bash
# Install dependencies
pnpm install

# Setup database
createdb openplaud
pnpm db:migrate

# Start dev server
pnpm dev
```

### Database Commands

```bash
# Generate migration
pnpm db:generate

# Apply migration
bun db:migrate

# Open Drizzle Studio
pnpm db:studio
```

### Plaud Integration Tests

Live Plaud API smoke tests are opt-in to avoid leaking credentials or exhausting rate limits.

```bash
export PLAUD_BEARER_TOKEN="Bearer eyJhbGciOi..."
bun test src/tests/plaud.integration.test.ts
```

Only the integration spec runs against the real service; the rest of the suite keeps using mocked fetch calls. Leave the env var unset in CI so those tests stay skipped.

## 📊 API Routes

### Authentication
- `POST /api/auth/sign-up` - Create account
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout

### Plaud Integration
- `POST /api/plaud/connect` - Connect Plaud device
- `GET /api/plaud/connection` - Check connection status
- `POST /api/plaud/sync` - Manual sync recordings

### Recordings
- `GET /api/recordings` - List all recordings
- `GET /api/recordings/[id]` - Get recording details
- `GET /api/recordings/[id]/audio` - Stream audio file
- `POST /api/recordings/[id]/transcribe` - Transcribe recording

### Settings
- `GET /api/settings/user` - Get user settings
- `PUT /api/settings/user` - Update user settings
- `PUT /api/settings/storage` - Configure storage
- `GET /api/settings/ai/providers` - List AI providers
- `POST /api/settings/ai/providers` - Add AI provider
- `PUT /api/settings/ai/providers/[id]` - Update AI provider
- `DELETE /api/settings/ai/providers/[id]` - Delete AI provider

### Export & Backup
- `GET /api/export?format=json|txt|srt|vtt` - Export recordings
- `POST /api/backup` - Create backup of all user data

### Health
- `GET /api/health` - Health check endpoint

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.

## 📝 License

AGPL-3.0 License – see LICENSE file for details

---

Originally created by Perier. Now developed and maintained by the OpenPlaud community.

Made with ❤️ for Plaud Note users who want full control over their transcriptions.
