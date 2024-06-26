import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Object> {
        const users = await this.userService.findAll()
        return {
            success: true,
            users: users
        }
    }

    @Post('register')
    async create(@Body() body: UserDTO): Promise<object> {
        try {

            await this.userService.create(body)

            return {
                success: true,
                message: "User Created"
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
