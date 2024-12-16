## Thomanbauerhütte Website - Hosting Requirements

### Deployment Script

#### Prerequisites
- Ensure you have `pnpm` installed
- Configure `deploy.sh` with your server details:
  ```bash
  # Edit these variables in deploy.sh
  SERVER_USER="your_username"
  SERVER_HOST="your_server_ip_or_domain"
  SERVER_PATH="/path/to/web/directory"
  ```

#### Usage
```bash
# Make script executable
chmod +x deploy.sh

# Deploy to server
./deploy.sh
```

#### What the Script Does
1. Validates required dependencies
2. Builds the project using `pnpm run build`
3. Copies `dist` contents to specified server
4. Copies additional files like `robots.txt` and `sitemap.xml`

#### Deployment Workflow
- Ensure SSH key-based authentication is set up
- Verify server path and permissions
- Run script from project root

### Troubleshooting
- Check SSH connectivity
- Verify server path exists
- Ensure correct file permissions
</boltArtifact>

I'll also make the script executable:

<boltArtifact id="make-script-executable" title="Make Deploy Script Executable">
<boltAction type="shell">
chmod +x deploy.sh
