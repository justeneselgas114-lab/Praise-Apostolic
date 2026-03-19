import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pastor, Ministry, Sermon, ChurchEvent, User, GalleryItem } from './entities';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PastorsModule } from './pastors/pastors.module';
import { MinistriesModule } from './ministries/ministries.module';
import { SermonsModule } from './sermons/sermons.module';
import { EventsModule } from './events/events.module';
import { GalleryModule } from './gallery/gallery.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'pap',
      entities: [Pastor, Ministry, Sermon, ChurchEvent, User, GalleryItem],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Pastor, Ministry, Sermon, ChurchEvent, User, GalleryItem]),
    UsersModule,
    AuthModule,
    PastorsModule,
    MinistriesModule,
    SermonsModule,
    EventsModule,
    GalleryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
