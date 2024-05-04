import { Controller, Get, Post, Body, Req, Param, HttpException, HttpStatus, BadRequestException, Res } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatsDto } from './dto/create-cats-dto';
import { CatsService } from './cats.service';


@Controller('cats')
export class CatsController {
    constructor(private catService: CatsService){}

    @Get()
    findAll(): Array<object> {
        return this.catService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): string {
        throw new BadRequestException("Something Bad", {cause: new Error(), description: "Maybe there is error"})
    }

    @Post()
    async create(@Body() body: CreateCatsDto): Promise<Object>{
        this.catService.create(body)

        return {
            status_code: HttpStatus.CREATED,
            message: "Cat created"
        }
    }
}
