# Vercel Environment Variables Setup

## Required Variables:

### 1. OPENAI_API_KEY
- Value: `sk-proj-edbs...` (your OpenAI API key)
- Environment: Production, Preview, Development (all 3)

### 2. EMAIL_USER
- Value: `webndigitalcom@gmail.com`
- Environment: Production, Preview, Development (all 3)

### 3. EMAIL_PASSWORD
- Value: `oaldeiiwnddbxzp` (no spaces!)
- Environment: Production, Preview, Development (all 3)

## How to Add:

1. Go to: https://vercel.com/dashboard
2. Click on "webndigital" project
3. Settings → Environment Variables
4. Click "Add New"
5. Name: EMAIL_USER
6. Value: webndigitalcom@gmail.com
7. Select: Production, Preview, Development (check all 3)
8. Click "Save"
9. Repeat for EMAIL_PASSWORD and OPENAI_API_KEY
10. After adding all 3, go to Deployments → Latest → Redeploy

## Verify:

After redeploy, check logs at:
https://vercel.com/dashboard → webndigital → Logs → Realtime

Test the contact form and watch for:
✅ "Email sent successfully to: ..."
OR
❌ "Email credentials not configured"
