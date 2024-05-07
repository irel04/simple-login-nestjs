import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signin(@Body() signInDto: UserDTO): Promise<Object>{
        try {

            const token = await this.authService.signIn(signInDto)

            return {
                success: true,
                token: token,
            } 
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException("Unauthorized", {cause: new Error(), description: "Wrong password"})
        }
    }
}
