import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { LoginCredentials, User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'


export function generateUUID(): string {
    return uuidv4()
}

export const hashing = {
    async hashPassword(userPass: string): Promise<string>{
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userPass, saltOrRounds)
        return hash
    },
    async comparePassword(userPass: string, hashPass: string): Promise<Boolean>{
        const isMatch = await bcrypt.compare(userPass, hashPass)
        
        if(!isMatch){
            return false
        }
        return true
    }
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(LoginCredentials)
        private loginCredentialsRepository: Repository<LoginCredentials>
    ){}

    async findAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async create(userDto: UserDTO): Promise<LoginCredentials> {
        try {
            const user: DeepPartial<User> = {
                user_id: generateUUID(),
                first_name: userDto.first_name,
                last_name: userDto.last_name,
                address: userDto.address,
                birth_day: userDto.birth_day,
                phone_number: userDto.phone_number
            }

            const newUser = this.userRepository.create(user)

            await this.userRepository.save(newUser)

            const loginCredentials: DeepPartial<LoginCredentials> = {
                user_id: user.user_id,
                user_name: userDto.user_name,
                password: await hashing.hashPassword(userDto.password)
            }

            const newLoginCredential = this.loginCredentialsRepository.create(loginCredentials)
            
            return await this.loginCredentialsRepository.save(newLoginCredential)
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}
