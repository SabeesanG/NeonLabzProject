import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env first, globally
    PrismaModule,
    AuthModule,
    RecordsModule,
  ],
})
export class AppModule {}
