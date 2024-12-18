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
