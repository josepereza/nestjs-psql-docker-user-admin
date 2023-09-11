import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto)
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`)
        }
        return user
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findUserById(id)
        this.userRepository.merge(user, updateUserDto)
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findUserById(id)
        await this.userRepository.remove(user)
    }
}
