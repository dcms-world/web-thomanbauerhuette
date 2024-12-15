## Thomanbauerhütte Website - Hosting Requirements

### Minimum Requirements
- Node.js 18.0.0 or higher
- PNPM 8.0.0 or higher
- 512MB RAM minimum
- 1GB storage space

### Build Setup
```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build
```

The production build will be created in the `dist` directory.

### bolt.diy Integration and Deployment

#### Local Development with bolt.diy
1. Ensure you have bolt.diy installed globally
2. Clone the repository
3. Navigate to the project directory
4. Run `bolt import` to set up the project

#### Server Deployment Strategy

##### Option 1: Static Hosting (Recommended)
- The website is completely static
- Upload contents of `dist` directory to your web server
- Recommended providers: Netlify, Vercel, or any static file hosting

##### Option 2: Server with Node.js Runtime

###### Deployment Steps
1. Clone repository on server
2. Install PNPM globally:
   ```bash
   npm install -g pnpm
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Build the project:
   ```bash
   pnpm run build
   ```

5. Serve static files from `dist` directory
   - Use Nginx/Apache to serve static files
   - Configure server to redirect all routes to `index.html` for SPA routing

###### Example Nginx Configuration
```nginx
server {
    listen 80;
    server_name thomanbauerhuette.at www.thomanbauerhuette.at;

    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

###### Automated Deployment Script (Optional)
Create a `deploy.sh` script on your server:
```bash
#!/bin/bash
cd /path/to/your/project
git pull origin main
pnpm install
pnpm run build
# Restart web server if necessary
sudo systemctl restart nginx
```

#### bolt.diy Specific Notes
- If you're using bolt.diy and want to reimport:
  1. Ensure you're in the project root
  2. Run `bolt export` to save current state
  3. Run `bolt import` to recreate project structure
  4. Verify all configurations are intact

### Performance Considerations
- Images are optimized
- Assets are pre-compressed
- JavaScript is bundled and minified
- CSS is purged and minified

### Troubleshooting
- Ensure Node.js and PNPM versions match requirements
- Clear build cache: `pnpm run clean`
- Verify all environment variables are set correctly

### Security
- Always use HTTPS
- Keep dependencies updated
- Implement proper CORS and security headers
