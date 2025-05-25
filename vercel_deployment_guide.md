# AlienNova.com Vercel Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository with AlienNova.com code
- All API tokens and environment variables
- Custom domain (optional)

## Deployment Steps

### 1. Prepare the Repository
- Ensure all code is committed to the GitHub repository
- Verify that `.env.local` is added to `.gitignore`
- Create a `vercel.json` configuration file if needed

### 2. Connect to Vercel
- Log in to Vercel dashboard
- Click "Add New" > "Project"
- Import the GitHub repository
- Select the appropriate framework preset (Next.js)

### 3. Configure Environment Variables
- Add all required environment variables in Vercel project settings:
  - `GITHUB_TOKEN`
  - `VERCEL_TOKEN`
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `OPENAI_API_KEY`
  - `ANTHROPIC_API_KEY`
  - `GOOGLE_AI_API_KEY`
  - `REPLICATE_API_TOKEN`
  - `ELEVENLABS_API_KEY`
  - `MISTRAL_API_KEY`
  - `COHERE_API_KEY`
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

### 4. Configure Build Settings
- Framework preset: Next.js
- Build command: `next build`
- Output directory: `.next`
- Install command: `npm install`
- Node.js version: 18.x (or latest LTS)

### 5. Deploy the Project
- Click "Deploy"
- Monitor the build and deployment logs
- Verify successful deployment

### 6. Custom Domain Setup
- Go to project settings > Domains
- Add your custom domain (e.g., aliennova.com)
- Follow the DNS configuration instructions
- Verify domain ownership
- Enable HTTPS

### 7. Post-Deployment Verification
- Test all features on the live site
- Verify authentication flows
- Test API integrations
- Check responsive design on multiple devices
- Verify custom domain and HTTPS

### 8. Continuous Deployment Setup
- Configure automatic deployments on GitHub push
- Set up preview deployments for pull requests
- Configure deployment protection rules if needed

### 9. Monitoring and Analytics
- Set up Vercel Analytics
- Configure error monitoring
- Set up performance monitoring
- Enable real-time logs

### 10. Backup and Recovery
- Document deployment configuration
- Set up scheduled backups if needed
- Document rollback procedures

## Troubleshooting Common Issues

### Build Failures
- Check build logs for specific errors
- Verify all dependencies are correctly installed
- Check for environment variable issues

### API Integration Issues
- Verify API keys are correctly set in environment variables
- Check CORS configuration if needed
- Verify API rate limits

### Authentication Problems
- Check Clerk configuration
- Verify redirect URLs are correctly set
- Test authentication flow end-to-end

### Performance Issues
- Enable Vercel Edge Functions where appropriate
- Configure caching strategies
- Optimize image loading and processing

## Post-Deployment Checklist
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] StarTalk chat functions with all models
- [ ] NebulaWrite generates content correctly
- [ ] GalaxyArt generates images correctly
- [ ] Learn Hub displays all content
- [ ] Custom domain resolves correctly
- [ ] HTTPS is enabled and working
- [ ] Analytics are capturing data
- [ ] Error monitoring is active
