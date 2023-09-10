import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from '../../services/users/users.service'
import { User } from '../../entities/user.entity'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUser() {
        return 'HII!'
    }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return await this.usersService.createUser(user)
    }
}
