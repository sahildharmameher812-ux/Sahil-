# Deployment Guide for CWRI on Render

## Prerequisites
1. Render account (https://render.com)
2. MongoDB Atlas account for database (https://cloud.mongodb.com) or use Render's MongoDB service
3. GitHub repository (Already done: https://github.com/sahildharmameher812-ux/Sahil-)

## Method 1: Deploy as Separate Services (Recommended)

### Step 1: Set up MongoDB Database
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create database user and password
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/cwri_db`)

### Step 2: Deploy Backend
1. Go to Render Dashboard (https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: cwri-backend
   - **Region**: Choose nearest to you
   - **Branch**: main
   - **Root Directory**: Leave blank
   - **Runtime**: Node
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Instance Type**: Free (or paid for production)

5. Add Environment Variables:
   - `NODE_ENV`: production
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Click "Generate" for random value
   - `JWT_EXPIRES_IN`: 7d
   - `TWO_FA_ISSUER`: CWRI
   - `RATE_LIMIT_WINDOW_MS`: 900000
   - `RATE_LIMIT_MAX_REQUESTS`: 100
   - `MAX_FILE_SIZE`: 10485760

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Note your backend URL (e.g., https://cwri-backend.onrender.com)

### Step 3: Deploy Frontend
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: cwri-frontend
   - **Branch**: main
   - **Root Directory**: Leave blank
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL from Step 2 (e.g., https://cwri-backend.onrender.com)

6. Click "Create Static Site"
7. Wait for deployment (5-10 minutes)
8. Your frontend will be available at the provided URL

## Method 2: Using render.yaml (Automated)

1. The project already includes a `render.yaml` file
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the render.yaml
6. Review the configuration
7. Add the MongoDB URI in the environment variables section
8. Click "Apply"
9. Both services will be created and deployed automatically

## Post-Deployment Steps

1. **Update CORS Settings** (if needed):
   - In backend, ensure CORS allows your frontend domain

2. **Test the Application**:
   - Visit your frontend URL
   - Login with: admin / admin123
   - Test all 4 key components:
     - Predictive Analytics Engine (/models)
     - Risk Heatmap Dashboard (/risk-map)
     - Law Enforcement Interface (/intelligence)
     - Alert & Notification System (/alerts)

3. **Monitor Services**:
   - Check Render dashboard for logs
   - Monitor for any errors
   - Check database connectivity

## Important Notes

- **Free Tier Limitations**:
  - Services may spin down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds
  - Limited to 750 hours/month

- **For Production**:
  - Upgrade to paid instances for always-on services
  - Add custom domain
  - Enable auto-scaling if needed

## Troubleshooting

1. **Backend not connecting to MongoDB**:
   - Check MongoDB URI is correct
   - Ensure IP whitelist includes 0.0.0.0/0
   - Check database user credentials

2. **Frontend not connecting to Backend**:
   - Verify VITE_API_URL environment variable
   - Check CORS settings in backend
   - Ensure backend is running

3. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

## Support
- Render Documentation: https://render.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Project Issues: Create issue on GitHub repository