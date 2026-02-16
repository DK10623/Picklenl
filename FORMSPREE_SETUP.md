# 🔧 Formspree Setup Instructions

**Status**: ⚠️ **ACTION REQUIRED** - The newsletter signup form needs configuration to work properly.

## Quick Setup (5 minutes)

The newsletter signup form at `/signup/` is integrated with Formspree but needs your form ID to function.

### Step 1: Create Free Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" and sign up (free account available)
3. Verify your email address

### Step 2: Create Your Form

1. In Formspree dashboard, click "+ New Form"
2. Name it: "PickleNL Newsletter Signup"
3. Copy your form ID (looks like `abc123xyz`)

### Step 3: Update the Code

1. Open `src/signup.njk`
2. Find line 21: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Example: `action="https://formspree.io/f/abc123xyz"`

### Step 4: Deploy

```bash
git add src/signup.njk
git commit -m "Configure Formspree form endpoint"
git push origin main
```

## What This Enables

✅ Newsletter signups are saved to your Formspree account  
✅ You can view all submissions in Formspree dashboard  
✅ Export subscriber data as CSV  
✅ Optional email notifications for new signups  
✅ Built-in spam protection  

## Free Tier Includes

- 50 submissions per month
- Unlimited forms
- Email notifications
- CSV exports
- Spam filtering

## Testing

After setup, test the form:

1. Visit your deployed site at `https://www.picklenl.com/signup/`
2. Fill out the form with test data
3. Submit the form
4. Check your Formspree dashboard for the submission

## Need More Details?

See [CONTACT_DATA.md](CONTACT_DATA.md) for:
- Complete setup walkthrough
- Where contact data is stored
- How to export subscriber data
- Email marketing integration options
- Privacy and security information
- Troubleshooting guide

## Alternative Options

If you don't want to use Formspree, see the "Alternative Solutions" section in [CONTACT_DATA.md](CONTACT_DATA.md) for other options like Web3Forms, Netlify Forms, or Google Forms.

---

**Questions?** Open an issue in this repository or contact the repository owner.
