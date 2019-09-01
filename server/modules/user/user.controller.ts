import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    public async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any> {
        const user = await this.usersService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).send(user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    public async findOne(@Param('id') id: number, @Res() res: Response): Promise<any> {
        const user = await this.usersService.findUserById(id);
        return res.status(HttpStatus.FOUND).send(user);
    }
}