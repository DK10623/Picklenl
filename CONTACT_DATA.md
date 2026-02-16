# Contact Data Recording

This document explains how email addresses and contact information from the newsletter signup form are recorded and managed.

## Overview

The newsletter signup form at `/signup/` collects the following information:
- **Name** (required)
- **Address** (required)
- **Email** (required)
- **Phone** (optional)
- **Pickleball Rating** (required if user has a rating)

This data is submitted to and stored by **Formspree**, a third-party form backend service.

## Where Contact Data is Recorded

### Formspree Service

All newsletter signup submissions are sent to and stored in **Formspree**:

- **Service**: [Formspree](https://formspree.io/)
- **Form Endpoint**: The form submits to `https://formspree.io/f/YOUR_FORM_ID`
- **Data Storage**: All submissions are stored in your Formspree account dashboard

### Accessing Submitted Data

To view and manage submitted contact information:

1. Log in to your Formspree account at [https://formspree.io/](https://formspree.io/)
2. Navigate to your form in the dashboard
3. View all submissions with timestamps and full form data
4. Export submissions as CSV for use in email marketing tools

## Setting Up Formspree (One-Time Setup)

If you haven't set up Formspree yet, follow these steps:

### Step 1: Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Get Started" and sign up for a free account
3. Verify your email address

### Step 2: Create a New Form

1. In your Formspree dashboard, click "New Form"
2. Give your form a name (e.g., "PickleNL Newsletter Signup")
3. Formspree will generate a unique form ID
4. Copy the form endpoint URL (format: `https://formspree.io/f/YOUR_FORM_ID`)

### Step 3: Configure the Form in the Website

1. Open `src/signup.njk` in the repository
2. Find the line: `<form id="newsletter-signup-form" class="signup-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID
4. Commit and push the changes

### Step 4: Optional Email Notifications

Formspree can send you email notifications for each submission:

1. In your form settings on Formspree, go to "Email Notifications"
2. Enter the email address where you want to receive notifications
3. Enable email notifications
4. Save changes

## Formspree Features

### Free Tier Includes:
- **50 submissions per month**
- **Spam filtering** with reCAPTCHA integration
- **Email notifications** for new submissions
- **Submission archive** accessible in dashboard
- **CSV export** of submissions
- **Email field validation**

### Paid Plans (if needed):
- Higher submission limits
- File uploads
- Custom redirect URLs
- Webhook integrations
- Team collaboration
- Priority support

## Data Privacy and Security

### GDPR Compliance

Formspree is GDPR compliant and provides:
- Data processing agreements
- Right to access stored data
- Right to delete stored data
- Data portability (CSV export)

### Security Features

- **HTTPS encryption** for all form submissions
- **Spam protection** with reCAPTCHA
- **Email validation** to ensure valid addresses
- **Rate limiting** to prevent abuse

## Alternative Solutions

If you prefer not to use Formspree, here are alternatives that work with static sites:

### 1. Web3Forms
- Free, privacy-focused form backend
- No registration required for basic use
- Website: https://web3forms.com/

### 2. Netlify Forms (if deploying to Netlify)
- Built-in form handling on Netlify
- 100 submissions/month on free tier
- Docs: https://docs.netlify.com/forms/setup/

### 3. Google Forms/Sheets
- Free with Google account
- Requires embedding Google Form or using Google Apps Script
- More setup required

### 4. Email-based (mailto)
- Simple fallback: `action="mailto:your-email@example.com"`
- Opens user's email client
- Less user-friendly
- Unreliable on mobile devices

## Managing Newsletter Subscribers

### Exporting Subscriber Data

To export your newsletter subscribers:

1. Log in to Formspree
2. Go to your form dashboard
3. Click "Export" → "Download CSV"
4. Use the CSV file with your email marketing platform

### Email Marketing Integration

You can integrate Formspree with popular email marketing platforms:

**Manual Method:**
1. Export CSV from Formspree monthly/weekly
2. Import to your email marketing platform (Mailchimp, ConvertKit, etc.)

**Automated Method (paid plans):**
1. Use Formspree webhooks to automatically send new submissions
2. Connect to Zapier or similar automation tools
3. Auto-sync with your email marketing platform

### Recommended Email Marketing Tools
- **Mailchimp** - Popular, free tier for up to 500 subscribers
- **ConvertKit** - Creator-focused, free tier for up to 1,000 subscribers
- **Sendinblue** - Generous free tier with 300 emails/day
- **EmailOctopus** - Budget-friendly with 2,500 subscribers free

## Troubleshooting

### Form Not Submitting

If the form doesn't submit:
1. Check that `YOUR_FORM_ID` in `signup.njk` is replaced with your actual form ID
2. Verify your Formspree form is active and not paused
3. Check browser console for JavaScript errors
4. Ensure you haven't exceeded your monthly submission limit

### Not Receiving Email Notifications

If you're not receiving email notifications:
1. Check your Formspree notification settings
2. Check your spam folder
3. Verify the notification email address is correct
4. Ensure notifications are enabled in your Formspree form settings

### Spam Submissions

If you're receiving spam:
1. Enable reCAPTCHA in Formspree settings
2. Use Formspree's built-in spam filtering
3. Consider honeypot fields (available in Formspree)
4. Review and adjust spam filter sensitivity

## Contact Data Fields

The signup form collects these specific fields:

| Field Name | Type | Required | Purpose |
|------------|------|----------|---------|
| `name` | Text | Yes | Subscriber's full name |
| `address` | Textarea | Yes | Physical mailing address |
| `email` | Email | Yes | Email address for newsletter |
| `phone` | Tel | No | Phone number (optional) |
| `has_rating` | Radio | Yes | Whether subscriber has pickleball rating |
| `rating_level` | Select | Conditional | Pickleball skill rating (if applicable) |
| `_subject` | Hidden | - | Email subject line for notifications |

## Support

For issues with:
- **Formspree service**: Contact Formspree support at https://formspree.io/support
- **Website/form code**: Open an issue in this GitHub repository
- **Email marketing**: Contact your email marketing platform support

---

**Last Updated**: February 2026
