## Thomanbauerhütte Website - Hosting Requirements

### Prerequisites
- Node.js (v18+)
- pnpm package manager

### Setup

1. Clone the repository
2. Copy `.env-example` to `.env` and fill in your configuration
   ```bash
   cp .env-example .env
   ```

3. Install dependencies
   ```bash
   pnpm install
   ```

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build
```

### Configuration Requirements
- Configure SMTP settings in `.env`
- Set up reCAPTCHA keys in `.env`
  - Get keys from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

### Deployment Script
```bash
# Make script executable
chmod +x deploy.sh

# Deploy to server
./deploy.sh
```

#### Deployment Workflow
- Ensure SSH key-based authentication is set up
- Verify server path and permissions
- Run script from project root

### Troubleshooting
- Check SSH connectivity
- Verify server path exists
- Ensure correct file permissions

### Domain
- Primary Domain: https://huette.thomanbauer.at/

### Videos
```
ffmpeg -i input.mov -vcodec libx264 -crf 30 -preset veryslow -an -movflags +faststart output.mp4
```
Parametererklärung:
	•	-vcodec libx264: Verwendet den H.264 Codec.
	•	-crf 30: Höhere Zahl = stärkere Komprimierung (Standard: 23, höhere Werte = kleinere Dateien).
	•	-preset veryslow: Maximale Kompression auf Kosten der Geschwindigkeit.
	•	-an: Kein Audio.
	•	-movflags +faststart: Optimiert die Datei für das Streaming.

