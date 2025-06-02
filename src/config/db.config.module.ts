import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class DbModule {}
