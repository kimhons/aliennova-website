# AlienNova.com Deployment Script

This script automates the deployment of AlienNova.com to Vercel using the Vercel CLI.

```bash
#!/bin/bash

# Set up error handling
set -e
echo "Starting AlienNova.com deployment process..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (will use VERCEL_TOKEN from environment)
echo "Logging in to Vercel..."
vercel login --token $VERCEL_TOKEN

# Navigate to project directory
cd /path/to/aliennova

# Link to existing project if it exists
echo "Linking to Vercel project..."
vercel link --token $VERCEL_TOKEN

# Deploy to production
echo "Deploying to production..."
vercel deploy --prod --token $VERCEL_TOKEN

# Verify deployment
echo "Verifying deployment..."
vercel ls --token $VERCEL_TOKEN

echo "Deployment complete! AlienNova.com is now live."
```

## Manual Deployment Steps

If you prefer to deploy manually through the Vercel dashboard:

1. Log in to your Vercel account
2. Click "Import Project"
3. Connect to your GitHub repository
4. Configure the project:
   - Framework preset: Next.js
   - Root directory: ./
   - Build command: npm run build
   - Output directory: .next
5. Configure environment variables from the API token requirements document
6. Deploy
7. Set up custom domain (aliennova.com) in the project settings

## Post-Deployment Verification

After deployment, verify:

1. The site is accessible at the deployment URL
2. Authentication flows work correctly
3. All API integrations function as expected
4. The custom domain is properly configured
5. HTTPS is enabled and working

## Rollback Procedure

If issues are encountered:

1. Go to the Vercel dashboard
2. Navigate to the Deployments tab
3. Find the last working deployment
4. Click the three dots menu
5. Select "Promote to Production"
