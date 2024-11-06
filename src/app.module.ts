import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Redis from 'ioredis';
import { HealthModule } from './health/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CollaborationModule } from './collaboration/collaboration.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeORM configuration using the DATABASE_URL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Using the URL directly
      autoLoadEntities: true,
      synchronize: true, // Only in development, should be disable for production
    }),
    UserModule,
    HealthModule,
    AuthModule,
    CollaborationModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS',
      useFactory: () => {
        return new Redis(process.env.REDIS_URL); // Using the Redis URL directly
      },
    },
  ],
  exports: ['REDIS'],
})
export class AppModule {}
