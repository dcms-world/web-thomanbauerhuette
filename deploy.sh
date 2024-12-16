#!/bin/bash

# Deploy script for Thomanbauerhütte website

# Configuration
SERVER_USER="your_username"
SERVER_HOST="your_server_ip_or_domain"
SERVER_PATH="/path/to/web/directory"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required environment variables are set
if [ -z "$SERVER_USER" ] || [ -z "$SERVER_HOST" ] || [ -z "$SERVER_PATH" ]; then
    echo -e "${RED}Error: Server configuration not set. Please edit deploy.sh with your server details.${NC}"
    exit 1
fi

# Function to log messages
log() {
    echo -e "${GREEN}$1${NC}"
}

# Validate dependencies
validate_dependencies() {
    for cmd in pnpm scp; do
        if ! command -v $cmd &> /dev/null; then
            echo -e "${RED}Error: $cmd is not installed${NC}"
            exit 1
        fi
    done
}

# Build the project
build_project() {
    log "🏗️  Building project..."
    pnpm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed${NC}"
        exit 1
    fi
}

# Copy files to server
deploy_to_server() {
    log "🚀 Deploying to server..."
    
    # Copy dist contents
    scp -r dist/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH"
    
    # Copy additional files if needed
    scp robots.txt "$SERVER_USER@$SERVER_HOST:$SERVER_PATH"
    scp sitemap.xml "$SERVER_USER@$SERVER_HOST:$SERVER_PATH"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Deployment failed${NC}"
        exit 1
    fi
}

# Main deployment process
main() {
    log "🌟 Starting Thomanbauerhütte Website Deployment 🌟"
    
    validate_dependencies
    build_project
    deploy_to_server
    
    log "✅ Deployment completed successfully!"
}

# Run the deployment
main
