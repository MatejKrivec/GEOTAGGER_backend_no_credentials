import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, Query, Patch } from '@nestjs/common';
import { UserService } from "./user.service";
import { Prisma, USER } from "@prisma/client";
import { ApiBody, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';
import { ValidatePasswordDto } from './validatePassword.dto';
import { UpdateUserDto } from './updateUser.dto';


@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('login') 
    async login(@Query('username') username: string,@Query('password') password: string): Promise<USER | null> {

    const user = await this.userService.findOneByUsernameAndPassword(username, password);

    return user;
    }

    @Get(':id')
        async getUser(@Param('id') ID: string): Promise<USER> {
        const id = parseInt(ID, 10);
        return this.userService.getUserById(id);
    }

    @Get()
        async getAllUsers(): Promise<USER[]> {
        return this.userService.getAllUsers();
    }

    @Post('validatePassword/:id')
    async validatePassword(
        @Param('id') id: string,
        @Body() validatePasswordDto: ValidatePasswordDto,
    ): Promise<boolean> {
        const userId = parseInt(id, 10);
        const currentPassword = validatePasswordDto.password;
        return this.userService.validatePassword(userId, currentPassword);
    }
  

    @Post()
    @ApiCreatedResponse({ description: 'The user has been successfully created.' })
    @ApiBody({ type: CreateUserDto })
        async createUser(@Body() userData: USER): Promise<USER> {
        return this.userService.createUser(userData);
    }

    @Patch(':id') 
    @ApiCreatedResponse({ description: 'The user has been successfully updated.' })
    @ApiBody({ type: UpdateUserDto })
        async posodobitevUser(
            @Param('id') id: string,
            @Body() userData: USER,
        ): Promise<USER> {
        return this.userService.posodobitevUser({
        where: { id: Number(id) },
        data: userData,
    });
    }

    @Patch('updatePassword/:id') 
    @ApiCreatedResponse({ description: 'The password has been successfully updated.' })
    async updatePassword(
        @Param('id') id: string,
        @Body() validatePasswordDto: ValidatePasswordDto,
    ): Promise<void> {
        const userId = parseInt(id, 10);
        const newPassword = validatePasswordDto.password;
        await this.userService.updatePassword(userId, newPassword);
    }

    @Delete(':id')
        async deleteUser(@Param('id') id: string): Promise<USER> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}