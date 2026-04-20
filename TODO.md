# Vercel Deployment TODO

## 1. [x] Vercel CLI Installed & Login ✅\n```bash\nnpm i -g vercel\nvercel login\n```

## 2. [ ] Push to GitHub (if not done)
- Init git, add remote, push main.

## 3. [ ] Deploy Frontend
```bash
cd frontend
vercel --prod
```
Note frontend URL (e.g., https://frontend-xxx.vercel.app)

## 4. [x] Backend Vercel Files Created (api/index.js, vercel.json, server.js updated) ✅

## 5. [ ] Deploy Backend
```bash
cd backend
vercel --prod
```
Note backend API URL (e.g., https://backend-xxx.vercel.app)

## 6. [ ] Set Env Vars on Vercel Dashboard
- Backend: MONGO_URI, JWT_SECRET, etc. from .env

## 7. [ ] Update Frontend API BaseURL to Backend URL
- Edit AuthContext.js/axios, rebuild/deploy frontend.

## 8. [ ] Test Full App
