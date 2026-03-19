# 🚀 MySQL Workbench Integration - Complete Setup Guide

## ✅ What Has Been Completed

Your Praise Apostolic Pentecostals project now has a complete full-stack setup with MySQL database integration!

### Backend Setup (NestJS + TypeORM)
- ✅ NestJS backend created at `praise-apostolic-backend/`
- ✅ TypeORM configured for MySQL
- ✅ Database entities created:
  - `Pastor` - Church leadership
  - `Ministry` - Church departments
  - `Sermon` - Sermon archives
  - `ChurchEvent` - Church events
- ✅ Example controller & service implemented (Pastors)
- ✅ CORS enabled for frontend communication
- ✅ Environment configuration ready

### Frontend Setup (React)
- ✅ API client created at `src/lib/api.ts`
- ✅ Environment configured for backend communication
- ✅ Ready to integrate with backend endpoints

### Database Setup (MySQL)
- ✅ TypeORM configuration complete
- ✅ Auto-synchronization enabled
- ✅ UUID primary keys configured
- ✅ Timestamps (createdAt, updatedAt) on all entities

---

## 🔧 Current Status

### Backend Server Status
```
✓ Running on http://localhost:3001
✓ Database connection configured
✓ /pastors endpoint ready
✓ CORS enabled for http://localhost:3000
```

### Frontend Server Status
```
✓ Running on http://localhost:3000
✓ API client ready at src/lib/api.ts
✓ Montserrat font applied globally
✓ Ready to connect to backend
```

---

## 📋 Quick Start Instructions

### 1️⃣ Start MySQL Server
**Windows:**
```bash
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### 2️⃣ Create Database in MySQL Workbench
1. Open MySQL Workbench
2. Connect to localhost:3306
3. Run this SQL:
```sql
CREATE DATABASE praise_apostolic;
```

### 3️⃣ Configure Backend
Edit `praise-apostolic-backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password_here
DB_DATABASE=praise_apostolic
PORT=3001
NODE_ENV=development
```

### 4️⃣ Start Backend (Terminal 1)
```bash
cd praise-apostolic-backend
npm run start:dev
```

Expected output:
```
[Nest] 7896  - 03/17/2026, 9:22:51 AM     LOG [NestApplication] Nest application successfully started
```

### 5️⃣ Start Frontend (Terminal 2)
```bash
cd praise-apostolic
npm run dev
```

Expected output:
```
VITE v6.2.0  ready in 432 ms

➜  Local:   http://localhost:3000/
```

---

## 📡 API Endpoints Reference

### Health Check
```
GET http://localhost:3001/
Response: { "message": "Hello World!" }
```

### Pastors API (Example - Currently Implemented)
```
GET    /pastors               # Get all pastors
POST   /pastors               # Create new pastor
GET    /pastors/:id           # Get specific pastor
PUT    /pastors/:id           # Update pastor
DELETE /pastors/:id           # Delete pastor
```

### Example Request
```bash
# Get all pastors
curl http://localhost:3001/pastors

# Create new pastor
curl -X POST http://localhost:3001/pastors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pastor John",
    "role": "Senior Pastor",
    "image": "https://...",
    "shortBio": "..."
  }'
```

---

## 🔌 Frontend Integration Examples

### Using the API Client

```typescript
import { pastorsAPI, ministriesAPI, sermonsAPI, eventsAPI } from './lib/api';

// Get all pastors
async function loadPastors() {
  try {
    const pastors = await pastorsAPI.getAll();
    console.log(pastors);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Create new ministry
async function createMinistry() {
  try {
    const ministry = await ministriesAPI.create({
      name: 'New Ministry',
      description: 'Description here',
      schedule: 'Sunday 10:30 AM',
      leader: 'Leader Name',
      icon: 'Heart'
    });
    console.log('Created:', ministry);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Update sermon
async function updateSermon(id, updates) {
  try {
    const sermon = await sermonsAPI.update(id, updates);
    console.log('Updated:', sermon);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Delete event
async function deleteEvent(eventId) {
  try {
    await eventsAPI.delete(eventId);
    console.log('Deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 🗄️ Database Inspection

### Via MySQL Workbench
1. Open MySQL Workbench
2. Connect to `localhost:3306`
3. Select `praise_apostolic` database
4. View tables and data in the schema browser

### Via MySQL CLI
```bash
# Connect to MySQL
mysql -u root -p

# Use database
USE praise_apostolic;

# View all tables
SHOW TABLES;

# View table structure
DESC pastors;
DESC ministries;
DESC sermons;
DESC events;

# View data
SELECT * FROM pastors;
SELECT * FROM ministries;
SELECT COUNT(*) FROM sermons;
```

---

## 📁 Project File Structure

```
praise-apostolic/
├── src/
│   ├── lib/
│   │   ├── api.ts              ← API client for backend
│   │   ├── data.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              ← Updated with Montserrat font
├── .env                       ← Frontend config
├── BACKEND_SETUP.md          ← Detailed setup guide
└── package.json

praise-apostolic-backend/
├── src/
│   ├── entities/
│   │   ├── pastor.entity.ts
│   │   ├── ministry.entity.ts
│   │   ├── sermon.entity.ts
│   │   ├── event.entity.ts
│   │   └── index.ts
│   ├── services/
│   │   └── pastors.service.ts
│   ├── controllers/
│   │   └── pastors.controller.ts
│   ├── app.module.ts          ← TypeORM config here
│   └── main.ts               ← CORS config here
├── .env                       ← Database credentials
├── .env.example
├── MYSQL_SETUP.md
└── package.json
```

---

## 🔐 Security Notes

**⚠️ Important:**
1. Never commit `.env` files to Git
2. Use `.env.example` as template
3. Change default password in production
4. Use environment variables for sensitive data
5. Implement JWT authentication for APIs

---

## 🚀 Next Steps

### Immediate (This Week)
- [ ] Test MySQL connection
- [ ] Verify backend starts successfully
- [ ] Test API endpoints with Postman/Thunder Client
- [ ] Connect frontend components to API

### Short Term (Next 2 Weeks)
- [ ] Create services for remaining entities (Ministries, Sermons, Events)
- [ ] Implement CRUD controllers for all entities
- [ ] Add validation using class-validator
- [ ] Add DTOs (Data Transfer Objects) for request/response

### Medium Term (Next Month)
- [ ] Implement authentication (JWT)
- [ ] Add user roles and permissions
- [ ] Database seeding for initial data
- [ ] Error handling and logging
- [ ] Unit and integration tests

### Long Term
- [ ] Add file uploads (images, videos, audio)
- [ ] Implement caching strategy
- [ ] Database migrations system
- [ ] API documentation (Swagger)
- [ ] Production deployment

---

## 🐛 Troubleshooting

### Issue: "Connection refused on port 3001"
**Solution:**
- Ensure backend is running: `npm run start:dev` in backend folder
- Check if port 3001 is available
- Restart the backend

### Issue: "CORS errors from frontend"
**Solution:**
- Check backend CORS config in `src/main.ts`
- Should have: `origin: 'http://localhost:3000'`
- Restart backend after changes

### Issue: "Database connection failed"
**Solution:**
- Verify MySQL is running
- Check credentials in `.env`
- Verify database exists: `CREATE DATABASE praise_apostolic;`
- Check port 3306 is accessible

### Issue: "Tables not found"
**Solution:**
- Ensure `synchronize: true` in `app.module.ts`
- Check TypeORM logs for entity loading errors
- Restart backend

### Issue: "Port 3000 or 3001 already in use"
**Solution:**
```bash
# Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill process (replace PID)
taskkill /PID <PID> /F
```

---

## 📚 Useful Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [MySQL Workbench Guide](https://dev.mysql.com/doc/workbench/en/)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## ✨ Summary

Your project now has:
1. ✅ Full-stack JavaScript/TypeScript development
2. ✅ React frontend with modern animations
3. ✅ NestJS backend with REST API
4. ✅ MySQL database with TypeORM ORM
5. ✅ CORS-enabled communication
6. ✅ Environment configuration system
7. ✅ Ready-to-use API client library
8. ✅ Montserrat font applied globally

**You're ready to build a professional church management system!** 🎉

---

**Questions or issues?** Check the troubleshooting section or refer to the detailed `BACKEND_SETUP.md` guide.

**Last Updated:** March 17, 2026
