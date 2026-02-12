# GitHub Pages Deployment Instructions

This file provides step-by-step instructions for configuring GitHub Pages to deploy this site.

## Prerequisites

- This PR must be merged to the `main` branch
- You must have admin access to the repository

## Configuration Steps

### 1. Enable GitHub Pages with Actions

1. Go to your repository on GitHub: https://github.com/DK10623/Picklenl
2. Click on **Settings** (top navigation)
3. Scroll down to **Pages** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" from the dropdown
   - This allows the workflow in `.github/workflows/deploy.yml` to deploy the site
5. Save the settings

### 2. Verify Custom Domain

The CNAME file in the repository already contains `www.picklenl.com`. GitHub Pages will automatically configure this domain when deploying.

Ensure your DNS settings point to GitHub Pages:
- CNAME record: `www.picklenl.com` → `dk10623.github.io`
- Or A records pointing to GitHub's IPs

### 3. Trigger First Deployment

After merging this PR to `main`:

**Option A - Automatic**: The workflow will run automatically on merge

**Option B - Manual**: If you want to trigger it manually:
1. Go to **Actions** tab
2. Select "Build and Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select `main` branch
5. Click "Run workflow" button

### 4. Monitor Deployment

1. Go to **Actions** tab
2. Watch the "Build and Deploy to GitHub Pages" workflow run
3. It should complete in 1-2 minutes
4. Once complete, the site will be live at https://www.picklenl.com

### 5. Verify Deployment

Visit the following URLs to confirm everything works:

- Homepage: https://www.picklenl.com/
- Newsletter: https://www.picklenl.com/newsletter/
- Events: https://www.picklenl.com/events/
- Tips: https://www.picklenl.com/tips/
- RSS Feed: https://www.picklenl.com/rss.xml
- Sitemap: https://www.picklenl.com/sitemap.xml
- Robots: https://www.picklenl.com/robots.txt

## Troubleshooting

### Workflow Fails

If the deployment workflow fails:

1. Check the workflow logs in the Actions tab
2. Look for error messages in the "Build site" or "Deploy to GitHub Pages" steps
3. Common issues:
   - Missing dependencies: Clear cache and re-run
   - RSS feed timeouts: These are logged but don't fail the build
   - Permission issues: Ensure repository has Pages write permissions

### Site Shows 404

If you get a 404 error:

1. Verify GitHub Pages is set to deploy from "GitHub Actions"
2. Check that the workflow completed successfully
3. Wait a few minutes for DNS propagation
4. Clear your browser cache

### Custom Domain Not Working

If www.picklenl.com doesn't work:

1. Check DNS settings point to GitHub Pages
2. Verify CNAME file exists in the repository root
3. Go to Settings → Pages and re-enter the custom domain if needed
4. Wait 24-48 hours for DNS propagation if you just set it up

### RSS Feeds Empty

If /rss.xml shows no items:

1. This is normal during first deploy (external feeds fetched during build)
2. Check workflow logs to see if feed fetching had errors
3. Verify feed URLs in `src/_data/feedConfig.js` are accessible
4. Trigger a new workflow run to retry fetching feeds

## Continuous Deployment

After initial setup, the site will automatically rebuild and deploy whenever you:

- Push changes to the `main` branch
- Merge a pull request to `main`

No manual intervention needed!

## Updating RSS Feed Sources

To add/remove RSS feeds:

1. Edit `src/_data/feedConfig.js`
2. Add or remove feed entries
3. Commit and push to `main`
4. Workflow will rebuild with new feeds automatically

See README.md for detailed instructions.

---

For more information, see the main README.md file.
