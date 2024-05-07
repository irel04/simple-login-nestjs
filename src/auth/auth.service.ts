import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/user/dto/user.dto';
import { LoginCredentials, User } from 'src/user/user.entity';
import { hashing } from 'src/user/user.service';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(LoginCredentials)
        private loginRepository: Repository<LoginCredentials>,
        private jwtService: JwtService
    ){}

    async signIn(user: UserDTO): Promise<String> {
        try {
            console.log(user);
            const { user_name, password }: UserDTO = user
            const option: FindOneOptions = {
                where: {
                    user_name: user_name
                }
            }

            const user_credential = await this.loginRepository.findOne(option)
            const user_password = user_credential.password
            
            if(await hashing.comparePassword(password, user_password)){
                const payload = {sub: user_credential.user_id, username: user.user_name}
                return await this.jwtService.signAsync(payload)
            } else {
                throw Error()
            }

           
        } catch (error) {
            throw new Error(error)
        }
    }
}
