# CORS Configuration Guide - Frontend & Admin URLs

## 📋 Overview

The backend now supports separate URLs for:
- **Frontend Client** (main website)
- **Admin Panel** (admin dashboard)

Both can be configured via environment variables.

## 🔧 Environment Variables Setup

### For Local Development

Create or update your `.env` file in the backend directory:

```env
# Frontend Client URL (your main website)
FRONTEND_URL=http://localhost:5173

# Admin Panel URL (your admin dashboard)
ADMIN_URL=http://localhost:5174

# Other required variables...
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ALLOWED_ADMIN_EMAIL=admin@example.com
PORT=5001
```

### For Production (Railway/Other Platforms)

Set these environment variables in your deployment platform:

#### Single URLs:
```env
FRONTEND_URL=https://your-frontend-domain.com
ADMIN_URL=https://your-admin-domain.com
```

#### Multiple URLs (comma-separated):
If you have multiple frontend or admin URLs:

```env
FRONTEND_URL=https://app1.com,https://app2.com
ADMIN_URL=https://admin1.com,https://admin2.com
```

## 🎯 How It Works

### Default Behavior (No Environment Variables)

If `FRONTEND_URL` and `ADMIN_URL` are not set:
- Frontend: `http://localhost:5173` (default)
- Admin: `http://localhost:5174` (default)

### With Environment Variables

The backend will:
1. Read `FRONTEND_URL` and add it to allowed origins
2. Read `ADMIN_URL` and add it to allowed origins
3. Support comma-separated URLs for multiple domains
4. Validate URLs on startup (if using env.ts validation)

## 📝 Examples

### Example 1: Local Development
```env
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Example 2: Production (Single Domain Each)
```env
FRONTEND_URL=https://perkpilot.com
ADMIN_URL=https://admin.perkpilot.com
```

### Example 3: Production (Multiple Frontend Domains)
```env
FRONTEND_URL=https://perkpilot.com,https://www.perkpilot.com
ADMIN_URL=https://admin.perkpilot.com
```

### Example 4: Railway Deployment
In Railway dashboard, add these environment variables:
```
FRONTEND_URL=https://your-frontend.railway.app
ADMIN_URL=https://your-admin.railway.app
```

## 🔍 Verification

After setting up, you can verify the CORS configuration:

1. **Check server logs** - The server will start with allowed origins
2. **Test from browser** - Open browser console and make a request:
   ```javascript
   fetch('http://localhost:5001/api/auth/check', {
     credentials: 'include'
   })
   ```
3. **Check Network tab** - Look for CORS headers in response:
   - `Access-Control-Allow-Origin: http://localhost:5173`
   - `Access-Control-Allow-Credentials: true`

## ⚠️ Important Notes

1. **No Trailing Slashes**: Don't include trailing slashes in URLs
   - ✅ `https://example.com`
   - ❌ `https://example.com/`

2. **Protocol Required**: Always include `http://` or `https://`
   - ✅ `https://example.com`
   - ❌ `example.com`

3. **Comma-Separated**: For multiple URLs, separate with commas (no spaces around commas)
   - ✅ `https://app1.com,https://app2.com`
   - ❌ `https://app1.com, https://app2.com` (spaces will cause issues)

4. **Credentials**: CORS is configured with `credentials: true`, so cookies/auth headers will work

## 🚀 Quick Setup Checklist

- [ ] Create/update `.env` file in backend directory
- [ ] Add `FRONTEND_URL` with your frontend domain
- [ ] Add `ADMIN_URL` with your admin domain
- [ ] Restart backend server
- [ ] Test API calls from both frontend and admin
- [ ] Verify no CORS errors in browser console

## 🐛 Troubleshooting

### CORS Error: "Access-Control-Allow-Origin"
- **Check**: Is your URL exactly matching the environment variable?
- **Fix**: Ensure no trailing slashes, correct protocol (http/https)

### CORS Error: "Credentials not allowed"
- **Check**: Is `credentials: true` set in your frontend fetch?
- **Fix**: Add `credentials: 'include'` to fetch options

### Multiple URLs Not Working
- **Check**: Are URLs comma-separated without spaces?
- **Fix**: Use `url1,url2` not `url1, url2`

### Environment Variable Not Loading
- **Check**: Is `.env` file in the backend root directory?
- **Fix**: Ensure `dotenv.config()` is called before reading env vars

