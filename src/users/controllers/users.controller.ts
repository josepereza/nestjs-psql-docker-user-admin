import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { User } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto)
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
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return await this.usersService.updateUser(id, updateUserDto)
    }

    @Patch('/role/:id')
    async updateUserRole(
        @Param('id') id: number,
        @Body() body: { role: string },
    ): Promise<User> {
        try {
            const updatedUser = await this.usersService.updateUserRole(id, body.role)
            return updatedUser
        } catch (error) {
            if (error instanceof NotFoundException) 
                throw new NotFoundException(`User with ID ${id} not found.`)
            else if (error instanceof BadRequestException) 
                throw new BadRequestException(error.message)
            else 
                throw error
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return await this.usersService.deleteUser(id)
    }
}
