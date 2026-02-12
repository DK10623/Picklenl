# GitHub Pages 404 Error - Fix Guide

## Problem
After merging PR #5 (newsletter signup form), the site shows a 404 error when visiting www.picklenl.com.

## Root Cause
GitHub Pages is not configured to use **GitHub Actions** as the deployment source. Instead, it's trying to serve files directly from the `main` branch root, which doesn't contain the built site (the built site is in `_site/` and is deployed via GitHub Actions).

## Why This Happens
When using GitHub Actions to build and deploy a site:
1. The workflow builds the site (runs `npm run build`)
2. The built files go into `_site/` directory
3. The workflow uploads this as an artifact
4. The workflow deploys the artifact to GitHub Pages

However, if GitHub Pages is configured to serve from the branch root instead of GitHub Actions artifacts, it will look for `index.html` in the repository root and return 404 when it's not found.

## Solution

### Quick Fix (30 seconds)
1. Go to https://github.com/DK10623/Picklenl/settings/pages
2. Under "Build and deployment" section:
   - Change **Source** from any branch setting to: **GitHub Actions**
3. Click Save (if there's a save button)
4. Wait 1-2 minutes
5. Visit https://www.picklenl.com

### Detailed Steps with Screenshots Guide

#### Step 1: Navigate to Pages Settings
- Go to your repository: https://github.com/DK10623/Picklenl
- Click **Settings** (top navigation bar)
- In the left sidebar, click **Pages** (under "Code and automation")

#### Step 2: Configure Build and Deployment
Look for the "Build and deployment" section. You should see:

**Source**: [Dropdown menu]

The dropdown will have options like:
- Deploy from a branch
- GitHub Actions ← **SELECT THIS ONE**

#### Step 3: Select GitHub Actions
- Click the dropdown next to "Source"
- Select **GitHub Actions**
- The page may auto-save, or you might need to click a Save button

#### Step 4: Verify
- Check the Actions tab: https://github.com/DK10623/Picklenl/actions
- The most recent "Build and Deploy to GitHub Pages" workflow should show a green checkmark
- If needed, trigger a new deployment by pushing any small change to `main`

#### Step 5: Wait and Test
- Wait 1-2 minutes for GitHub Pages to update
- Visit https://www.picklenl.com
- The site should now load correctly

## What Gets Fixed
Once configured correctly:
- ✅ Homepage loads at https://www.picklenl.com/
- ✅ Newsletter page at https://www.picklenl.com/newsletter/
- ✅ Events page at https://www.picklenl.com/events/
- ✅ Tips page at https://www.picklenl.com/tips/
- ✅ RSS feed at https://www.picklenl.com/rss.xml
- ✅ All static assets (CSS, etc.) load correctly

## Temporary Fallback
An `index.html` file has been added to the repository root as a temporary fallback. This file:
- Provides configuration instructions
- Attempts to redirect to the correct site
- Will be bypassed once GitHub Pages is properly configured

This file doesn't interfere with the actual site because:
- The built site (in `_site/`) has its own `index.html`
- GitHub Actions deployment uses the built files, not the repository root
- The root `index.html` only shows when GitHub Pages is misconfigured

## Verification
After configuration, verify the deployment:

```bash
# Check if the site is accessible
curl -I https://www.picklenl.com

# Should return:
# HTTP/2 200 OK
# (not 404)
```

## Why "Once Again"?
This issue says "once again" because:
1. The initial site setup required this configuration
2. It's a manual step that must be done in GitHub's UI
3. If someone changes the Pages settings back to "Deploy from branch", the error returns
4. Each time it happens, the same fix is needed

## Prevention
To prevent this issue in the future:
- Don't change the GitHub Pages source setting
- Keep it set to "GitHub Actions"
- The workflow will handle all deployments automatically
- No manual deployment steps are needed once configured

## Additional Notes

### Custom Domain
The custom domain `www.picklenl.com` is configured via the `CNAME` file in the repository. This file is automatically copied to the deployment, so the custom domain should work once GitHub Pages is properly configured.

### Deployment Workflow
The workflow at `.github/workflows/deploy.yml`:
- Triggers on every push to `main`
- Installs Node.js and dependencies
- Builds the site with Eleventy
- Uploads the `_site/` directory as an artifact
- Deploys the artifact to GitHub Pages

### No Breaking Changes Needed
The codebase is already correct:
- ✅ `.nojekyll` file present (prevents Jekyll processing)
- ✅ `CNAME` file present (configures custom domain)
- ✅ Build workflow is correct
- ✅ Deployment workflow is correct
- ✅ All source files are valid

The ONLY issue is the GitHub Pages configuration.

## Support
If you still see issues after following this guide:
1. Check the Actions tab for workflow errors
2. Verify the workflow completed successfully
3. Clear your browser cache
4. Wait up to 5 minutes for DNS/CDN propagation
5. Try accessing https://dk10623.github.io/Picklenl/ (GitHub's default URL)

## References
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Deploying with GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Original deployment instructions
