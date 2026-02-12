# PickleNL

**Your source for pickleball news, tips, events, and community updates**

PickleNL is a static website that aggregates content from multiple pickleball RSS feeds and presents them in a clean, accessible format. The site is built with [Eleventy](https://www.11ty.dev/) and automatically deployed to GitHub Pages at [www.picklenl.com](https://www.picklenl.com).

## Features

- 📰 **RSS Aggregation**: Automatically fetches and combines content from multiple external pickleball news sources
- 🎨 **Modern Design**: Clean, responsive layout that works on all devices
- 🔍 **SEO Optimized**: Complete meta tags, OpenGraph, Twitter Cards, JSON-LD, sitemap, and robots.txt
- 📡 **RSS Feed**: Provides an aggregated RSS feed at `/rss.xml`
- 🚀 **Automated Deployment**: GitHub Actions automatically builds and deploys on every push to main

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DK10623/Picklenl.git
   cd Picklenl
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   
   The site will be available at `http://localhost:8080` with live reloading.

4. **Build for production**:
   ```bash
   npm run build
   ```
   
   The built site will be in the `_site/` directory.

## Project Structure

```
Picklenl/
├── .eleventy.js              # Eleventy configuration
├── package.json              # Node.js dependencies and scripts
├── CNAME                     # Custom domain configuration
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment workflow
└── src/
    ├── _data/
    │   ├── site.js           # Site metadata
    │   ├── feedConfig.js     # RSS feed sources configuration
    │   └── aggregateFeeds.js # RSS aggregation logic
    ├── _includes/
    │   └── base.njk          # Base HTML template
    ├── assets/
    │   └── css/
    │       └── styles.css    # Site styles
    ├── index.njk             # Homepage
    ├── newsletter.njk        # Newsletter page
    ├── events.njk            # Events page
    ├── tips.njk              # Tips page
    ├── rss.njk               # RSS feed template
    ├── robots.njk            # robots.txt template
    └── sitemap.njk           # sitemap.xml template
```

## Managing RSS Feeds

### Adding a New Feed

1. Open `src/_data/feedConfig.js`
2. Add a new entry to the array:
   ```javascript
   {
     name: "Feed Name",
     url: "https://example.com/feed/",
     enabled: true
   }
   ```
3. Save and rebuild the site

### Removing or Disabling a Feed

1. Open `src/_data/feedConfig.js`
2. Either:
   - Set `enabled: false` to temporarily disable
   - Remove the entire entry to permanently remove
3. Save and rebuild the site

### Feed Requirements

- Feeds must be publicly accessible (no authentication required)
- Feeds should be in standard RSS or Atom format
- The aggregator will handle temporary failures gracefully

## Build & Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. GitHub Actions runs the build workflow (`.github/workflows/deploy.yml`)
2. Eleventy builds the static site
3. RSS feeds are fetched and aggregated during the build
4. The built site is deployed to GitHub Pages
5. The site becomes available at www.picklenl.com

### Manual Deployment

You can also trigger a deployment manually:

1. Go to the [Actions tab](https://github.com/DK10623/Picklenl/actions) in GitHub
2. Select "Build and Deploy to GitHub Pages"
3. Click "Run workflow"

### GitHub Pages Configuration

The repository is configured to deploy from GitHub Actions:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. The CNAME file ensures the site deploys to www.picklenl.com

## Testing Locally

### Test the RSS Feed

After running `npm run build`, check the RSS feed:

```bash
# View the generated RSS feed
cat _site/rss.xml

# Or open in a browser
open _site/rss.xml
```

### Test the Sitemap

```bash
# View the generated sitemap
cat _site/sitemap.xml
```

### Validate RSS Feed

Use an online RSS validator like [W3C Feed Validator](https://validator.w3.org/feed/) or [RSS Feed Validator](https://www.rssboard.org/rss-validator/):

1. Build the site: `npm run build`
2. Copy the contents of `_site/rss.xml`
3. Paste into the validator
4. Check for any errors or warnings

## Customization

### Site Metadata

Edit `src/_data/site.js` to change:
- Site title
- Description
- URL
- Author information
- Language/locale

### Styling

Edit `src/assets/css/styles.css` to customize:
- Colors (CSS variables in `:root`)
- Fonts
- Layout
- Responsive breakpoints

### Content Pages

Edit the following files to update page content:
- `src/index.njk` - Homepage
- `src/newsletter.njk` - Newsletter page
- `src/events.njk` - Events page
- `src/tips.njk` - Tips page

## Troubleshooting

### Build Fails Due to RSS Feed Error

The build is designed to continue even if one or more RSS feeds fail. Check the build logs for errors like:

```
Failed to fetch [Feed Name]: [error message]
```

If a feed is consistently failing:
1. Verify the feed URL is correct
2. Check if the feed is temporarily down
3. Consider disabling the feed in `feedConfig.js`

### No Content Appears on Homepage

If the homepage shows "No items available":
1. Check that feeds are enabled in `src/_data/feedConfig.js`
2. Verify feed URLs are accessible
3. Check build logs for RSS fetch errors
4. Try building locally to see detailed error messages

### Custom Domain Not Working

1. Verify `CNAME` file contains `www.picklenl.com`
2. Check DNS settings point to GitHub Pages
3. Wait 24-48 hours for DNS propagation
4. Check GitHub Pages settings in repository settings

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test locally: `npm start` and `npm run build`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to your fork: `git push origin feature/your-feature`
7. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Open an [issue](https://github.com/DK10623/Picklenl/issues)
- Contact the repository owner

---

**Happy Pickleballing! 🏓**
