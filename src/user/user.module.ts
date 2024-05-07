
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginCredentials, User } from './user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User, LoginCredentials])],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule{}
