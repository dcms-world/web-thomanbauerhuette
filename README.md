## Thomanbauerhütte Website - Hosting Requirements

### Minimum Requirements
- Node.js 18.0.0 or higher
- NPM 8.0.0 or higher
- 512MB RAM minimum
- 1GB storage space

### Build Setup
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The production build will be created in the `dist` directory.

### Hosting Options

1. **Static Hosting (Recommended)**
   - The built website is completely static and can be hosted on any web server
   - Recommended providers: Netlify, Vercel, or any static file hosting
   - Simply upload the contents of the `dist` directory

2. **Server Requirements**
   - Any standard web server (Apache, Nginx, etc.)
   - HTTPS certificate (recommended for security)
   - Basic configuration for serving static files
   - URL rewriting for SPA support

### Basic Nginx Configuration
```nginx
server {
    listen 80;
    server_name thomanbauerhuette.at www.thomanbauerhuette.at;

    root /path/to/dist;
    index index.html;

    # SPA URL rewriting
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Contact Form Setup
The contact form currently logs to console. To make it functional, you'll need to:
1. Set up a server endpoint to receive form submissions
2. Configure email sending (SMTP server)
3. Add CORS and security headers

### Environment Variables
No environment variables are required for basic operation.

### Performance Optimizations
- Images are served from Unsplash and are already optimized
- Assets are pre-compressed during build
- JavaScript is bundled and minified
- CSS is purged and minified
