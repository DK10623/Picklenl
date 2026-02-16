# GitHub Pages Configuration Guide

## Problem

The PickleNL website is showing a 404 error or a configuration page because **GitHub Pages is not configured to use GitHub Actions as the deployment source**.

## Root Cause

When a repository uses GitHub Actions to build and deploy to GitHub Pages (as this site does), GitHub Pages must be explicitly configured in the repository settings to accept deployments from Actions. Without this configuration:

- GitHub Pages tries to serve files from the `main` branch root directory
- The built site exists only in the `_site/` directory (created during the build)
- The root has only a placeholder `index.html` explaining the configuration needed
- Result: Users see either a 404 or the configuration guide

## Solution

### One-Time Configuration (Takes 30 seconds)

1. **Go to Repository Settings**
   - Navigate to: https://github.com/DK10623/Picklenl/settings/pages

2. **Configure Build Source**
   - Under **"Build and deployment"** section
   - Find **"Source"** dropdown
   - Select **"GitHub Actions"**
   - GitHub will automatically save this setting

3. **Wait for Deployment**
   - The next push to `main` will trigger automatic deployment
   - Or manually trigger: Go to **Actions** → **"Build and Deploy to GitHub Pages"** → **"Run workflow"**
   - Site will be live at **www.picklenl.com** within 1-2 minutes

### Why This Configuration Is Needed

GitHub Pages offers two deployment methods:

1. **Branch-based deployment** (default):
   - Serves static files directly from a branch (usually `main` or `gh-pages`)
   - Simple, but no build process

2. **GitHub Actions deployment** (our choice):
   - Runs a build workflow (Eleventy in our case)
   - Fetches RSS feeds, generates pages dynamically
   - Deploys the built site from the `_site/` directory
   - **Requires manual configuration** (this step)

## Current Status

✅ **Build Workflow**: Working perfectly
- `.github/workflows/deploy.yml` is configured correctly
- Site builds successfully with Eleventy
- Artifacts are created and ready to deploy

✅ **Site Code**: Ready to go
- All pages (home, newsletter, events, tips) are built
- RSS aggregation is working
- Custom domain (www.picklenl.com) is configured via CNAME

❌ **GitHub Pages Source**: Not configured
- Needs to be set to "GitHub Actions" in settings
- **This is the only thing preventing the site from working**

## After Configuration

Once GitHub Pages is set to use GitHub Actions:

1. **Automatic deployments** on every push to `main`
2. **Site will be live** at:
   - https://www.picklenl.com/ (Homepage)
   - https://www.picklenl.com/newsletter/ (Newsletter)
   - https://www.picklenl.com/events/ (Events)
   - https://www.picklenl.com/tips/ (Tips)
   - https://www.picklenl.com/rss.xml (RSS Feed)

3. **No manual intervention needed** for future updates

## Troubleshooting

### Site Still Shows 404 After Configuration

1. **Wait 2-3 minutes** for deployment to complete
2. **Check Actions tab** for workflow status
3. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)
4. **Verify configuration**: Settings → Pages → Source should be "GitHub Actions"

### Workflow Fails

1. Check the **Actions** tab for error details
2. Common issues:
   - npm dependencies: Usually resolves on retry
   - RSS feed timeouts: Non-critical, site still deploys
3. Re-run the workflow if needed

### Custom Domain Not Working

1. Verify `CNAME` file exists in repository root
2. Check DNS settings point to GitHub Pages:
   - CNAME: `www.picklenl.com` → `dk10623.github.io`
3. Wait 24-48 hours for DNS propagation (first time only)

## Technical Details

### Deployment Workflow

```yaml
# .github/workflows/deploy.yml

on:
  push:
    branches: [ main ]  # Triggers on push to main

jobs:
  build:
    - Install Node.js and dependencies
    - Build site with Eleventy (npm run build)
    - Upload _site/ directory as artifact
  
  deploy:
    - Deploy artifact to GitHub Pages
    - Site becomes available at configured domain
```

### Why Not Use Branch-Based Deployment?

Our site uses:
- **Eleventy static site generator**: Requires a build step
- **RSS feed aggregation**: Fetches external content during build
- **Dynamic content generation**: Templates process data at build time

Branch-based deployment can't do this - it only serves static files.

## Summary

**Everything is ready!** The site just needs one configuration change:

**Settings → Pages → Source → "GitHub Actions"**

That's it. The site will be live at www.picklenl.com within minutes.

---

For more information, see:
- [README.md](README.md) - Full project documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment instructions
- [GitHub Pages Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
