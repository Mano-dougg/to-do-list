import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])], // Add your entities here
})
export class UserModule {}
