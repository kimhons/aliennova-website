# Vercel CLI Deployment Script for AlienNova.com

# This script automates the deployment of AlienNova.com to Vercel using the Vercel CLI
# It handles environment variable setup, project initialization, and deployment

#!/bin/bash

# Set up error handling
set -e
echo "Starting AlienNova.com deployment process..."

# Create .env.local file with all required environment variables
echo "Creating environment variables file..."
cat > .env.local << EOL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW5zcGlyZWQtZ2FyLTY4LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_l9a6SAa1eXZpIS6SIM0V540KFAFH4oqH6UPwf0zVek
OPENAI_API_KEY=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
ANTHROPIC_API_KEY=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
GOOGLE_AI_API_KEY=AIzaSyDYPL45FyFh48IOriMqnUk4SOw3rdh8ty8
REPLICATE_API_TOKEN=r8_OhDgcv4cgDF2Y5ehyVGtGTODNQtUITV0qYxOn
ELEVENLABS_API_KEY=sk_d902decf9f04f1c32295cfcc55e5a03e35712e7d39c5e22f
MISTRAL_API_KEY=KIFepQMw4bmX53hufPX8eFH1AweKbH7b
COHERE_API_KEY=exjSVKmCrZz1tHXNcaLI0awOD6AyNj54C4q90QSI
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
EOL

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to production directly with token (no login required)
echo "Deploying to production..."
vercel --prod --token $VERCEL_TOKEN --yes

# Verify deployment
echo "Verifying deployment..."
vercel ls --token $VERCEL_TOKEN

echo "Deployment complete! AlienNova.com is now live."
