# Full Stack Project Setup - MySQL Integration Complete

## Project Structure

```
praise-apostolic/                    # Frontend (React)
├── src/
│   ├── lib/
│   │   └── api.ts                   # API client for backend communication
│   └── ...
├── .env                             # Frontend config
└── package.json

praise-apostolic-backend/            # Backend (NestJS)
├── src/
│   ├── entities/
│   │   ├── pastor.entity.ts
│   │   ├── ministry.entity.ts
│   │   ├── sermon.entity.ts
│   │   ├── event.entity.ts
│   │   └── index.ts
│   ├── controllers/
│   │   └── pastors.controller.ts
│   ├── services/
│   │   └── pastors.service.ts
│   ├── app.module.ts                # Main module with TypeORM config
│   └── main.ts                      # Server entry point with CORS
├── .env                             # Database config
├── .env.example                     # Template for env config
├── MYSQL_SETUP.md                   # Setup instructions
└── package.json

MySQL Database
└── praise_apostolic                 # Database name
    ├── pastors
    ├── ministries
    ├── sermons
    └── events
```

## What Has Been Set Up

### ✅ Backend (NestJS)
- [x] NestJS project created
- [x] TypeORM integration configured
- [x] MySQL database connection setup
- [x] Entity models (Pastor, Ministry, Sermon, ChurchEvent)
- [x] Pastors service and controller (example)
- [x] CORS enabled for frontend communication
- [x] Environment configuration ready

### ✅ Frontend (React)
- [x] API client created (`src/lib/api.ts`)
- [x] Environment file configured
- [x] Ready for backend integration

### ✅ Database
- [x] MySQL TypeORM configuration
- [x] Entity relationships defined
- [x] Auto-synchronization enabled

## Starting the Project

### Step 1: Configure MySQL
1. Open MySQL Workbench
2. Create database: `CREATE DATABASE praise_apostolic;`
3. Note your MySQL root password

### Step 2: Configure Backend
Edit `praise-apostolic-backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_actual_password  # Change this!
DB_DATABASE=praise_apostolic
PORT=3001
NODE_ENV=development
```

### Step 3: Start Backend
```bash
cd praise-apostolic-backend
npm run start:dev
```

Watch for the output:
```
Application is running on: http://localhost:3001
```

### Step 4: Start Frontend
In a new terminal:
```bash
cd praise-apostolic
npm run dev
```

Frontend will be at: `http://localhost:3000`

## API Structure

The backend API is organized by resource:

### Pastors Endpoints
- `GET /pastors` - Get all pastors
- `GET /pastors/:id` - Get specific pastor
- `POST /pastors` - Create pastor
- `PUT /pastors/:id` - Update pastor
- `DELETE /pastors/:id` - Delete pastor

### To Add More Endpoints

1. **Create Entity** (e.g., `src/entities/ministry.entity.ts`)
   ```typescript
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
   
   @Entity('ministries')
   export class Ministry {
     @PrimaryGeneratedColumn('uuid')
     id: string;
     
     @Column()
     name: string;
     // ... other columns
   }
   ```

2. **Create Service** (e.g., `src/services/ministries.service.ts`)
   ```typescript
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { Ministry } from '../entities';
   
   @Injectable()
   export class MinistriesService {
     constructor(
       @InjectRepository(Ministry)
       private ministriesRepository: Repository<Ministry>,
     ) {}
     
     async findAll() {
       return this.ministriesRepository.find();
     }
   }
   ```

3. **Create Controller** (e.g., `src/controllers/ministries.controller.ts`)
   ```typescript
   import { Controller, Get } from '@nestjs/common';
   import { MinistriesService } from '../services/ministries.service';
   
   @Controller('ministries')
   export class MinistriesController {
     constructor(private ministriesService: MinistriesService) {}
     
     @Get()
     findAll() {
       return this.ministriesService.findAll();
     }
   }
   ```

4. **Update App Module** (`src/app.module.ts`)
   ```typescript
   import { MinistriesController } from './controllers/ministries.controller';
   import { MinistriesService } from './services/ministries.service';
   
   @Module({
     controllers: [AppController, PastorsController, MinistriesController],
     providers: [AppService, PastorsService, MinistriesService],
   })
   export class AppModule {}
   ```

## Frontend Integration Example

```typescript
import { pastorsAPI } from './lib/api';

// In a React component
async function loadPastors() {
  try {
    const pastors = await pastorsAPI.getAll();
    console.log(pastors);
  } catch (error) {
    console.error('Failed to load pastors:', error);
  }
}
```

## Database Inspection

### Via MySQL Workbench
1. Connect to localhost:3306
2. Select `praise_apostolic` database
3. Expand tables to view schema
4. Run queries in the query editor

### Via Command Line
```bash
mysql -u root -p
USE praise_apostolic;
SHOW TABLES;
DESC pastors;
SELECT * FROM pastors;
```

## Next Steps

1. **Create remaining services/controllers** for Ministries, Sermons, Events
2. **Add validation** using class-validator
3. **Add authentication** using JWT
4. **Implement data seeding** for initial church data
5. **Add error handling** and logging
6. **Connect frontend components** to backend API
7. **Add unit tests** for services
8. **Deploy to production** (AWS, Heroku, etc.)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused on 3001 | Ensure backend is running: `npm run start:dev` |
| CORS errors | Check `src/main.ts` CORS origin config |
| Database connection failed | Verify MySQL is running and `.env` credentials are correct |
| Tables not created | Check `synchronize: true` in `app.module.ts` |
| Port 3306 in use | Change `DB_PORT` in `.env` or kill existing MySQL process |

## Useful Commands

```bash
# Start backend in development with auto-reload
npm run start:dev

# Build backend for production
npm run build

# Start backend production build
npm run start:prod

# Run database migrations
npm run migration:run

# Generate migration
npm run migration:generate

# Frontend development
npm run dev

# Build frontend
npm run build

# Run linter
npm run lint
```

---

**Your project is now ready for full-stack development with MySQL database integration!** 🚀
