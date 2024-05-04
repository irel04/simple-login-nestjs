import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findAll(): Promise<User[]>{
        console.log(this.userRepository);
        return await this.userRepository.find();
    }

    async create(userDto: UserDTO): Promise<User> {
        try {
            const user: DeepPartial<User> = userDto
            const newUser = this.userRepository.create(user)
            console.log(newUser);
            return await this.userRepository.save(newUser)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
