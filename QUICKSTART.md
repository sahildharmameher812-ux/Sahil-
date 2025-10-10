# 🚀 Quick Start Guide - CWRI Application

## ⚡ Get Running in 5 Minutes

### Step 1: Prerequisites Check

Make sure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ MongoDB running (`mongosh` to test)
- ✅ npm or yarn installed

### Step 2: Install Dependencies

```bash
# Navigate to project folder
cd "body chain"

# Install all dependencies (backend + frontend)
npm run install:all
```

⏱️ This will take 2-3 minutes...

### Step 3: Configure Environment

The `.env` file is already created with default values. MongoDB connection is set to:
```
mongodb://localhost:27017/cwri_db
```

**If using MongoDB Atlas or different connection**, edit `backend/.env`:
```env
MONGODB_URI=your-mongodb-connection-string
```

### Step 4: Start the Application

```bash
# Start both backend and frontend together
npm run dev
```

OR run them separately in two terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 🔐 Create Your First Admin User

Since the database is empty, you need to create the first admin user using an API call:

### Option 1: Using curl (PowerShell)

```powershell
$body = @{
    name = "System Administrator"
    email = "admin@cwri.gov.in"
    password = "Admin@123"
    role = "I4C_ADMIN"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Option 2: Using Postman/Thunder Client

**POST** `http://localhost:5000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "System Administrator",
  "email": "admin@cwri.gov.in",
  "password": "Admin@123",
  "role": "I4C_ADMIN"
}
```

### Option 3: Direct MongoDB Insert

```javascript
// Connect to MongoDB and run:
use cwri_db

db.users.insertOne({
  name: "System Administrator",
  email: "admin@cwri.gov.in",
  password: "$2a$10$YourHashedPasswordHere", // Will be hashed by the model
  role: "I4C_ADMIN",
  isActive: true,
  twoFactorEnabled: false,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Note:** For the direct method, you'd need to hash the password first using bcryptjs.

---

## 📝 Login to the Application

1. Go to http://localhost:3000
2. You'll see the login page
3. Enter credentials:
   - **Email**: admin@cwri.gov.in
   - **Password**: Admin@123
4. Click **Login**

You should now see the dashboard! 🎉

---

## 🎯 Next Steps

### Add More Users (From Admin Panel)

1. Go to **Admin** in the sidebar
2. Click "Add User"
3. Fill in details and assign roles:
   - I4C_ADMIN
   - STATE_LEA
   - DISTRICT_OFFICER
   - BANK_OFFICER
   - ANALYST
   - AUDITOR

### Import Sample Data

You can create sample complaints, alerts, and cases through the UI or by importing CSV files.

### Explore Features

- **Dashboard**: View statistics and recent activity
- **Risk Map**: See the map placeholder (integrate Leaflet for full functionality)
- **Alerts**: Create and manage alerts
- **Cases**: Investigation workspace
- **Complaints**: Import and manage complaints
- **Reports**: Generate analytics reports

---

## ⚠️ Troubleshooting

### MongoDB Connection Error

**Error**: "MongoDB Connection Error"

**Solution**:
1. Make sure MongoDB is running: `mongosh`
2. Check the connection string in `backend/.env`
3. For MongoDB Atlas, make sure your IP is whitelisted

### Port Already in Use

**Error**: "Port 5000 (or 3000) is already in use"

**Solution**:
1. Kill the process using that port:
   ```powershell
   # Find process on port 5000
   netstat -ano | findstr :5000
   # Kill it
   taskkill /PID <PID> /F
   ```
2. Or change the port in `backend/.env` or `frontend/vite.config.ts`

### Dependencies Not Installing

**Error**: npm install fails

**Solution**:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `Remove-Item -Recurse -Force node_modules`
3. Delete package-lock.json
4. Run `npm install` again

### TypeScript Errors

**Error**: TypeScript compilation errors

**Solution**:
1. Make sure you have the latest TypeScript: `npm i -g typescript`
2. Run `npm run build` in backend/frontend to check for errors

---

## 📊 Testing the API

### Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2025-10-06T16:04:11.000Z"
}
```

### Get Dashboard Stats (After Login)

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/dashboard/stats
```

---

## 🎨 Customization

### Change Theme Colors

Edit `frontend/tailwind.config.js` to customize colors.

### Add New Pages

1. Create a new file in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Add menu item in `frontend/src/components/Layout.tsx`

### Add New API Endpoints

1. Create route file in `backend/src/routes/`
2. Add route in `backend/src/server.ts`
3. Add model if needed in `backend/src/models/`

---

## 🚀 Production Deployment

### Build for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd ../frontend
npm run build
```

### Environment Variables for Production

Update `backend/.env`:
```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
MONGODB_URI=<production-database-url>
```

### Deployment Options

- **Backend**: AWS EC2, Heroku, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS S3
- **Database**: MongoDB Atlas

---

## 📚 Documentation

For complete documentation, see [README.md](./README.md)

---

## 💡 Tips

1. **Use MongoDB Compass** for easier database management
2. **Install React DevTools** for debugging the frontend
3. **Use Thunder Client/Postman** for API testing
4. **Enable auto-save in VS Code** for better dev experience

---

## 🆘 Need Help?

- Check the main [README.md](./README.md)
- Review API endpoints in the README
- Check browser console for frontend errors
- Check terminal logs for backend errors

---

**Happy Coding! 🎉**

Built with ❤️ for SIH 2025
