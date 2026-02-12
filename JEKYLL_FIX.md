# Jekyll/Liquid Error Fix

## Problem

GitHub Pages was encountering this error:

```
github-pages 232 | Error: Liquid error (line 10): wrong number of arguments (given 3, expected 2)
```

### Root Cause

By default, GitHub Pages uses Jekyll to process files. When Jekyll's Liquid templating engine encountered the Nunjucks template files (`.njk`), it tried to parse them and failed because the syntax is incompatible:

**Nunjucks syntax (what we use):**
```nunjucks
{{ "now" | date("%a, %d %b %Y %H:%M:%S %z") }}
```

**Liquid syntax (what Jekyll expects):**
```liquid
{{ "now" | date: "%a, %d %b %Y %H:%M:%S %z" }}
```

The error occurred in `src/feed.njk` at line 14 where the date filter is used with function-style parentheses, which Liquid interprets as providing 3 arguments instead of 2.

## Solution

Added a `.nojekyll` file to the repository, which is a standard GitHub Pages convention that tells the platform to skip Jekyll processing entirely.

### Changes Made

1. **Created `.nojekyll` file** - An empty file in the repository root
2. **Updated `.eleventy.js`** - Added passthrough copy configuration to ensure `.nojekyll` is copied to the `_site/` output directory

### How It Works

When GitHub Pages sees a `.nojekyll` file in the repository:
- It skips all Jekyll processing
- Files are served as-is from the repository
- Our GitHub Actions workflow handles the build with Eleventy
- Nunjucks templates are processed correctly by Eleventy

## Verification

Build test results:
```
✅ Local build completed successfully
✅ .nojekyll file present in _site/ output
✅ feed.xml generated correctly with proper date formatting
✅ No Liquid syntax errors
```

## Expected Outcome

After this fix is deployed:
- GitHub Pages will not attempt to process files with Jekyll
- The GitHub Actions workflow (`.github/workflows/deploy.yml`) will build the site using Eleventy
- Nunjucks templates will be processed with the correct Eleventy/Nunjucks engine
- The site will deploy successfully without Liquid syntax errors

## Technical Context

This is a common issue when using custom static site generators on GitHub Pages. The `.nojekyll` file is the standard solution recommended in the GitHub Pages documentation for disabling Jekyll when using alternative build tools.

## References

- [GitHub Pages Documentation: Bypassing Jekyll](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#static-site-generators)
- The error was happening because GitHub Pages default behavior is to run Jekyll on all content
- Our site uses Eleventy (11ty) with Nunjucks templates, which requires a custom build process
