import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { User } from '../entities/user.entity'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return await this.usersService.createUser(user)
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAllUsers()
    }

    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<User> {
        return await this.usersService.findUserById(id)
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<User>): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return await this.usersService.deleteUser(id)
    }
}
