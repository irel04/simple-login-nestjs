import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
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
        return `This is the id you passed "${id}"`
    }

    @Post()
    async create(@Body() body: CreateCatsDto){
        this.catService.create(body)
    }
}
